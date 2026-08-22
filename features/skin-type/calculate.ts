import questionsData from "@/features/skin-type/data/questions.json";
import resultsData from "@/features/skin-type/data/results.json";
import type {
  DimensionKey,
  SkinAssessmentResult,
  SkinQuestion,
  SkinQuestionsData,
  SkinResultDefinition,
  SkinScores,
  SkinTypeCode,
} from "@/features/skin-type/types";
import { DIMENSION_KEYS } from "@/features/skin-type/types";

export const skinQuestionData = questionsData as SkinQuestionsData;
export const skinDimensions = skinQuestionData.dimensions;
export const skinDimensionMap = Object.fromEntries(
  skinDimensions.map((dimension) => [dimension.id, dimension])
) as Record<DimensionKey, (typeof skinDimensions)[number]>;
export const skinQuestions = skinDimensions.flatMap((dimension) =>
  dimension.questions.map((question) => ({
    ...question,
    dimension: dimension.id,
  }))
) as SkinQuestion[];
export const skinResults = Object.values(
  (resultsData as { results: Record<string, SkinResultDefinition> }).results
);

export type SkinAnswerMap = Record<string, number>;

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  dry_oily: skinDimensionMap.dry_oily.title,
  sensitive_resistant: skinDimensionMap.sensitive_resistant.title,
  pigmented_nonpigmented:
    skinDimensionMap.pigmented_nonpigmented.title,
  wrinkled_tight: skinDimensionMap.wrinkled_tight.title,
};

export const LETTER_LABELS: Record<string, string> = {
  D: "Dry",
  O: "Oily",
  S: "Sensitive",
  R: "Resistant",
  P: "Pigmented",
  N: "Nonpigmented",
  W: "Wrinkled",
  T: "Tight",
};

const EMPTY_SCORES: SkinScores = {
  dry_oily: 0,
  sensitive_resistant: 0,
  pigmented_nonpigmented: 0,
  wrinkled_tight: 0,
};

export const SKIN_SCORE_THRESHOLDS = DIMENSION_KEYS.reduce((thresholds, key) => {
  const firstRightSideThreshold = skinDimensionMap[key].thresholds[1];

  thresholds[key] = firstRightSideThreshold.min;
  return thresholds;
}, { ...EMPTY_SCORES });

export const SKIN_MAX_SCORES = DIMENSION_KEYS.reduce((maxScores, key) => {
  maxScores[key] = Math.max(
    ...skinDimensionMap[key].thresholds.map((threshold) => threshold.max)
  );
  return maxScores;
}, { ...EMPTY_SCORES });

function findChoiceScore(question: SkinQuestion, choiceIndex: number): number {
  const choice = question.choices[choiceIndex];

  if (!choice) {
    throw new Error("선택지 데이터가 올바르지 않습니다.");
  }

  return choice.score;
}

function getDimensionResult(key: DimensionKey, score: number): string {
  const threshold = skinDimensionMap[key].thresholds.find(
    (item) => score >= item.min && score <= item.max
  );

  if (!threshold) {
    throw new Error(`${key} 점수 ${score}에 맞는 판정 기준이 없습니다.`);
  }

  return threshold.result;
}

export function calculateSkinType(answers: SkinAnswerMap): SkinAssessmentResult {
  const scores: SkinScores = { ...EMPTY_SCORES };

  for (const question of skinQuestions) {
    const choiceIndex = answers[question.id];

    if (choiceIndex === undefined) {
      throw new Error("모든 문항에 답해야 결과를 계산할 수 있습니다.");
    }

    scores[question.dimension] += findChoiceScore(question, choiceIndex);
  }

  const letters: SkinAssessmentResult["letters"] = {
    dry_oily: getDimensionResult("dry_oily", scores.dry_oily) as "D" | "O",
    sensitive_resistant: getDimensionResult(
      "sensitive_resistant",
      scores.sensitive_resistant
    ) as "S" | "R",
    pigmented_nonpigmented: getDimensionResult(
      "pigmented_nonpigmented",
      scores.pigmented_nonpigmented
    ) as "P" | "N",
    wrinkled_tight: getDimensionResult(
      "wrinkled_tight",
      scores.wrinkled_tight
    ) as "W" | "T",
  };

  const code =
    `${letters.dry_oily}${letters.sensitive_resistant}${letters.pigmented_nonpigmented}${letters.wrinkled_tight}` as SkinTypeCode;
  const resultType = skinResults.find((result) => result.code === code);

  if (!resultType) {
    throw new Error(`${code} 결과 데이터가 없습니다.`);
  }

  return {
    code,
    scores,
    thresholds: SKIN_SCORE_THRESHOLDS,
    maxScores: SKIN_MAX_SCORES,
    letters,
    resultType,
  };
}

export function encodeSkinResult(result: SkinAssessmentResult): string {
  const params = new URLSearchParams();

  params.set("type", result.code);

  for (const key of DIMENSION_KEYS) {
    params.set(key, String(result.scores[key]));
  }

  return params.toString();
}

export function getSkinResultFromParams(params: {
  [key: string]: string | string[] | undefined;
}): SkinAssessmentResult | null {
  const codeValue = typeof params.type === "string" ? params.type : "";

  if (!/^[DO][SR][PN][WT]$/.test(codeValue)) {
    return null;
  }

  const scores = { ...EMPTY_SCORES };

  for (const key of DIMENSION_KEYS) {
    const value = params[key];
    const parsed = Number(typeof value === "string" ? value : "");

    if (!Number.isFinite(parsed)) {
      return null;
    }

    scores[key] = parsed;
  }

  const code = codeValue as SkinTypeCode;
  const resultType = skinResults.find((result) => result.code === code);

  if (!resultType) {
    return null;
  }

  return {
    code,
    scores,
    thresholds: SKIN_SCORE_THRESHOLDS,
    maxScores: SKIN_MAX_SCORES,
    letters: {
      dry_oily: code[0] as "D" | "O",
      sensitive_resistant: code[1] as "S" | "R",
      pigmented_nonpigmented: code[2] as "P" | "N",
      wrinkled_tight: code[3] as "W" | "T",
    },
    resultType,
  };
}
