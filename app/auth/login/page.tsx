import { redirect } from "next/navigation";

type AuthLoginPageProps = {
  searchParams: Promise<{
    redirect?: string | string[];
  }>;
};

export default async function AuthLoginPage({ searchParams }: AuthLoginPageProps) {
  const params = await searchParams;
  const redirectParam = Array.isArray(params.redirect) ? params.redirect[0] : params.redirect;
  const query = redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : "";

  redirect(`/login${query}`);
}
