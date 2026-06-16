import { redirect } from 'next/navigation';

export default async function ExpertsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/institution/leadership`);
}
