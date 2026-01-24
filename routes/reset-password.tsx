import { define } from "../utils.ts";
import { Head } from "fresh/runtime";
import { getSupabaseConfig } from "../lib/supabase.ts";
import ResetPasswordForm from "../islands/ResetPasswordForm.tsx";

export default define.page(function ResetPassword(ctx) {
  const config = getSupabaseConfig();
  const url = new URL(ctx.req.url);
  const token = url.searchParams.get("token") || "";
  const type = url.searchParams.get("type") || "";

  return (
    <>
      <Head>
        <title>Reset Password - Getlnk</title>
      </Head>
      <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <ResetPasswordForm
          supabaseUrl={config.url}
          supabaseAnonKey={config.anonKey}
          token={token}
          type={type}
        />
      </div>
    </>
  );
});
