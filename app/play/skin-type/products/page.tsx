import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductRecommendations } from "@/features/skin-type/components/product-recommendations";
import { ResultBackButton } from "@/features/skin-type/components/result-back-button";
import type { SkinTypeCode } from "@/features/skin-type/types";

type SkinTypeProductsPageProps = {
  searchParams: Promise<{
    type?: string | string[] | undefined;
  }>;
};

function parseSkinTypeCode(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!rawValue) {
    return null;
  }

  const code = rawValue.toUpperCase();

  if (!/^[DO][SR][PN][WT]$/.test(code)) {
    return null;
  }

  return code as SkinTypeCode;
}

export async function generateMetadata({
  searchParams,
}: SkinTypeProductsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const skinType = parseSkinTypeCode(params.type);

  if (!skinType) {
    return {
      title: "맞춤 제품 추천 | BAUMANN SKIN TYPE",
    };
  }

  const title = `${skinType} 맞춤 제품 추천 | BAUMANN SKIN TYPE`;
  const description = `${skinType} 피부 특성을 고려한 기본 스킨케어 루틴과 단계별 추천 제품을 확인해보세요.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function SkinTypeProductsPage({
  searchParams,
}: SkinTypeProductsPageProps) {
  const params = await searchParams;
  const skinType = parseSkinTypeCode(params.type);

  if (!skinType) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-4 py-5 text-slate-900">
      <section className="mx-auto w-full max-w-lg space-y-5">
        <header className="rounded-[28px] border border-emerald-100 bg-white px-5 py-6 shadow-[0_18px_44px_rgba(15,118,110,0.10)]">
          <ResultBackButton />

          <p className="mt-6 text-[0.68rem] font-black uppercase tracking-[0.24em] text-emerald-600">
            BAUMANN SKIN TYPE
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {skinType} 맞춤 제품 추천
          </h1>

          <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
            {skinType} 피부 특성을 고려한
            <br />
            기본 스킨케어 루틴과 추천 제품을 확인해보세요.
          </p>
        </header>

        <section className="rounded-[28px] border border-emerald-100 bg-white px-5 py-6 shadow-[0_18px_44px_rgba(15,118,110,0.10)]">
          <ProductRecommendations skinType={skinType} />
        </section>

        <div className="space-y-3 pb-3">
          <Link
            href="/play/skin-type"
            className="flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            검사 처음으로
          </Link>

          <p className="text-center text-xs leading-5 text-slate-500">
            제품 추천은 피부 특성을 이해하기 위한 참고 정보이며 의학적 진단이나
            처방을 대체하지 않습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
