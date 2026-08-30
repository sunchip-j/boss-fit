import {
  skinDimensionMap,
  skinResults,
} from "@/features/skin-type/calculate";
import { DIMENSION_KEYS } from "@/features/skin-type/types";
import type {
  DimensionKey,
  SkinScores,
  SkinTypeCode,
} from "@/features/skin-type/types";

export const SKIN_TYPE_PREVIEW_CODES: SkinTypeCode[] = [
  "DRNT",
  "DRNW",
  "DRPT",
  "DRPW",
  "DSNT",
  "DSNW",
  "DSPT",
  "DSPW",
  "ORNT",
  "ORNW",
  "ORPT",
  "ORPW",
  "OSNT",
  "OSNW",
  "OSPT",
  "OSPW",
];

const DIMENSION_CODE_INDEX: Record<DimensionKey, number> = {
  dry_oily: 0,
  sensitive_resistant: 1,
  pigmented_nonpigmented: 2,
  wrinkled_tight: 3,
};

export function parsePreviewSkinTypeCode(
  value: string | string[] | undefined
): SkinTypeCode | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.toUpperCase();

  return SKIN_TYPE_PREVIEW_CODES.includes(normalized as SkinTypeCode)
    ? (normalized as SkinTypeCode)
    : null;
}

function getRepresentativeScore(key: DimensionKey, type: SkinTypeCode): number {
  const code = type[DIMENSION_CODE_INDEX[key]];
  const threshold = skinDimensionMap[key].thresholds.find(
    (item) => item.result === code
  );

  if (!threshold) {
    throw new Error(`${type}의 ${key} 대표 점수를 계산할 수 없습니다.`);
  }

  return (threshold.min + threshold.max) / 2;
}

export function getPreviewScoresForSkinType(type: SkinTypeCode): SkinScores {
  return DIMENSION_KEYS.reduce((scores, key) => {
    scores[key] = getRepresentativeScore(key, type);
    return scores;
  }, {} as SkinScores);
}

export function getPreviewResultHref(type: SkinTypeCode): string {
  const resultType = skinResults.find((result) => result.code === type);

  if (!resultType) {
    throw new Error(`${type} 결과 데이터가 없습니다.`);
  }

  const scores = getPreviewScoresForSkinType(type);
  const params = new URLSearchParams();

  params.set("type", type);

  for (const key of DIMENSION_KEYS) {
    params.set(key, String(scores[key]));
  }

  return `/result?${params.toString()}`;
}
