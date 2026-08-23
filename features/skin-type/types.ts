export const DIMENSION_KEYS = [
  "dry_oily",
  "sensitive_resistant",
  "pigmented_nonpigmented",
  "wrinkled_tight",
] as const;

export type DimensionKey = (typeof DIMENSION_KEYS)[number];

export type SkinTypeCode = `${"D" | "O"}${"S" | "R"}${"P" | "N"}${"W" | "T"}`;

export type SkinChoice = {
  text: string;
  score: number;
};

export type SkinQuestion = {
  id: string;
  dimension: DimensionKey;
  text: string;
  note?: string;
  sourceNote?: string;
  choices: SkinChoice[];
};

export type SkinScores = Record<DimensionKey, number>;

export type SkinThreshold = {
  min: number;
  max: number;
  result: string;
  label: string;
};

export type SkinDimensionDefinition = {
  id: DimensionKey;
  title: string;
  thresholds: SkinThreshold[];
  questions: Array<Omit<SkinQuestion, "dimension">>;
};

export type SkinQuestionsData = {
  dimensions: SkinDimensionDefinition[];
};

export type SkinLetters = {
  dry_oily: "D" | "O";
  sensitive_resistant: "S" | "R";
  pigmented_nonpigmented: "P" | "N";
  wrinkled_tight: "W" | "T";
};

export type SkinResultDefinition = {
  code: SkinTypeCode;
  title: string;
  subtitle?: string;
  description?: string;
  traits?:
    | string[]
    | {
        oiliness: "D" | "O";
        sensitivity: "S" | "R";
        pigmentation: "P" | "N";
        aging: "W" | "T";
      };
  summary?: string;
  features?: string[];
  carePoints?: string[];
  caution?: string;
  shareText?: string;
};

export type SkinAssessmentResult = {
  code: SkinTypeCode;
  scores: SkinScores;
  thresholds: SkinScores;
  maxScores: SkinScores;
  letters: SkinLetters;
  resultType: SkinResultDefinition;
};

export type SkinTrait = "O" | "D" | "S" | "R" | "P" | "N" | "W" | "T";

export type ProductCategory =
  | "cleanser"
  | "toner"
  | "serum"
  | "moisturizer"
  | "sunscreen";

export type RecommendationLevel = "essential" | "recommended" | "optional";

export type ProductRecommendation = {
  skinType: SkinTypeCode;
  reason: string;
  order: number;
};

export type SkinProduct = {
  id: string;
  brand: string;
  name: string;
  category: ProductCategory;
  imageUrl?: string;
  tags: string[];
  summary: string;
  oliveYoungUrl?: string;
  recommendations: ProductRecommendation[];
  active: boolean;
};

export type ResolvedRecommendedProduct = {
  product: SkinProduct;
  recommendation: ProductRecommendation;
};

export type SkinTypeInfo = {
  code: SkinTypeCode;
  traits: string[];
  summary: string;
  priorities: string[];
  routineLevels: Record<ProductCategory, RecommendationLevel>;
};

export type RoutineStep = {
  category: ProductCategory;
  label: string;
  description: string;
  optional?: boolean;
};
