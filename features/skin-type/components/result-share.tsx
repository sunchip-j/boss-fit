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
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleShare}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-500"
      >
        결과 공유하기
      </button>
      {message ? <p className="text-center text-xs text-slate-500">{message}</p> : null}
    </div>
  );
}
