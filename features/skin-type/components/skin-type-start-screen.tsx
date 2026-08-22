import Link from "next/link";

const SURVEY_AXES = [
  {
    left: "건성",
    right: "지성",
    code: "D / O",
    count: "6문항",
  },
  {
    left: "저항성",
    right: "민감성",
    code: "R / S",
    count: "9문항",
  },
  {
    left: "비색소성",
    right: "색소성",
    code: "N / P",
    count: "7문항",
  },
  {
    left: "탄력",
    right: "주름",
    code: "T / W",
    count: "11문항",
  },
];

const TRUST_ITEMS = [
  "대한피부과학회지 2016;54(6):422-437",
  "한국 성인 여성 대상 연구",
  "연구 대상 202명",
  "Modified BSTQ 33문항",
  "4가지 피부 축",
  "16가지 피부 타입",
];

export function SkinTypeStartScreen() {
  return (
    <main className="min-h-screen bg-[#f6faf8] px-4 py-6 text-slate-900">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col justify-between">
        <div className="space-y-6">
          <header className="space-y-4 pt-4">
            <div className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">
              Research-based skin type test
            </div>
            <h1 className="text-[2.15rem] font-black leading-[1.08] tracking-tight text-slate-950 sm:text-4xl">
              논문 기반 바우만 피부타입 검사
            </h1>
            <p className="max-w-sm text-base leading-7 text-slate-600">
              33문항으로 알아보는 나의 Modified Baumann Skin Type
            </p>
          </header>

          <div className="rounded-[28px] border border-emerald-100 bg-white p-4 shadow-[0_18px_42px_rgba(15,118,110,0.10)]">
            <div className="grid grid-cols-2 gap-2">
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-emerald-50/70 px-3 py-3 text-sm font-bold leading-5 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-emerald-100 bg-white p-4 shadow-[0_18px_42px_rgba(15,118,110,0.10)]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900">검사 구성</h2>
              <span className="text-xs font-bold text-emerald-700">4 axes</span>
            </div>
            <div className="space-y-3">
              {SURVEY_AXES.map((axis) => (
                <div
                  key={axis.code}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-slate-700">
                      {axis.left}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">
                      {axis.code}
                    </span>
                    <span className="text-sm font-bold text-slate-700">
                      {axis.right}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-white">
                    <div className="h-full w-1/2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="mt-2 text-right text-xs font-semibold text-slate-500">
                    {axis.count}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <details className="group rounded-[24px] border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_28px_rgba(148,163,184,0.10)]">
            <summary className="cursor-pointer list-none text-sm font-black text-slate-900">
              <div className="flex items-center justify-between gap-3">
                <span>연구 근거 보기</span>
                <span className="text-lg leading-none text-emerald-700 transition group-open:rotate-45">
                  +
                </span>
              </div>
            </summary>
            <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">
              <div>
                <p className="text-xs font-bold text-slate-400">논문명</p>
                <p className="mt-1 font-semibold text-slate-800">
                  피부과를 내원한 한국 여성을 대상으로 한 바우만 피부 타입
                  설문지를 통한 피부 타입에 관한 연구
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400">저널</p>
                <p className="mt-1 font-semibold text-slate-800">
                  대한피부과학회지 2016;54(6):422-437
                </p>
              </div>
              <p>
                기존 Baumann Skin Type Questionnaire를 한국 환경에 맞게 간소화한
                Modified BSTQ를 사용합니다.
              </p>
            </div>
          </details>
        </div>

        <div className="space-y-3 pb-2 pt-6">
          <Link
            href="/test"
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-emerald-600 text-base font-black text-white shadow-[0_14px_30px_rgba(5,150,105,0.24)] transition hover:bg-emerald-500"
          >
            검사 시작하기
          </Link>
          <p className="text-xs leading-5 text-slate-500">
            본 검사는 피부 타입의 경향을 파악하기 위한 참고용이며 의학적 진단을
            대체하지 않습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
