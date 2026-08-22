import Image from "next/image";
import Link from "next/link";

export function SkinTypeStartScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-4 py-4 text-slate-900">
      <section className="w-full max-w-md rounded-[28px] border border-emerald-100 bg-white px-5 py-6 text-center shadow-[0_20px_50px_rgba(15,118,110,0.12)] sm:px-7 sm:py-7">
        <div className="space-y-5">
          <div className="flex justify-center">
            <div className="relative rounded-[28px] bg-[radial-gradient(circle_at_30%_20%,#d1fae5_0%,#f8fafc_48%,#e0f2fe_100%)] p-2.5 shadow-[0_14px_34px_rgba(16,185,129,0.14)] ring-1 ring-emerald-100">
              <Image
                src="/images/bamti-placeholder.svg"
                alt="Modified Baumann Skin Type 설문"
                width={192}
                height={192}
                priority
                className="h-28 w-28 sm:h-36 sm:w-36"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-600 sm:text-sm">
              Skin Type Survey
            </p>
            <h1 className="text-[1.9rem] font-black tracking-tight text-slate-900 sm:text-4xl">
              Modified Baumann Skin Type
            </h1>
            <p className="text-sm leading-6 text-slate-600 sm:text-base">
              33개 문항으로 D/O, S/R, P/N, W/T 네 축을 계산해
              <br className="hidden sm:block" />
              나의 4글자 피부 타입을 확인합니다.
            </p>
          </div>

          <div className="rounded-[22px] border border-emerald-100 bg-emerald-50/50 p-4 text-left">
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-slate-700">
              <div className="rounded-2xl bg-white px-3 py-3">Dry / Oily · 6문항</div>
              <div className="rounded-2xl bg-white px-3 py-3">
                Sensitive / Resistant · 9문항
              </div>
              <div className="rounded-2xl bg-white px-3 py-3">
                Pigmented / Nonpigmented · 7문항
              </div>
              <div className="rounded-2xl bg-white px-3 py-3">
                Wrinkled / Tight · 11문항
              </div>
            </div>
          </div>

          <Link
            href="/test"
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 text-[15px] font-bold text-white transition hover:bg-emerald-500"
          >
            설문 시작하기
          </Link>

          <p className="text-xs leading-5 text-slate-500">
            이 설문은 피부 특성을 분류하기 위한 MVP이며 의학적 진단이 아닙니다.
          </p>
        </div>
      </section>
    </main>
  );
}
