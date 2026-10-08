import { setRequestLocale } from "next-intl/server";
import PartnersClientView from "@/components/partners/PartnersClientView";

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PartnersClientView />;
}
