import { sql } from "@/lib/db";
import type {
  QuestionChoice,
  QuestionItem,
  QuestionType,
  ResultTypeRecord,
  SessionResultRecord,
  TraitScores,
} from "@/lib/boss-fit/types";
import type { MbtiType } from "@/lib/constants";

type SqlQuestionRow = {
  id: string | number;
  question_text: string;
  question_type: string | null;
  display_order: string | number;
};

type SqlChoiceRow = {
  id: string | number;
  question_id: string | number;
  choice_text: string;
  display_order: string | number;
  sense_score: string | number;
  report_score: string | number;
  reaction_score: string | number;
  distance_score: string | number;
  survival_score: string | number;
};

type SqlResultRow = {
  session_key: string;
  boss_mbti: MbtiType;
  user_gender: string | null;
  total_score: string | number | null;
  created_at: string;
  completed_at: string | null;
  sense_score: string | number;
  report_score: string | number;
  reaction_score: string | number;
  distance_score: string | number;
  survival_score: string | number;
  result_type_id: string | number | null;
  result_code: string | null;
  result_title: string | null;
  result_subtitle: string | null;
  result_description: string | null;
  result_min_score: string | number | null;
  result_max_score: string | number | null;
  result_share_text: string | null;
  result_display_order: string | number | null;
};

type ScoreRow = {
  sense_score: string | number;
  report_score: string | number;
  reaction_score: string | number;
  distance_score: string | number;
  survival_score: string | number;
};

function toNumber(value: string | number | null | undefined): number {
  return Number(value ?? 0);
}

function mapTraitScores(row: ScoreRow): TraitScores {
  return {
    sense_score: toNumber(row.sense_score),
    report_score: toNumber(row.report_score),
    reaction_score: toNumber(row.reaction_score),
    distance_score: toNumber(row.distance_score),
    survival_score: toNumber(row.survival_score),
  };
}

export async function getActiveQuestions(): Promise<QuestionItem[]> {
  const questions = (await sql`
    SELECT id, question_text, question_type, display_order
    FROM questions
    WHERE is_active = TRUE
    ORDER BY display_order ASC, id ASC
  `) as SqlQuestionRow[];

  if (questions.length === 0) {
    return [];
  }

  const questionIds = questions.map((question) => toNumber(question.id));
  const choices = (await sql`
    SELECT
      id,
      question_id,
      choice_text,
      display_order,
      sense_score,
      report_score,
      reaction_score,
      distance_score,
      survival_score
    FROM choices
    WHERE question_id = ANY(${questionIds})
    ORDER BY question_id ASC, display_order ASC, id ASC
  `) as SqlChoiceRow[];

  const choicesByQuestionId = new Map<number, QuestionChoice[]>();

  for (const choice of choices) {
    const questionId = toNumber(choice.question_id);
    const bucket = choicesByQuestionId.get(questionId) ?? [];

    bucket.push({
      id: toNumber(choice.id),
      questionId,
      choiceText: choice.choice_text,
      displayOrder: toNumber(choice.display_order),
      ...mapTraitScores(choice),
    });

    choicesByQuestionId.set(questionId, bucket);
  }

  return questions.map((question) => {
    const id = toNumber(question.id);

    return {
      id,
      questionText: question.question_text,
      questionType: (question.question_type as QuestionType | null) ?? null,
      displayOrder: toNumber(question.display_order),
      choices: choicesByQuestionId.get(id) ?? [],
    };
  });
}

export async function getChoicesByIds(choiceIds: number[]): Promise<QuestionChoice[]> {
  if (choiceIds.length === 0) {
    return [];
  }

  const rows = (await sql`
    SELECT
      id,
      question_id,
      choice_text,
      display_order,
      sense_score,
      report_score,
      reaction_score,
      distance_score,
      survival_score
    FROM choices
    WHERE id = ANY(${choiceIds})
  `) as SqlChoiceRow[];

  return rows.map((row) => ({
    id: toNumber(row.id),
    questionId: toNumber(row.question_id),
    choiceText: row.choice_text,
    displayOrder: toNumber(row.display_order),
    ...mapTraitScores(row),
  }));
}

export async function getResultTypeByScore(
  score: number
): Promise<ResultTypeRecord | null> {
  const rows = (await sql`
    SELECT
      id,
      code,
      title,
      subtitle,
      description,
      min_score,
      max_score,
      share_text,
      display_order
    FROM result_types
    WHERE is_active = TRUE
      AND ${score} BETWEEN min_score AND max_score
    ORDER BY display_order ASC, id ASC
    LIMIT 1
  `) as Array<{
    id: string | number;
    code: string;
    title: string;
    subtitle: string | null;
    description: string | null;
    min_score: string | number;
    max_score: string | number;
    share_text: string | null;
    display_order: string | number;
  }>;

  const row = rows[0];

  if (!row) {
    return null;
  }

  return {
    id: toNumber(row.id),
    code: row.code,
    title: row.title,
    subtitle: row.subtitle ?? "",
    description: row.description ?? "",
    minScore: toNumber(row.min_score),
    maxScore: toNumber(row.max_score),
    shareText: row.share_text ?? "",
    displayOrder: toNumber(row.display_order),
  };
}

export async function getResultBySessionKey(
  sessionKey: string
): Promise<SessionResultRecord | null> {
  const rows = (await sql`
    SELECT
      ts.session_key,
      ts.boss_mbti,
      ts.user_gender,
      ts.total_score,
      ts.created_at,
      ts.completed_at,
      ts.sense_score,
      ts.report_score,
      ts.reaction_score,
      ts.distance_score,
      ts.survival_score,
      ts.result_type_id,
      rt.code AS result_code,
      rt.title AS result_title,
      rt.subtitle AS result_subtitle,
      rt.description AS result_description,
      rt.min_score AS result_min_score,
      rt.max_score AS result_max_score,
      rt.share_text AS result_share_text,
      rt.display_order AS result_display_order
    FROM test_sessions ts
    LEFT JOIN result_types rt ON rt.id = ts.result_type_id
    WHERE ts.session_key = ${sessionKey}
    LIMIT 1
  `) as SqlResultRow[];

  const row = rows[0];

  if (!row || !row.result_type_id || !row.result_code) {
    return null;
  }

  return {
    sessionKey: row.session_key,
    bossMbti: row.boss_mbti,
    userGender: (row.user_gender as SessionResultRecord["userGender"]) ?? null,
    totalScore: toNumber(row.total_score),
    traitScores: mapTraitScores(row),
    createdAt: row.created_at,
    completedAt: row.completed_at,
    resultType: {
      id: toNumber(row.result_type_id),
      code: row.result_code,
      title: row.result_title ?? "",
      subtitle: row.result_subtitle ?? "",
      description: row.result_description ?? "",
      minScore: toNumber(row.result_min_score),
      maxScore: toNumber(row.result_max_score),
      shareText: row.result_share_text ?? "",
      displayOrder: toNumber(row.result_display_order),
    },
  };
}
