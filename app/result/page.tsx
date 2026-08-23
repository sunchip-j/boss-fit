import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSkinResultFromParams } from "@/features/skin-type/calculate";
import { ResultShare } from "@/features/skin-type/components/result-share";
import {
  DIMENSION_KEYS,
  type DimensionKey,
} from "@/features/skin-type/types";

type ResultPageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

type DimensionDisplay = {
  leftEn: string;
  leftKo: string;
  leftCode: string;
  rightEn: string;
  rightKo: string;
  rightCode: string;
};

type BasicCareItem = {
  title: string;
  description: string;
};

const DIMENSION_DISPLAY: Record<DimensionKey, DimensionDisplay> = {
  dry_oily: {
    leftEn: "DRY",
    leftKo: "건성",
    leftCode: "D",
    rightEn: "OILY",
    rightKo: "지성",
    rightCode: "O",
  },
  sensitive_resistant: {
    leftEn: "RESISTANT",
    leftKo: "저항성",
    leftCode: "R",
    rightEn: "SENSITIVE",
    rightKo: "민감성",
    rightCode: "S",
  },
  pigmented_nonpigmented: {
    leftEn: "NON-PIGMENTED",
    leftKo: "비색소성",
    leftCode: "N",
    rightEn: "PIGMENTED",
    rightKo: "색소성",
    rightCode: "P",
  },
  wrinkled_tight: {
    leftEn: "TIGHT",
    leftKo: "탄력",
    leftCode: "T",
    rightEn: "WRINKLED",
    rightKo: "주름",
    rightCode: "W",
  },
};

const TRAIT_COPY: Record<
  string,
  {
    name: string;
    description: string;
  }
> = {
  D: {
    name: "건성",
    description: "수분과 유분이 부족해 건조함이나 당김을 느끼기 쉬워요.",
  },
  O: {
    name: "지성",
    description: "피지 분비가 비교적 활발해 번들거림이 느껴질 수 있어요.",
  },
  R: {
    name: "저항성",
    description: "외부 환경이나 화장품 자극에 비교적 안정적인 편이에요.",
  },
  S: {
    name: "민감성",
    description: "화장품이나 외부 자극에 피부가 민감하게 반응할 수 있어요.",
  },
  N: {
    name: "비색소성",
    description: "색소 침착에 대한 경향이 상대적으로 낮은 편이에요.",
  },
  P: {
    name: "색소성",
    description: "트러블이나 자극 후 색소 흔적이 남기 쉬운 편이에요.",
  },
  T: {
    name: "탄력",
    description: "주름과 피부 노화 징후가 상대적으로 적은 편이에요.",
  },
  W: {
    name: "주름형",
    description: "주름과 탄력 저하를 예방하는 관리가 중요한 편이에요.",
  },
};

function getBasicCareItems(code: string): BasicCareItem[] {
  const isDry = code.includes("D");
  const isOily = code.includes("O");
  const isSensitive = code.includes("S");
  const isPigmented = code.includes("P");
  const isWrinkled = code.includes("W");

  return [
    {
      title: isSensitive
        ? "세안은 순하게"
        : isDry
          ? "보습을 지키는 세안"
          : "균형 잡힌 세안",
      description: isSensitive
        ? "피지가 많더라도 강한 세정이나 잦은 각질 제거보다 피부 자극 부담이 적은 세안을 우선합니다."
        : isDry
          ? "세안 후 당김을 줄이고 피부의 수분과 유분을 과도하게 제거하지 않는 것이 중요합니다."
          : "유분과 노폐물을 정돈하되 피부가 과도하게 건조해지지 않도록 합니다.",
    },
    {
      title: isDry
        ? "보습은 충분하게"
        : isOily
          ? "보습은 가볍게"
          : "보습으로 균형 유지",
      description: isDry
        ? "수분과 피부 장벽을 보완할 수 있도록 충분한 보습을 기본으로 합니다."
        : isOily
          ? "무거운 유분감보다는 부담이 적은 보습으로 수분과 피부 장벽을 유지합니다."
          : "피부가 편안한 수준의 보습으로 수분 밸런스를 유지합니다.",
    },
    {
      title:
        isPigmented || isWrinkled
          ? "자외선 차단은 매일"
          : "자외선 차단을 기본으로",
      description:
        isPigmented && isWrinkled
          ? "색소 흔적과 광노화 경향을 함께 고려해 일상적인 자외선 차단을 기본 관리로 둡니다."
          : isPigmented
            ? "색소 흔적이 짙어지는 것을 줄이기 위해 일상적인 자외선 차단을 기본으로 합니다."
            : isWrinkled
              ? "광노화와 탄력 저하를 고려해 일상적인 자외선 차단을 기본으로 합니다."
              : "현재 피부 상태를 유지하기 위한 기본 관리로 자외선 차단을 권장합니다.",
    },
  ];
}

