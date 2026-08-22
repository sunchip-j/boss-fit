"use client";

import Link from "next/link";
import { useState } from "react";

const SURVEY_AXES = [
  {
    left: "건성",
    leftCode: "D",
    right: "지성",
    rightCode: "O",
  },
  {
    left: "저항성",
    leftCode: "R",
    right: "민감성",
    rightCode: "S",
  },
  {
    left: "비색소성",
    leftCode: "N",
    right: "색소성",
    rightCode: "P",
  },
  {
    left: "탄력",
    leftCode: "T",
    right: "주름",
    rightCode: "W",
  },
];

const QUICK_INFO = ["33문항", "4가지 피부 축", "16가지 타입"];

function BackIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M15 18 9 12l6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
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
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
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
    <main className="min-h-screen overflow-x-hidden bg-[#f5fbf7] text-[#101828]">
      <section className="mx-auto min-h-screen w-full max-w-[28rem] pb-60">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between bg-[#f5fbf7]/92 px-4 backdrop-blur">
          <Link
            aria-label="뒤로가기"
            href="/"
            className="grid h-10 w-10 place-items-center rounded-full text-slate-700 transition hover:bg-white"
          >
            <BackIcon />
          </Link>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-900">
            Baumann Skin Type
          </p>
          <button
            aria-label="바우만 피부타입 안내 열기"
            className="grid h-10 w-10 place-items-center rounded-full text-slate-700 transition hover:bg-white"
            type="button"
            onClick={() => setIsInfoOpen(true)}
          >
            <InfoIcon />
          </button>
        </header>

        <div className="px-5 pt-5">
          <section className="rounded-[34px] bg-[#eaf8f0] px-5 pb-7 pt-6">
            <p className="inline-flex rounded-full bg-white/80 px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-700 shadow-sm">
              Baumann Type System
            </p>
            <h1 className="mt-6 text-[2.65rem] font-black leading-[1.02] tracking-tight text-slate-950">
              나는 어떤
              <br />
              <span className="text-emerald-600">피부 타입</span>일까?
            </h1>
            <p className="mt-5 max-w-[20rem] text-[0.98rem] font-semibold leading-7 text-slate-600">
              바우만 피부타입 분류를 바탕으로 4가지 피부 특성을 살펴보고 나의
              피부 유형을 확인해보세요.
            </p>
          </section>

          <section className="mt-5 rounded-[30px] bg-white px-4 py-5 shadow-[0_18px_44px_rgba(15,23,42,0.07)] ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-950">4가지 피부 축</h2>
              <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[0.65rem] font-black tracking-[0.16em] text-slate-500">
                4 AXES
              </span>
            </div>

            <div className="mt-5 space-y-5">
              {SURVEY_AXES.map((axis) => (
                <div
                  key={`${axis.leftCode}-${axis.rightCode}`}
                  className="grid grid-cols-[4.8rem_minmax(3rem,1fr)_4.8rem] items-center gap-3"
                >
                  <div>
                    <p className="text-xl font-black leading-none text-slate-950">
                      {axis.leftCode}
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-500">{axis.left}</p>
                  </div>
                  <div className="h-px rounded-full bg-slate-200" />
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-500">{axis.right}</p>
                    <p className="mt-1 text-xl font-black leading-none text-slate-950">
                      {axis.rightCode}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 px-1 text-center">
            <p className="text-sm font-bold text-slate-500">
              네 가지 결과를 조합하면
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              {["D", "S", "N", "T"].map((letter) => (
                <span
                  key={letter}
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-slate-950 shadow-sm ring-1 ring-slate-100"
                >
                  {letter}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <strong className="text-2xl font-black tracking-[0.16em] text-slate-950">
                DSNT
              </strong>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">
                예시
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
              나만의 4글자 피부타입이 완성됩니다.
            </p>
          </section>

          <section className="mt-6 grid grid-cols-3 gap-2">
            {QUICK_INFO.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white px-2 py-3 text-center shadow-sm ring-1 ring-slate-100"
              >
                <span className="mx-auto block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <p className="mt-2 text-xs font-black text-slate-700">{item}</p>
              </div>
            ))}
          </section>

          <button
            className="mx-auto mb-8 mt-6 flex items-center gap-1.5 text-sm font-black text-emerald-700"
            type="button"
            onClick={() => setIsInfoOpen(true)}
          >
            바우만 피부타입 알아보기
            <span aria-hidden="true">›</span>
          </button>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#f5fbf7] via-[#f5fbf7] to-[#f5fbf7]/0 px-4 pb-5 pt-8">
          <div className="mx-auto max-w-[28rem]">
            <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500">
              <ClockIcon />
              예상 소요 시간 · 약 3~5분
            </p>
            <Link
              href="/play/skin-type/test"
              className="mt-3 flex h-[3.75rem] w-full items-center justify-center gap-2 rounded-[22px] bg-emerald-600 text-base font-black text-white shadow-[0_18px_36px_rgba(5,150,105,0.28)] transition hover:bg-emerald-500"
            >
              피부 타입 분석 시작하기
              <span aria-hidden="true">→</span>
            </Link>
            <p className="mx-auto mt-3 max-w-[21rem] text-center text-[0.7rem] font-medium leading-5 text-slate-400">
              본 테스트는 피부 타입의 경향을 알아보기 위한 참고용이며 의학적
              진단을 대체하지 않습니다.
            </p>
          </div>
        </div>
      </section>

      {isInfoOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/35 px-3"
          role="dialog"
        >
          <button
            aria-label="바우만 피부타입 안내 닫기"
            className="absolute inset-0 cursor-default"
            type="button"
            onClick={() => setIsInfoOpen(false)}
          />
          <section className="relative mb-3 max-h-[82vh] w-full max-w-[28rem] overflow-y-auto rounded-[32px] bg-white px-5 pb-6 pt-4 shadow-2xl">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-200" />
            <div className="mt-5 flex items-start justify-between gap-4">
              <h2 className="text-xl font-black tracking-tight text-slate-950">
                바우만 피부타입이란?
              </h2>
              <button
                aria-label="닫기"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-50 text-lg font-black text-slate-500"
                type="button"
                onClick={() => setIsInfoOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="mt-4 space-y-5 text-sm font-semibold leading-6 text-slate-600">
              <p>
                피부 특성을 4가지 기준으로 나누어 살펴보고, 그 조합으로 피부
                타입을 분류하는 방식입니다.
              </p>
              <div className="grid gap-3">
                {SURVEY_AXES.map((axis) => (
                  <div
                    key={`info-${axis.leftCode}-${axis.rightCode}`}
                    className="rounded-2xl bg-slate-50 px-4 py-3"
                  >
                    <p className="text-xs font-black tracking-[0.18em] text-emerald-700">
                      {axis.leftCode} / {axis.rightCode}
                    </p>
                    <p className="mt-1 font-black text-slate-800">
                      {axis.left} ↔ {axis.right}
                    </p>
                  </div>
                ))}
              </div>
              <p>
                네 가지 결과를 조합해 DSNT, OSPW와 같은 16가지 피부 타입 중
                하나로 분류합니다.
              </p>
              <p className="border-t border-slate-100 pt-4 text-xs font-medium leading-5 text-slate-500">
                본 테스트는 피부 타입의 경향을 알아보기 위한 참고용이며 의학적
                진단을 대체하지 않습니다.
              </p>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
