import { redirect } from "next/navigation";

export default async function PresentationsRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/presentation-editor`);
}
