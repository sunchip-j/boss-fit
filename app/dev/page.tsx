import Link from "next/link";

const DEV_TOOLS = [
  {
    title: "피부 타입 결과 테스트",
    href: "/dev/result",
    description: "설문 없이 16개 피부 타입 결과 화면을 확인합니다.",
  },
];

export default function DevIndexPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-xl">
        <h1 className="text-xl font-bold">Development Tools</h1>

        <div className="mt-6 space-y-3">
          {DEV_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block rounded-md border border-slate-200 p-4 hover:border-slate-400"
            >
              <p className="font-semibold">{tool.title}</p>
              <p className="mt-1 text-sm text-slate-500">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
