import { redirect } from "next/navigation";

export default async function XemSoDoRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/diagram-viewer`);
}
