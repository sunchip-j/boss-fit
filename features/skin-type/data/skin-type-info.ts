import type {
  ProductCategory,
  RecommendationLevel,
  RoutineStep,
  SkinTypeCode,
  SkinTypeInfo,
} from "@/features/skin-type/types";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "cleanser",
  "toner",
  "serum",
  "moisturizer",
  "sunscreen",
];

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  cleanser: "클렌저",
  toner: "토너(스킨)",
  serum: "세럼·앰플",
  moisturizer: "로션·크림",
  sunscreen: "선크림",
};

const DEFAULT_ROUTINE: Record<ProductCategory, RecommendationLevel> = {
  cleanser: "essential",
  toner: "optional",
  serum: "recommended",
  moisturizer: "recommended",
  sunscreen: "essential",
};

function routine(
  overrides: Partial<Record<ProductCategory, RecommendationLevel>>
): Record<ProductCategory, RecommendationLevel> {
  return {
    ...DEFAULT_ROUTINE,
    ...overrides,
  };
}

export const SKIN_TYPE_INFOS: SkinTypeInfo[] = [
  {
    code: "DSPW",
    traits: ["건조", "민감", "색소", "주름"],
    summary:
      "장벽과 진정을 우선하면서 색소와 피부 노화 관리도 함께 고려하는 타입입니다.",
    priorities: ["장벽 관리", "진정", "자외선 차단", "색소 및 노화 관리"],
    routineLevels: routine({
      cleanser: "essential",
      moisturizer: "essential",
      sunscreen: "essential",
    }),
  },
  {
    code: "DSPT",
    traits: ["건조", "민감", "색소", "탄력"],
    summary: "보습과 진정을 중심으로 색소 흔적 관리를 함께 고려하는 타입입니다.",
    priorities: ["보습 장벽", "진정", "자외선 차단", "색소 관리"],
    routineLevels: routine({
      moisturizer: "essential",
      sunscreen: "essential",
    }),
  },
  {
    code: "DSNW",
    traits: ["건조", "민감", "비색소", "주름"],
    summary: "건조함과 민감도를 낮추면서 주름·탄력 저하를 예방하는 타입입니다.",
    priorities: ["보습", "장벽 강화", "진정", "노화 관리"],
    routineLevels: routine({
      toner: "recommended",
      moisturizer: "essential",
      sunscreen: "essential",
    }),
  },
  {
    code: "DSNT",
    traits: ["건조", "민감", "비색소", "탄력"],
    summary: "보습과 진정 중심의 단순한 장벽 관리가 잘 맞는 타입입니다.",
    priorities: ["보습", "장벽 관리", "자극 최소화"],
    routineLevels: routine({
      serum: "optional",
      moisturizer: "essential",
    }),
  },
  {
    code: "DRPW",
    traits: ["건조", "저항", "색소", "주름"],
    summary: "건조함을 보완하면서 색소와 광노화 관리를 함께 고려하는 타입입니다.",
    priorities: ["보습", "색소 관리", "자외선 차단", "노화 관리"],
    routineLevels: routine({
      serum: "essential",
      moisturizer: "essential",
      sunscreen: "essential",
    }),
  },
  {
    code: "DRPT",
    traits: ["건조", "저항", "색소", "탄력"],
    summary: "피부 저항성은 안정적이지만 보습과 색소 관리가 필요한 타입입니다.",
    priorities: ["보습", "색소 관리", "자외선 차단"],
    routineLevels: routine({
      serum: "essential",
      moisturizer: "essential",
      sunscreen: "essential",
    }),
  },
  {
    code: "DRNW",
    traits: ["건조", "저항", "비색소", "주름"],
    summary: "건조함을 줄이고 탄력 저하를 예방하는 관리가 중요한 타입입니다.",
    priorities: ["보습", "탄력 유지", "자외선 차단"],
    routineLevels: routine({
      moisturizer: "essential",
      sunscreen: "essential",
    }),
  },
  {
    code: "DRNT",
    traits: ["건조", "저항", "비색소", "탄력"],
    summary: "피부 자극과 색소 걱정은 적지만 보습 루틴이 중요한 타입입니다.",
    priorities: ["기본 보습", "피부 컨디션 유지", "자외선 차단"],
    routineLevels: routine({
      toner: "recommended",
      serum: "optional",
      moisturizer: "essential",
    }),
  },
  {
    code: "OSPW",
    traits: ["지성", "민감", "색소", "주름"],
    summary: "유분 조절, 진정, 색소와 광노화 관리를 함께 고려하는 타입입니다.",
    priorities: ["저자극", "색소 관리", "자외선 차단", "유분 밸런스"],
    routineLevels: routine({
      cleanser: "essential",
      serum: "essential",
      moisturizer: "recommended",
      sunscreen: "essential",
    }),
  },
  {
    code: "OSPT",
    traits: ["지성", "민감", "색소", "탄력"],
    summary: "피지와 민감도를 조절하면서 색소 흔적을 관리하는 타입입니다.",
    priorities: ["진정", "유분 밸런스", "색소 관리", "자외선 차단"],
    routineLevels: routine({
      cleanser: "essential",
      toner: "recommended",
      serum: "essential",
      sunscreen: "essential",
    }),
  },
  {
    code: "OSNW",
    traits: ["지성", "민감", "비색소", "주름"],
    summary: "유분과 민감도를 조절하면서 노화 관리를 고려하는 타입입니다.",
    priorities: ["저자극 세정", "진정", "노화 관리", "자외선 차단"],
    routineLevels: routine({
      cleanser: "essential",
      toner: "recommended",
      sunscreen: "essential",
    }),
  },
  {
    code: "OSNT",
    traits: ["지성", "민감", "비색소", "탄력"],
    summary: "유분 조절과 진정을 중심으로 가벼운 루틴이 잘 맞는 타입입니다.",
    priorities: ["유분 밸런스", "진정", "가벼운 보습"],
    routineLevels: routine({
      cleanser: "essential",
      toner: "recommended",
      serum: "optional",
      moisturizer: "recommended",
    }),
  },
  {
    code: "ORPW",
    traits: ["지성", "저항", "색소", "주름"],
    summary: "피지, 색소, 광노화를 함께 관리하는 적극적인 루틴이 필요한 타입입니다.",
    priorities: ["유분 조절", "색소 관리", "노화 관리", "자외선 차단"],
    routineLevels: routine({
      cleanser: "essential",
      serum: "essential",
      sunscreen: "essential",
    }),
  },
  {
    code: "ORPT",
    traits: ["지성", "저항", "색소", "탄력"],
    summary: "유분 밸런스와 색소 관리를 중심으로 구성하기 좋은 타입입니다.",
    priorities: ["유분 조절", "색소 관리", "자외선 차단"],
    routineLevels: routine({
      cleanser: "essential",
      serum: "essential",
      sunscreen: "essential",
    }),
  },
  {
    code: "ORNW",
    traits: ["지성", "저항", "비색소", "주름"],
    summary: "유분을 조절하면서 주름과 광노화 예방을 함께 고려하는 타입입니다.",
    priorities: ["유분 밸런스", "노화 관리", "자외선 차단"],
    routineLevels: routine({
      cleanser: "essential",
      toner: "recommended",
      sunscreen: "essential",
    }),
  },
  {
    code: "ORNT",
    traits: ["지성", "저항", "비색소", "탄력"],
    summary: "피부가 비교적 안정적이어서 가볍고 기본적인 관리가 잘 맞는 타입입니다.",
    priorities: ["가벼운 세정", "수분 밸런스", "자외선 차단"],
    routineLevels: routine({
      cleanser: "essential",
      toner: "recommended",
      serum: "optional",
      moisturizer: "optional",
    }),
  },
];

