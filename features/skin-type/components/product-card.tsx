import type { ResolvedRecommendedProduct } from "@/features/skin-type/types";

const CATEGORY_LABELS = {
  cleanser: "클렌저",
  toner: "토너",
  serum: "세럼",
  moisturizer: "로션·크림",
  sunscreen: "선크림",
};

type ProductCardProps = {
  recommendation: ResolvedRecommendedProduct;
};

export function ProductCard({ recommendation }: ProductCardProps) {
  const { product } = recommendation;

  return (
    <article className="rounded-[18px] border border-slate-100 bg-white p-4 shadow-[0_5px_16px_rgba(15,23,42,0.045)]">
      <div className="flex gap-3.5">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-[14px] bg-slate-50 object-cover"
          />
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.68rem] font-black tracking-[0.06em] text-emerald-700">
                {product.brand}
              </p>

              <h3 className="mt-0.5 text-base font-black leading-6 tracking-tight text-slate-950">
                {product.name}
              </h3>
            </div>

            <span className="shrink-0 text-[0.65rem] font-bold text-slate-400">
              {CATEGORY_LABELS[product.category]}
            </span>
          </div>

          {product.tags.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-50 px-2.5 py-1 text-[0.64rem] font-bold text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
        {recommendation.recommendation.reason}
      </p>

      {product.oliveYoungUrl ? (
        <a
          href={product.oliveYoungUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center text-xs font-black text-emerald-700 transition hover:text-emerald-600"
        >
          제품 보기
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </a>
      ) : null}
    </article>
  );
}