function getCareIntro(code: string) {
  const isOily = code.includes("O");
  const isDry = code.includes("D");
  const isSensitive = code.includes("S");
  const isPigmented = code.includes("P");
  const isWrinkled = code.includes("W");

  if (isOily && isSensitive && isPigmented && isWrinkled) {
    return "유분을 무조건 제거하기보다 균형을 맞추고, 민감한 피부에 자극을 늘리지 않는 것이 우선입니다. 여기에 색소 흔적과 광노화를 고려한 관리가 중요합니다.";
  }

  if (isDry && isSensitive) {
    return "건조함을 줄이면서 피부 장벽을 보호하고, 자극 부담을 최소화하는 관리가 우선입니다.";
  }

  if (isOily && isSensitive) {
    return "유분은 과도하게 제거하지 않고, 피부 자극을 줄이는 방향으로 관리하는 것이 중요합니다.";
  }

  if (isPigmented && isWrinkled) {
    return "기본적인 피부 균형을 유지하면서 색소 흔적과 광노화를 함께 고려하는 관리가 중요합니다.";
  }

  return "한 가지 고민만 집중하기보다 현재 피부 특성을 함께 고려해 기본 관리의 균형을 맞추는 것이 중요합니다.";
}

function getAdditionalCareText(code: string) {
  const isSensitive = code.includes("S");
  const isPigmented = code.includes("P");
  const isWrinkled = code.includes("W");

  if (isSensitive && isPigmented && isWrinkled) {
    return "기본 관리가 안정된 뒤 색소 흔적이나 주름 고민을 위한 기능성 제품을 피부 반응을 살피며 하나씩 추가할 수 있습니다.";
  }

  if (isPigmented && isWrinkled) {
    return "기본 관리에 색소 흔적과 주름·탄력 고민을 위한 기능성 제품을 필요에 따라 추가할 수 있습니다.";
  }

  if (isPigmented) {
    return "색소 흔적이 고민이라면 관련 기능성 제품을 기본 관리에 추가할 수 있습니다.";
  }

  if (isWrinkled) {
    return "주름이나 탄력이 고민이라면 관련 기능성 제품을 기본 관리에 추가할 수 있습니다.";
  }

  if (isSensitive) {
    return "새로운 기능성 제품은 한 번에 여러 개를 추가하기보다 피부 반응을 살피며 단계적으로 사용하는 것이 좋습니다.";
  }

  return "현재 피부 고민에 맞는 기능성 제품을 기본 관리에 필요에 따라 추가할 수 있습니다.";
}

export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const result = getSkinResultFromParams(params);

  if (!result) {
    return {
      title: "피부 타입 결과",
      description: "내 Baumann Skin Type 결과를 확인해보세요.",
    };
  }

  return {
    title: `${result.code} | Baumann Skin Type`,
    description: result.resultType.shareText ?? result.resultType.summary,
    openGraph: {
      title: `${result.code} | Baumann Skin Type`,
      description: result.resultType.shareText ?? result.resultType.summary,
    },
  };
}

