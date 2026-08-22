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

export function SkinTypeStartScreen() {
  return (
    <main className="min-h-screen bg-[#f6faf8] px-4 py-6 text-slate-900">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col justify-between">
        <div className="space-y-6">
          <header className="space-y-4 pt-4">
            <div className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">
              33문항 · 4축 피부 타입 설문
            </div>
            <h1 className="text-[2.15rem] font-black leading-[1.08] tracking-tight text-slate-950 sm:text-4xl">
              Modified Baumann Skin Type
            </h1>
            <p className="max-w-sm text-base leading-7 text-slate-600">
              피부 상태를 네 가지 방향으로 점수화해 DSNT, OSPW 같은 4글자 타입을
              계산합니다.
            </p>
          </header>

          <div className="rounded-[28px] border border-emerald-100 bg-white p-4 shadow-[0_18px_42px_rgba(15,118,110,0.10)]">
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
        </div>

        <div className="space-y-3 pb-2 pt-6">
          <Link
            href="/test"
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-emerald-600 text-base font-black text-white shadow-[0_14px_30px_rgba(5,150,105,0.24)] transition hover:bg-emerald-500"
          >
            설문 시작하기
          </Link>
          <p className="text-xs leading-5 text-slate-500">
            설문 결과는 피부 타입 경향을 파악하기 위한 참고용이며 의학적 진단을
            대체하지 않습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
