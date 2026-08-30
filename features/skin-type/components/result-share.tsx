"use client";

import { useState } from "react";

type ResultShareProps = {
  shareText: string;
  title: string;
};

export function ResultShare({ shareText, title }: ResultShareProps) {
  const [message, setMessage] = useState("");

  async function handleShare() {
    const text = `${shareText} (${title})`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Modified Baumann SKIN TYPE",
          text,
        });
        setMessage("공유 창을 열었습니다.");
        return;
      }

      await navigator.clipboard.writeText(text);
      setMessage("결과 문구를 복사했습니다.");
    } catch {
      setMessage("공유에 실패했습니다. 다시 시도해 주세요.");
    }
  }

  return (
    <div className="mt-3 space-y-1.5 text-center">
      <button
        type="button"
        onClick={handleShare}
        className="mx-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.59 13.51 6.83 3.98" />
          <path d="m15.41 6.51-6.82 3.98" />
        </svg>
        결과 공유하기
      </button>
      {message ? <p className="text-center text-xs text-slate-500">{message}</p> : null}
    </div>
  );
}
