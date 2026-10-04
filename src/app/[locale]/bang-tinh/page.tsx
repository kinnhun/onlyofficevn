import { redirect } from "next/navigation";

export default async function BangTinhRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/spreadsheet-editor`);
}
