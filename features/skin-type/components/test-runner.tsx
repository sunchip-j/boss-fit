"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  calculateSkinType,
  encodeSkinResult,
  skinDimensionMap,
} from "@/features/skin-type/calculate";
import type { SkinQuestion } from "@/features/skin-type/types";

type TestRunnerProps = {
  questions: SkinQuestion[];
};

export function TestRunner({ questions }: TestRunnerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [isSubmitting, startTransition] = useTransition();

  const currentQuestion = questions[currentIndex];
  const answerCount = Object.keys(answers).length;
  const currentChoiceIndex = answers[currentQuestion.id];
  const canGoPrev = currentIndex > 0;
  const isLastQuestion = currentIndex === questions.length - 1;
  const allAnswered = answerCount === questions.length;

  function handleSelect(choiceIndex: number) {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: choiceIndex,
    }));
    setError("");

    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
    }
  }

  function handlePrevious() {
    if (canGoPrev) {
      setCurrentIndex((index) => index - 1);
    }
  }

  function handleNext() {
    if (currentChoiceIndex !== undefined && !isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      setError("");
      return;
    }

    setError("선택지를 하나 골라주세요.");
  }

  function handleSubmit() {
    if (!allAnswered) {
      setError(`${questions.length}개 문항에 모두 답해 주세요.`);
      return;
    }

    startTransition(() => {
      try {
        const result = calculateSkinType(answers);
        router.push(`/result?${encodeSkinResult(result)}`);
      } catch (submissionError) {
        setError(
          submissionError instanceof Error
            ? submissionError.message
            : "결과 계산 중 오류가 발생했습니다."
        );
      }
    });
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-[28px] border border-emerald-100 bg-white px-5 py-6 shadow-[0_18px_40px_rgba(15,118,110,0.12)] sm:px-6">
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
            <span>
              {currentIndex + 1} / {questions.length}
            </span>
            <span>{skinDimensionMap[currentQuestion.dimension].title}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-[24px] bg-emerald-50/70 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
            Question {currentIndex + 1}
          </p>
          <h1 className="mt-2 text-xl font-black leading-8 text-slate-900">
            {currentQuestion.text}
          </h1>
          {currentQuestion.note ? (
            <p className="mt-3 rounded-2xl border border-emerald-100 bg-white px-3 py-2 text-sm leading-6 text-slate-600">
              {currentQuestion.note}
            </p>
          ) : null}
          {currentQuestion.sourceNote ? (
            <p className="mt-3 text-xs leading-5 text-amber-700">
              {currentQuestion.sourceNote}
            </p>
          ) : null}
        </div>

        <div className="space-y-3">
          {currentQuestion.choices.map((choice, choiceIndex) => {
            const isSelected = currentChoiceIndex === choiceIndex;

            return (
              <button
                key={`${currentQuestion.id}-${choiceIndex}`}
                type="button"
                onClick={() => handleSelect(choiceIndex)}
                className={`w-full rounded-[22px] border px-4 py-4 text-left text-base leading-6 transition ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50 text-emerald-950"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50"
                }`}
              >
                {choice.text}
              </button>
            );
          })}
        </div>

        {error ? <p className="text-sm text-rose-500">{error}</p> : null}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={!canGoPrev || isSubmitting}
            className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            이전
          </button>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              className="flex h-12 flex-[1.4] items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isSubmitting ? "결과 계산 중..." : "결과 보기"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex h-12 flex-[1.4] items-center justify-center rounded-2xl bg-emerald-600 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              다음 문항
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
