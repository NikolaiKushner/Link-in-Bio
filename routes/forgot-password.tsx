import { define } from "../utils.ts";
import { Head } from "fresh/runtime";
import { getSupabaseConfig } from "../lib/supabase.ts";
import ForgotPasswordForm from "../islands/ForgotPasswordForm.tsx";

export default define.page(function ForgotPassword(_ctx) {
  const config = getSupabaseConfig();

  return (
    <>
      <Head>
        <title>Forgot Password - Getlnk</title>
      </Head>
      <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <ForgotPasswordForm
          supabaseUrl={config.url}
          supabaseAnonKey={config.anonKey}
        />
      </div>
    </>
  );
});
