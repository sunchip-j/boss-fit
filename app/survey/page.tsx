import type { Metadata } from "next";
import Link from "next/link";
import { skinQuestions } from "@/features/skin-type/calculate";
import { TestRunner } from "@/features/skin-type/components/test-runner";

export const metadata: Metadata = {
  title: "피부 타입 설문",
  description: "바우만 피부 타입 설문을 진행합니다.",
};

export default function SkinTypeSurveyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-4 py-5 text-slate-900">
      <div className="mx-auto max-w-md space-y-3">
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
