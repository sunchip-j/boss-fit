import type { Metadata } from "next";
import { SkinTypeStartScreen } from "@/features/skin-type/components/skin-type-start-screen";

export const metadata: Metadata = {
  title: "바우만 피부타입 테스트",
  description: "33문항으로 알아보는 나의 Modified Baumann Skin Type",
};

export default function SkinTypePage() {
  return <SkinTypeStartScreen />;
}
