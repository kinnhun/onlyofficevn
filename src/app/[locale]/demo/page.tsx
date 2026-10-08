import { setRequestLocale } from "next-intl/server";
import DemoClientView from "@/components/demo/DemoClientView";

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DemoClientView />;
}
