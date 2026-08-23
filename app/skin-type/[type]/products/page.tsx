import { notFound, redirect } from "next/navigation";
import type { SkinTypeCode } from "@/features/skin-type/types";

type LegacySkinTypeProductsPageProps = {
  params: Promise<{
    type: string;
  }>;
};

function parseSkinTypeCode(value: string) {
  const code = value.toUpperCase();

  if (!/^[DO][SR][PN][WT]$/.test(code)) {
    return null;
  }

  return code as SkinTypeCode;
}

export default async function LegacySkinTypeProductsPage({
  params,
}: LegacySkinTypeProductsPageProps) {
  const { type } = await params;
  const skinType = parseSkinTypeCode(type);

  if (!skinType) {
    notFound();
  }

  redirect(`/play/skin-type/products?type=${skinType}`);
}
