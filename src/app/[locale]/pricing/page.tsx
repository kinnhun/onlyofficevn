import { setRequestLocale } from "next-intl/server";
import PricingClientView from "@/components/pricing/PricingClientView";


export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PricingClientView />;
}
