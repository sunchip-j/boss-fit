import { redirect } from "next/navigation";
import {
  getPreviewResultHref,
  parsePreviewSkinTypeCode,
  SKIN_TYPE_PREVIEW_CODES,
} from "@/features/skin-type/dev-preview";

type DevResultPageProps = {
  searchParams: Promise<{
    type?: string | string[] | undefined;
  }>;
};

export default async function DevResultPage({
  searchParams,
}: DevResultPageProps) {
  const params = await searchParams;
  const selectedType = parsePreviewSkinTypeCode(params.type);

  if (selectedType) {
    redirect(getPreviewResultHref(selectedType));
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-md">
        <div className="grid grid-cols-4 gap-2">
          {SKIN_TYPE_PREVIEW_CODES.map((type) => (
            <a
              key={type}
              href={getPreviewResultHref(type)}
              className="flex h-12 items-center justify-center rounded-lg border border-emerald-100 bg-white text-sm font-black text-emerald-700 shadow-sm transition hover:border-emerald-400 hover:bg-emerald-50"
            >
              {type}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
