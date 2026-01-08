import { useSignal } from "@preact/signals";
import { createClient } from "@supabase/supabase-js";
import { validateEmail } from "../lib/validators.ts";
import { Button, Input } from "../components/ui/index.ts";

interface ForgotPasswordFormProps {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export default function ForgotPasswordForm(
  { supabaseUrl, supabaseAnonKey }: ForgotPasswordFormProps,
) {
  const email = useSignal("");
  const error = useSignal("");
  const success = useSignal("");
  const loading = useSignal(false);

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    loading.value = true;
    error.value = "";
    success.value = "";

    // Validate email
    const emailValidation = validateEmail(email.value);
    if (!emailValidation.isValid) {
      error.value = emailValidation.error || "Invalid email";
      loading.value = false;
      return;
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.value,
        {
          redirectTo: `${globalThis.location.origin}/reset-password`,
        },
      );

      if (resetError) throw resetError;

      success.value =
        "Password reset email sent! Please check your inbox and follow the instructions.";
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "An unknown error occurred";
      }
      loading.value = false;
    }
  };

  return (
    <div class="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-semibold text-gray-900">Forgot Password</h1>
        <p class="text-gray-600 mt-2 text-sm">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      {error.value && (
        <div
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm"
          role="alert"
        >
          {error.value}
        </div>
      )}

      {success.value && (
        <div
          class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm"
          role="alert"
        >
          {success.value}
        </div>
      )}

      <form onSubmit={handleSubmit} class="space-y-4">
        <Input
          label="Email"
          type="email"
          id="email"
          required
          value={email.value}
          onInput={(e) => (email.value = (e.target as HTMLInputElement).value)}
          placeholder="name@email.com"
          fullWidth
          variant="filled"
          size="md"
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          loading={loading.value}
          class="mt-6"
        >
          {loading.value ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <div class="mt-6 text-center">
        <a
          href="/login"
          class="text-sm text-gray-900 hover:text-gray-700 font-medium"
        >
          ← Back to Login
        </a>
      </div>
    </div>
  );
}
