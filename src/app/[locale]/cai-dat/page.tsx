import { redirect } from "@/i18n/routing";

export default async function CaiDatAliasRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/huong-dan-cai-dat", locale });
}

