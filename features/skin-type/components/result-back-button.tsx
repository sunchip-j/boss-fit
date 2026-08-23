"use client";

import { useRouter } from "next/navigation";

export function ResultBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="inline-flex items-center text-sm font-black text-slate-500 transition hover:text-emerald-700"
      onClick={() => router.back()}
    >
      <span aria-hidden="true" className="mr-1.5">
        ←
      </span>
      결과로 돌아가기
    </button>
  );
}
