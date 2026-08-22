import type { Metadata } from "next";
import Link from "next/link";
import { skinQuestions } from "@/features/skin-type/calculate";
import { TestRunner } from "@/features/skin-type/components/test-runner";

export const metadata: Metadata = {
  title: "피부 타입 설문",
  description: "Modified Baumann Skin Type 설문을 진행합니다.",
};

export default function SkinTypeTestPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-md space-y-5">
        <div className="space-y-2 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-600">
            Modified Baumann Skin Type
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            피부 타입 설문
          </h1>
          <p className="text-sm leading-6 text-slate-500">
            최근 3개월의 피부 상태를 기준으로 가장 가까운 답을 골라주세요.
          </p>
        </div>

        <TestRunner questions={skinQuestions} />

        <Link
          href="/"
          className="flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          처음으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
