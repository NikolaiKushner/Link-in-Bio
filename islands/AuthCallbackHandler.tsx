import { useSignal } from "@preact/signals";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "preact/hooks";

interface AuthCallbackHandlerProps {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export default function AuthCallbackHandler({ supabaseUrl, supabaseAnonKey }: AuthCallbackHandlerProps) {
  const status = useSignal("Authenticating...");
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session) {
          // Send session to server to set cookies
          const response = await fetch("/api/auth/session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            }),
          });

          if (response.ok) {
            window.location.href = "/dashboard";
          } else {
            throw new Error("Failed to set session");
          }
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        window.location.href = "/login?error=" + encodeURIComponent(error.message);
      }
    };

    handleCallback();
  }, []);

  return (
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
      <h1 class="text-2xl font-bold text-gray-900">{status.value}</h1>
      <p class="text-gray-600 mt-2">
        Please wait while we complete your sign in
      </p>
    </div>
  );
}
