import { redirect } from "next/navigation";

export default async function TaoBieuMauRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/form-creator`);
}