export default async function SkinTypeResultPage({
  searchParams,
}: ResultPageProps) {
  const params = await searchParams;
  const result = getSkinResultFromParams(params);

  if (!result) {
    notFound();
  }

  const summary =
    result.resultType.summary ??
    result.resultType.description ??
    result.resultType.subtitle ??
    "";

  const rankedTraits = DIMENSION_KEYS.map((key, index) => {
    const score = result.scores[key];
    const maxScore = result.maxScores[key];
    const display = DIMENSION_DISPLAY[key];

    const markerPosition = Math.max(
      0,
      Math.min(100, (score / maxScore) * 100)
    );

    const selectedCode = result.code[index];
    const intensity = Math.abs(markerPosition - 50);

    return {
      key,
      markerPosition,
      selectedCode,
      intensity,
      display,
      copy: TRAIT_COPY[selectedCode],
    };
  }).sort((a, b) => b.intensity - a.intensity);

  const basicCareItems = getBasicCareItems(result.code);
  const careIntro = getCareIntro(result.code);
  const additionalCareText = getAdditionalCareText(result.code);

  return (
    <main className="flex min-h-screen justify-center bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-4 py-5 text-slate-900">
      <section className="w-full max-w-lg overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_18px_44px_rgba(15,118,110,0.10)]">
        {/* RESULT HERO */}
        <header className="px-5 pb-7 pt-7 text-center sm:px-7">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-emerald-600">
            Baumann Skin Type Result
          </p>

          <p className="mt-4 text-[3.25rem] font-black leading-none tracking-[-0.06em] text-emerald-700">
            {result.code}
          </p>

          <h1 className="mt-4 text-[1.65rem] font-black leading-tight tracking-[-0.035em] text-slate-950">
            {result.resultType.title}
          </h1>

          {summary ? (
            <p className="mx-auto mt-3 max-w-[24rem] text-sm font-medium leading-6 text-slate-600">
              {summary}
            </p>
          ) : null}
        </header>

        {/* PERSONAL ANALYSIS */}
        <section className="border-t border-slate-100 px-5 py-6 sm:px-7">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-emerald-600">
            Your Skin Analysis
          </p>

          <h2 className="mt-1.5 text-xl font-black tracking-tight text-slate-950">
            내 피부에서 주목할 특성
          </h2>

          <div className="mt-5">
            {rankedTraits.map((trait, index) => (
              <div
                key={trait.key}
                className={`flex gap-4 py-4 ${
                  index !== rankedTraits.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-black text-emerald-700">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-[0.95rem] font-black text-slate-950">
                      {trait.copy?.name}
                    </h3>

                    <span className="text-[0.65rem] font-black uppercase tracking-[0.08em] text-emerald-600">
                      {trait.selectedCode}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                    {trait.copy?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 AXES */}
        <section className="border-t border-slate-100 px-5 py-6 sm:px-7">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-emerald-600">
            4 Skin Characteristics
          </p>

          <h2 className="mt-1.5 text-xl font-black tracking-tight text-slate-950">
            나의 피부 특성 분포
          </h2>

          <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
            설문 응답을 바탕으로 네 가지 피부 특성의 위치를 보여드려요.
          </p>

          <div className="mt-6 space-y-6">
            {DIMENSION_KEYS.map((key, index) => {
              const score = result.scores[key];
              const maxScore = result.maxScores[key];
              const display = DIMENSION_DISPLAY[key];

              const markerPosition = Math.max(
                0,
                Math.min(100, (score / maxScore) * 100)
              );

              const selectedCode = result.code[index];

              const isLeftSelected = selectedCode === display.leftCode;
              const isRightSelected = selectedCode === display.rightCode;

              return (
                <div key={key}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={`whitespace-nowrap text-[0.7rem] font-black tracking-[0.035em] ${
                          isLeftSelected
                            ? "text-emerald-700"
                            : "text-slate-500"
                        }`}
                      >
                        {display.leftEn}
                      </p>

                      <p
                        className={`mt-0.5 text-[0.68rem] font-semibold ${
                          isLeftSelected
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        {display.leftKo}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`whitespace-nowrap text-[0.7rem] font-black tracking-[0.035em] ${
                          isRightSelected
                            ? "text-emerald-700"
                            : "text-slate-500"
                        }`}
                      >
                        {display.rightEn}
                      </p>

                      <p
                        className={`mt-0.5 text-[0.68rem] font-semibold ${
                          isRightSelected
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        {display.rightKo}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-2.5 h-1.5 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${markerPosition}%` }}
                    />

                    <div
                      className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-emerald-600 shadow-[0_1px_4px_rgba(5,150,105,0.35)]"
                      style={{ left: `${markerPosition}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* BASIC CARE */}
        <section className="border-t border-slate-100 px-5 py-7 sm:px-7">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-emerald-600">
            Basic Skincare
          </p>

          <h2 className="mt-1.5 text-xl font-black tracking-tight text-slate-950">
            {result.code}라면 이렇게 관리하세요
          </h2>

          <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
            {careIntro}
          </p>

          <div className="mt-5">
            {basicCareItems.map((item, index) => (
              <div
                key={item.title}
                className={`flex gap-4 py-4 ${
                  index !== basicCareItems.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <span className="pt-0.5 text-xs font-black tabular-nums text-emerald-600">
                  0{index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[0.95rem] font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-[18px] bg-[#f7fbf9] px-4 py-4">
            <p className="text-xs font-black text-emerald-700">
              기본 관리가 안정된 뒤
            </p>

            <p className="mt-1.5 text-sm font-medium leading-6 text-slate-600">
              {additionalCareText}
            </p>
          </div>

          {/* PRODUCT CTA */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.14em] text-emerald-600">
              Product Guide
            </p>

            <h3 className="mt-1.5 text-lg font-black tracking-tight text-slate-950">
              이 관리 기준에 맞는 제품
            </h3>

            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
              클렌저부터 보습제, 선크림과 고민별 케어까지{" "}
              {result.code} 피부 특성을 기준으로 정리했습니다.
            </p>

            <Link
              href={`/play/skin-type/products?type=${result.code}`}
              className="mt-4 flex h-[3.5rem] w-full items-center justify-center rounded-[18px] bg-emerald-600 text-sm font-black text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)] transition hover:bg-emerald-500"
            >
              {result.code} 추천 제품 보기
              <span aria-hidden="true" className="ml-1.5">
                →
              </span>
            </Link>
          </div>
        </section>

        {/* SHARE + FOOTER */}
        <footer className="border-t border-slate-100 px-5 pb-6 pt-6 sm:px-7">
          <ResultShare
            shareText={
              result.resultType.shareText ??
              `내 피부의 MBTI(?)는 ${result.code}`
            }
            title={result.resultType.title}
          />

          <Link
            href="/"
            className="mt-3 flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            처음부터 다시 하기
          </Link>

          <p className="mx-auto mt-4 max-w-sm text-center text-[0.68rem] font-medium leading-5 text-slate-400">
            설문 결과는 피부 타입 경향을 파악하기 위한 참고용이며 의학적 진단을
            대체하지 않습니다.
          </p>
        </footer>
      </section>
    </main>
  );
}