export const SKIN_TYPE_INFO_MAP = Object.fromEntries(
  SKIN_TYPE_INFOS.map((info) => [info.code, info])
) as Record<SkinTypeCode, SkinTypeInfo>;

export function getSkinTypeInfo(type: SkinTypeCode): SkinTypeInfo {
  return SKIN_TYPE_INFO_MAP[type];
}

function getCleanserDescription(type: SkinTypeCode): string {
  if (type.includes("S")) {
    return "과도한 세정은 피하고 순하게";
  }

  if (type.includes("O")) {
    return "유분과 노폐물은 산뜻하게 정돈";
  }

  return "건조함을 줄이는 부드러운 세안";
}

function getTonerDescription(type: SkinTypeCode): string {
  if (type.includes("S")) {
    return "세안 후 필요하다면 진정과 수분 보충";
  }

  if (type.includes("D")) {
    return "세안 후 필요하다면 가볍게 수분 보충";
  }

  return "피부결과 수분 밸런스 정돈";
}

function getSerumDescription(type: SkinTypeCode): string {
  if (type.includes("P") && type.includes("W")) {
    return "색소 · 주름 고민 집중 관리";
  }

  if (type.includes("P")) {
    return "색소 흔적과 피부 톤 관리";
  }

  if (type.includes("W")) {
    return "주름과 탄력 저하 관리";
  }

  if (type.includes("S")) {
    return "민감한 피부의 진정 보조";
  }

  return "피부 고민에 맞춘 집중 케어";
}

function getMoisturizerDescription(type: SkinTypeCode): string {
  if (type.includes("S")) {
    return "민감 피부의 보습 · 장벽 관리";
  }

  if (type.includes("D")) {
    return "수분 · 피부 장벽 유지";
  }

  if (type.includes("O")) {
    return "무겁지 않게 수분 밸런스 유지";
  }

  return "피부 컨디션을 안정적으로 유지";
}

function getSunscreenDescription(type: SkinTypeCode): string {
  if (type.includes("P") && type.includes("W")) {
    return "색소 · 광노화를 고려한 자외선 차단";
  }

  if (type.includes("P")) {
    return "색소 흔적을 고려한 자외선 차단";
  }

  if (type.includes("W")) {
    return "광노화와 주름을 고려한 자외선 차단";
  }

  return "매일 이어가는 기본 자외선 차단";
}

const ROUTINE_DESCRIPTIONS: Record<
  ProductCategory,
  (type: SkinTypeCode) => string
> = {
  cleanser: getCleanserDescription,
  toner: getTonerDescription,
  serum: getSerumDescription,
  moisturizer: getMoisturizerDescription,
  sunscreen: getSunscreenDescription,
};

export function getRoutineSteps(type: SkinTypeCode): RoutineStep[] {
  const skinTypeInfo = getSkinTypeInfo(type);

  return PRODUCT_CATEGORIES.map((category) => ({
    category,
    label: PRODUCT_CATEGORY_LABELS[category],
    description: ROUTINE_DESCRIPTIONS[category](type),
    optional: skinTypeInfo.routineLevels[category] === "optional",
  }));
}
