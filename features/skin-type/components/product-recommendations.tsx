"use client";

import { useState } from "react";
import { ProductCard } from "@/features/skin-type/components/product-card";
import { getRoutineSteps } from "@/features/skin-type/data/skin-type-info";
import { getRecommendedProductsByCategory } from "@/features/skin-type/lib/product-recommendation";
import type {
  ProductCategory,
  SkinTypeCode,
} from "@/features/skin-type/types";

type ProductRecommendationsProps = {
  skinType: SkinTypeCode;
};

function getMoreButtonText(categoryLabel: string, count: number) {
  return `다른 ${categoryLabel} 추천 ${count}개 보기`;
}

export function ProductRecommendations({
  skinType,
}: ProductRecommendationsProps) {
  const [expandedCategories, setExpandedCategories] = useState<
    Partial<Record<ProductCategory, boolean>>
  >({});

  const routineSteps = getRoutineSteps(skinType);

  return (
    <section>
      {/* Header */}
      <header>
        <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-700">
          Basic Skincare Routine
        </p>

        <h2 className="mt-1.5 text-xl font-black tracking-tight text-slate-950">
          내 피부를 위한 기본 루틴
        </h2>

        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          <strong className="font-black text-emerald-700">{skinType}</strong>
          에 맞춰 기본 스킨케어 순서와 제품을 정리했어요.
        </p>
      </header>

      {/* Routine Summary */}
      <div className="mt-5 rounded-[18px] bg-[#f7fbf9] px-4 py-3.5">
        <p className="text-xs font-black text-slate-900">기본 루틴</p>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          {routineSteps.map((step, index) => (
            <div
              key={`summary-${step.category}`}
              className="flex items-center gap-2"
            >
              <span className="whitespace-nowrap text-xs font-black text-emerald-700">
                {step.label}
                {step.optional ? (
                  <span className="ml-1 font-semibold text-slate-400">
                    *
                  </span>
                ) : null}
              </span>

              {index !== routineSteps.length - 1 ? (
                <span className="text-xs text-slate-300">→</span>
              ) : null}
            </div>
          ))}
        </div>

        {routineSteps.some((step) => step.optional) ? (
          <p className="mt-2 text-[0.68rem] font-medium text-slate-400">
            * 피부 상태에 따라 선택적으로 추가
          </p>
        ) : null}
      </div>

      {/* Routine Steps */}
      <div className="mt-5">
        {routineSteps.map((step, index) => {
          const recommendations = getRecommendedProductsByCategory(
            skinType,
            step.category
          );

          const [primaryRecommendation, ...additionalRecommendations] =
            recommendations;

          const isExpanded = Boolean(expandedCategories[step.category]);

          return (
            <section
              key={step.category}
              className={`py-5 ${
                index !== routineSteps.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}
            >
              {/* Step */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-black tracking-[0.12em] text-emerald-700">
                    {String(index + 1).padStart(2, "0")} {step.label}
                  </p>

                  <p className="mt-1.5 text-sm font-semibold leading-5 text-slate-600">
                    {step.description}
                  </p>
                </div>

                {step.optional ? (
                  <span className="shrink-0 pt-0.5 text-[0.68rem] font-semibold text-slate-400">
                    필요에 따라
                  </span>
                ) : null}
              </div>

              {/* Primary recommendation */}
              {primaryRecommendation ? (
                <div className="mt-3">
                  <ProductCard recommendation={primaryRecommendation} />

                  {additionalRecommendations.length > 0 ? (
                    <div className="mt-2.5">
                      <button
                        type="button"
                        className="flex min-h-10 w-full items-center justify-center text-xs font-black text-slate-500 transition hover:text-emerald-700"
                        onClick={() =>
                          setExpandedCategories((current) => ({
                            ...current,
                            [step.category]: !isExpanded,
                          }))
                        }
                      >
                        {isExpanded
                          ? "추가 추천 접기"
                          : getMoreButtonText(
                              step.label,
                              additionalRecommendations.length
                            )}

                        <span aria-hidden="true" className="ml-1">
                          {isExpanded ? "⌃" : "›"}
                        </span>
                      </button>

                      {isExpanded ? (
                        <div className="mt-2 space-y-3">
                          {additionalRecommendations.map((recommendation) => (
                            <ProductCard
                              key={recommendation.product.id}
                              recommendation={recommendation}
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="mt-3 text-sm font-semibold text-slate-400">
                  추천 제품을 준비하고 있어요.
                </p>
              )}
            </section>
          );
        })}
      </div>

      <p className="mt-4 text-[0.68rem] leading-5 text-slate-400">
        제품 추천은 피부 특성을 기준으로 한 참고 정보이며 의학적 진단이나
        처방을 대체하지 않습니다.
      </p>
    </section>
  );
}