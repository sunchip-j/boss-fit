import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DIMENSION_LABELS,
  LETTER_LABELS,
  getSkinResultFromParams,
} from "@/features/skin-type/calculate";
import { ResultShare } from "@/features/skin-type/components/result-share";
import { DIMENSION_KEYS } from "@/features/skin-type/types";

type ResultPageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const result = getSkinResultFromParams(params);

  if (!result) {
    return {
      title: "피부 타입 결과",
      description: "내 Modified Baumann Skin Type 결과를 확인해보세요.",
    };
  }

  return {
    title: `${result.code} | Modified Baumann Skin Type`,
    description: result.resultType.shareText ?? result.resultType.summary,
    openGraph: {
      title: `${result.code} | Modified Baumann Skin Type`,
      description: result.resultType.shareText ?? result.resultType.summary,
    },
  };
}

export default async function SkinTypeResultPage({ searchParams }: ResultPageProps) {
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
  const legacyTraits = Array.isArray(result.resultType.traits)
    ? result.resultType.traits
    : [];
  const features = result.resultType.features ?? legacyTraits;
  const carePoints = result.resultType.carePoints ?? [];
  const caution = result.resultType.caution ?? "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-4 py-8 text-slate-900">
      <section className="w-full max-w-lg rounded-[32px] border border-emerald-100 bg-white px-6 py-8 shadow-[0_18px_44px_rgba(15,118,110,0.14)] sm:px-8">
        <div className="space-y-6">
          <div className="space-y-3 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-600">
              Skin Type Result
            </p>
            <div className="mx-auto inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              {result.code}
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              {result.resultType.title}
            </h1>
            {summary ? (
              <p className="text-sm leading-7 text-slate-600">{summary}</p>
            ) : null}
          </div>

          {features.length > 0 ? (
            <div className="rounded-[24px] bg-emerald-50/70 p-4">
              <h2 className="text-sm font-black text-slate-900">특징</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {carePoints.length > 0 ? (
            <div className="rounded-[24px] bg-slate-50 p-4">
              <h2 className="text-sm font-black text-slate-900">관리 포인트</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {carePoints.map((carePoint) => (
                  <li key={carePoint}>{carePoint}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {caution ? (
            <div className="rounded-[24px] border border-amber-100 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900">
              {caution}
            </div>
          ) : null}

          <div className="rounded-[24px] bg-slate-50 p-4">
            <div className="grid grid-cols-4 gap-2 text-center">
              {result.code.split("").map((letter) => (
                <div key={letter} className="rounded-2xl bg-white px-2 py-3">
                  <p className="text-xl font-black text-slate-900">{letter}</p>
                  <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-500">
                    {LETTER_LABELS[letter]}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {DIMENSION_KEYS.map((key) => {
                const score = result.scores[key];
                const threshold = result.thresholds[key];
                const maxScore = result.maxScores[key];

                return (
                  <div key={key} className="rounded-2xl bg-white px-3 py-3">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold text-slate-600">
                        {DIMENSION_LABELS[key]}
                      </span>
                      <span className="font-black text-slate-900">
                        {score} / {maxScore}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${Math.max(8, Math.min(100, (score / maxScore) * 100))}%`,
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      기준점 {threshold} 초과 시 오른쪽 특성으로 판정합니다.
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <ResultShare
            shareText={
              result.resultType.shareText ??
              `내 Modified Baumann Skin Type은 ${result.code}`
            }
            title={result.resultType.title}
          />

          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            처음부터 다시 하기
          </Link>

          <p className="text-center text-xs leading-5 text-slate-500">
            설문 결과는 피부 타입 경향을 파악하기 위한 참고용이며 의학적 진단을
            대체하지 않습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
