import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import { getSupabaseConfig } from "../../lib/supabase.ts";
import AuthCallbackHandler from "../../islands/AuthCallbackHandler.tsx";

export default define.page(function AuthCallback(ctx) {
  const config = getSupabaseConfig();

  return (
    <>
      <Head>
        <title>Authenticating...</title>
      </Head>
      <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <AuthCallbackHandler
          supabaseUrl={config.url}
          supabaseAnonKey={config.anonKey}
        />
      </div>
    </>
  );
});
