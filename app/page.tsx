import type { Metadata } from "next";
import { SkinTypeStartScreen } from "@/features/skin-type/components/skin-type-start-screen";

export const metadata: Metadata = {
  title: "Modified Baumann SKIN TYPE",
  description: "33개 문항으로 나의 4글자 피부 타입을 확인해보세요.",
  openGraph: {
    title: "Modified Baumann SKIN TYPE",
    description: "33개 문항으로 나의 4글자 피부 타입을 확인해보세요.",
  },
};

export default function HomePage() {
  return <SkinTypeStartScreen />;
}
