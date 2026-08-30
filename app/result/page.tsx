import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSkinResultFromParams } from "@/features/skin-type/calculate";
import { ResultShare } from "@/features/skin-type/components/result-share";
import { getSkinTypeCards } from "@/features/skin-type/data/skin-type-info";
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

const iconStyles = [
  { bg: "bg-drnt-100", text: "text-[#173404]" },
  { bg: "bg-drnt-200", text: "text-[#173404]" },
  { bg: "bg-drnt-300", text: "text-[#173404]" },
  { bg: "bg-drnt-400", text: "text-[#EAF3DE]" },
];

function getBasicCareItems(code: string): BasicCareItem[] {
  const isDry = code.includes("D");
  const isOily = code.includes("O");
  const isSensitive = code.includes("S");
  const isPigmented = code.includes("P");
  const isNonPigmented = code.includes("N");
  const isWrinkled = code.includes("W");

  const tips: BasicCareItem[] = [
    {
      title: "순한 세안",
      description: isSensitive
        ? "자극을 줄이는 순한 세안이 좋아요."
        : isDry
          ? "세안 후 당김이 적은 순한 세안이 좋아요."
          : "유분과 노폐물을 가볍게 씻어내는 세안이 좋아요.",
    },
    {
      title: isDry
        ? "충분한 보습"
        : isOily
          ? "가벼운 보습"
          : "균형 있는 보습",
      description: isDry
        ? "수분과 유분을 보완해 건조함을 줄여주세요."
        : isOily
          ? "무거운 유분감보다 산뜻한 보습이 좋아요."
          : "피부가 편안한 수준의 보습이 좋아요.",
    },
    {
      title: "자외선 차단",
      description:
        isPigmented && isWrinkled
          ? "색소 흔적과 탄력 저하를 줄이도록 매일 보호해 주세요."
          : isPigmented
            ? "색소 흔적이 짙어지지 않도록 매일 보호해 주세요."
            : isWrinkled
              ? "탄력 저하를 줄이도록 매일 보호해 주세요."
              : "매일 자외선 차단으로 피부를 보호해 주세요.",
    },
  ];

  if (isNonPigmented) {
    tips.push({
      title: "탄력 예방",
      description: "색소 케어보다 탄력 저하를 미리 살펴주세요.",
    });
  }

  return tips;
}

export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const result = getSkinResultFromParams(params);

  if (!result) {
    return {
      title: "피부 타입 결과",
      description: "내 바우만 피부 타입 결과를 확인해보세요.",
    };
  }

  return {
    title: `${result.code} | BAUMANN SKIN TYPE`,
    description: result.resultType.shareText ?? result.resultType.summary,
    openGraph: {
      title: `${result.code} | BAUMANN SKIN TYPE`,
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
  const skinTypeCards = getSkinTypeCards(result.code);

  const basicCareItems = getBasicCareItems(result.code);
  return (
    <main className="flex min-h-screen justify-center bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-4 py-5 text-slate-900">
      <section className="w-full max-w-lg overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_18px_44px_rgba(15,118,110,0.10)]">
        {/* RESULT HERO */}
        <header className="px-5 pb-6 pt-7 text-center sm:px-7">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-emerald-600">
            BAUMANN SKIN TYPE
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
        <section className="border-t border-slate-100 px-5 py-4 sm:px-7">
          <div>
            {skinTypeCards.map((card, index) => (
              <div
                key={card.code}
                className={`flex items-center gap-4 py-3.5 ${
                  index !== skinTypeCards.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <span
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-[1.35rem] font-black leading-none ${iconStyles[index].bg} ${iconStyles[index].text}`}
                >
                  {card.code}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[0.95rem] font-black text-slate-950">
                    {card.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                    {card.description}
                  </p>

                  <p className="mt-1 text-sm font-medium leading-6 text-emerald-700">
                    {card.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 AXES */}
        <section className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-7">
          <div className="space-y-5">
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
        <section className="border-t border-slate-100 px-5 py-6 sm:px-7">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            이렇게 관리해보세요
          </h2>

          <div className="mt-3">
            {basicCareItems.map((item, index) => (
              <div
                key={item.title}
                className={`flex gap-4 py-4 ${
                  index !== basicCareItems.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <span className="pt-0.5 text-[0.9rem] font-bold tabular-nums text-emerald-600">
                  0{index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-base font-medium leading-[1.6] text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* PRODUCT CTA */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-950">
              내 피부에 맞는 제품
            </h3>

            <p className="mt-2 text-[0.8125rem] font-medium text-slate-500">
              {result.code} 타입을 위한 제품이에요
            </p>

            <Link
              href={`/play/skin-type/products?type=${result.code}`}
              className="mt-4 flex h-[3.5rem] w-full items-center justify-center rounded-[18px] bg-emerald-600 text-base font-bold text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)] transition hover:bg-emerald-500"
            >
              맞춤 제품 보기
              <span aria-hidden="true" className="ml-1.5">
                →
              </span>
            </Link>

            <ResultShare
              shareText={
                result.resultType.shareText ??
                `내 피부의 MBTI(?)는 ${result.code}`
              }
              title={result.resultType.title}
            />
          </div>
        </section>

        {/* SHARE + FOOTER */}
        <footer className="border-t border-slate-100 px-5 pb-6 pt-6 sm:px-7">
          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
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
