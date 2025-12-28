import { Head } from "fresh/runtime";
import { define } from "../utils.ts";

export default define.page(function Home(ctx) {
  const isAuthenticated = !!ctx.state.authUser;

  return (
    <>
      <Head>
        <title>Welcome - Fresh Project</title>
      </Head>
      <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header class="bg-white/80 backdrop-blur-sm shadow-sm">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <img
                src="/logo.svg"
                width="40"
                height="40"
                alt="Fresh logo"
              />
              <span class="text-xl font-bold text-gray-900">Fresh Project</span>
            </div>
            <div class="flex gap-3">
              {isAuthenticated
                ? (
                  <>
                    <a
                      href="/dashboard"
                      class="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Dashboard
                    </a>
                    <form
                      action="/api/auth/logout"
                      method="POST"
                      class="inline"
                    >
                      <button
                        type="submit"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Logout
                      </button>
                    </form>
                  </>
                )
                : (
                  <>
                    <a
                      href="/login"
                      class="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Login
                    </a>
                    <a
                      href="/register"
                      class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Sign Up
                    </a>
                  </>
                )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div class="text-center max-w-3xl mx-auto">
            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to Your{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Fresh Project
              </span>
            </h1>
            <p class="text-xl text-gray-600 mb-8">
              A modern web application with powerful authentication, user
              management, and role-based access control powered by Supabase.
            </p>

            {isAuthenticated
              ? (
                <div class="flex gap-4 justify-center">
                  <a
                    href="/dashboard"
                    class="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-lg"
                  >
                    Go to Dashboard
                  </a>
                </div>
              )
              : (
                <div class="flex gap-4 justify-center">
                  <a
                    href="/register"
                    class="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-lg"
                  >
                    Get Started
                  </a>
                  <a
                    href="/login"
                    class="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-semibold text-lg"
                  >
                    Sign In
                  </a>
                </div>
              )}
          </div>

          {/* Features */}
          <div class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="text-4xl mb-4">🔐</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Secure Authentication
              </h3>
              <p class="text-gray-600">
                Email/password and Google OAuth integration with secure session
                management and HTTP-only cookies.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="text-4xl mb-4">👥</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                User Management
              </h3>
              <p class="text-gray-600">
                Comprehensive user profiles with role-based access control for
                regular users and superadmins.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="text-4xl mb-4">⚡</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Modern Stack
              </h3>
              <p class="text-gray-600">
                Built with Deno Fresh, Supabase, and Tailwind CSS for a fast,
                secure, and beautiful experience.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div class="mt-24 text-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">
              Powered by Modern Technologies
            </h2>
            <div class="flex flex-wrap justify-center gap-8 items-center">
              <div class="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow">
                <span class="font-semibold text-gray-700">Deno Fresh</span>
              </div>
              <div class="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow">
                <span class="font-semibold text-gray-700">Supabase</span>
              </div>
              <div class="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow">
                <span class="font-semibold text-gray-700">TypeScript</span>
              </div>
              <div class="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow">
                <span class="font-semibold text-gray-700">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer class="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
            <p>Built with Fresh and Supabase</p>
          </div>
        </footer>
      </div>
    </>
  );
});
