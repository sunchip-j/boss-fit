"use client";

import Link from "next/link";
import { useState } from "react";

const SURVEY_AXES = [
  {
    left: "건성",
    leftCode: "D",
    right: "지성",
    rightCode: "O",
    description: "피부의 유분과 보습 특성",
  },
  {
    left: "저항성",
    leftCode: "R",
    right: "민감성",
    rightCode: "S",
    description: "외부 자극에 대한 피부 반응",
  },
  {
    left: "비색소성",
    leftCode: "N",
    right: "색소성",
    rightCode: "P",
    description: "색소 침착 경향",
  },
  {
    left: "탄력",
    leftCode: "T",
    right: "주름",
    rightCode: "W",
    description: "피부 노화와 주름 특성",
  },
];

function InfoIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 10.8v5.1M12 7.6h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7.8v4.6l3.1 1.9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function SkinTypeStartScreen() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7fbf8] text-[#101828]">
      <section className="mx-auto min-h-screen w-full max-w-[28rem]">
        <div className="px-5 pt-4">
          {/* Hero */}
          <section>
            <div className="grid grid-cols-[minmax(0,1fr)_2.25rem] items-center gap-3">
              <p className="min-w-0 truncate text-[0.69rem] font-black uppercase tracking-[0.2em] text-emerald-700">
                BAUMANN SKIN TYPE SYSTEM
              </p>

              <button
                aria-label="바우만 피부 타입 안내 열기"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-white"
                type="button"
                onClick={() => setIsInfoOpen(true)}
              >
                <InfoIcon />
              </button>
            </div>

            <h1 className="mt-4 text-[1.9rem] font-black leading-[1.13] tracking-[-0.038em] text-slate-950 sm:text-[2.1rem]">
              내 <span className="text-emerald-600">SKIN TYPE</span>을
              <br />
              확인해보세요.
            </h1>

            <p className="mt-5 max-w-[22rem] text-[0.96rem] font-semibold leading-7 text-slate-600">
              피부과 전문의 Leslie Baumann, M.D.가 개발한 피부 타입 분류
              체계를 기반으로 합니다.
            </p>

            <p className="mt-2 text-sm font-bold text-emerald-700">
              쉽게 말하면, 피부의 MBTI(?)라고 볼 수 있어요.
            </p>
          </section>

          {/* 4가지 피부 특성 */}
          <section className="mt-5 rounded-[28px] bg-white px-5 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)] ring-1 ring-slate-100">
            <div>
              <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-700">
                4 Skin Characteristics
              </p>

              <h2 className="mt-2 text-lg font-black tracking-tight text-slate-950">
                피부 타입을 결정하는 4가지 기준
              </h2>
            </div>

            <div className="mt-6 space-y-6">
              {SURVEY_AXES.map((axis) => (
                <div key={`${axis.leftCode}-${axis.rightCode}`}>
                  <div className="grid grid-cols-[4.9rem_minmax(2.5rem,1fr)_4.9rem] items-center gap-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <p className="text-xl font-black leading-none text-slate-950">
                          {axis.leftCode}
                        </p>

                        <p className="text-sm font-bold text-slate-500">
                          {axis.left}
                        </p>
                      </div>
                    </div>

                    <div className="relative h-px bg-slate-200">
                      <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-slate-300" />
                      <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-slate-300" />
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-1.5">
                        <p className="text-sm font-bold text-slate-500">
                          {axis.right}
                        </p>

                        <p className="text-xl font-black leading-none text-slate-950">
                          {axis.rightCode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    {axis.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-sm font-semibold leading-6 text-slate-500">
                네 가지 특성의 조합을 통해
                <strong className="ml-1 font-black text-slate-800">
                  16가지 피부 타입
                </strong>
                중 하나로 분류합니다.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6">
            <Link
              href="/survey"
              className="flex min-h-[4.5rem] w-full flex-col items-center justify-center rounded-[20px] bg-emerald-600 text-white shadow-[0_16px_34px_rgba(5,150,105,0.24)] transition hover:bg-emerald-500"
            >
              <span className="flex items-center gap-2 text-base font-black">
                내 피부 타입 분석하기
                <span aria-hidden="true">→</span>
              </span>

              <span className="mt-1 flex items-center gap-1.5 text-[0.7rem] font-semibold text-emerald-100">
                <ClockIcon />
                33문항 · 약 3~5분
              </span>
            </Link>

            <p className="mx-auto mt-3 max-w-[22rem] text-center text-[0.68rem] font-medium leading-5 text-slate-400">
              피부 특성을 이해하기 위한 참고용 분석이며 의학적 진단을 대체하지
              않습니다.
            </p>
          </section>
        </div>
      </section>

      {/* Baumann 설명 모달 */}
      {isInfoOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/35 px-3"
          role="dialog"
        >
          <button
            aria-label="바우만 피부 타입 안내 닫기"
            className="absolute inset-0 cursor-default"
            type="button"
            onClick={() => setIsInfoOpen(false)}
          />

          <section className="relative mb-3 max-h-[82vh] w-full max-w-[28rem] overflow-y-auto rounded-[30px] bg-white px-5 pb-6 pt-4 shadow-2xl">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-200" />

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-700">
                  BAUMANN SKIN TYPE SYSTEM
                </p>

                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                  바우만 피부 타입이란?
                </h2>
              </div>

              <button
                aria-label="닫기"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-50 text-lg font-black text-slate-500"
                type="button"
                onClick={() => setIsInfoOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-5 text-sm font-semibold leading-6 text-slate-600">
              <p>
                피부과 전문의 Leslie Baumann, M.D.가 개발한 피부 타입 분류
                체계로, 피부 특성을 4가지 기준으로 나누어 살펴봅니다.
              </p>

              <div className="grid gap-3">
                {SURVEY_AXES.map((axis) => (
                  <div
                    key={`info-${axis.leftCode}-${axis.rightCode}`}
                    className="rounded-2xl bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black tracking-[0.18em] text-emerald-700">
                        {axis.leftCode} / {axis.rightCode}
                      </p>

                      <p className="text-sm font-black text-slate-800">
                        {axis.left} ↔ {axis.right}
                      </p>
                    </div>

                    <p className="mt-1.5 text-xs font-semibold text-slate-500">
                      {axis.description}
                    </p>
                  </div>
                ))}
              </div>

              <p>
                각 기준의 결과를 조합해 DSNT, OSPW와 같은
                <strong className="mx-1 font-black text-slate-800">
                  16가지 피부 타입
                </strong>
                중 하나로 분류합니다.
              </p>

              <p className="border-t border-slate-100 pt-4 text-xs font-medium leading-5 text-slate-500">
                본 분석은 피부 특성의 경향을 이해하기 위한 참고용이며 의학적
                진단을 대체하지 않습니다.
              </p>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
