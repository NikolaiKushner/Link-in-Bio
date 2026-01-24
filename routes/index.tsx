import { Head } from "fresh/runtime";
import { define } from "../utils.ts";

export default define.page(function Home(ctx) {
  const isAuthenticated = !!ctx.state.authUser;

  return (
    <>
      <Head>
        <title>Getlnk — One link. Every you.</title>
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
              <span class="text-xl font-bold text-gray-900">Getlnk</span>
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
              Getlnk —{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                One link. Every you.
              </span>
            </h1>
            <p class="text-xl text-gray-600 mb-8">
              The open-source link-in-bio platform. Create a beautiful, shareable
              landing page with all your links in one place.
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
                    Get your Getlnk
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
              <div class="text-4xl mb-4">🔓</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Open Source
              </h3>
              <p class="text-gray-600">
                Own your data, customize everything. Host it yourself or use our
                hosted version. 100% open source.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="text-4xl mb-4">🎨</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Beautiful Themes
              </h3>
              <p class="text-gray-600">
                Choose from multiple stunning themes to match your brand. Customize
                colors, fonts, and layouts.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="text-4xl mb-4">📊</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Analytics Built-in
              </h3>
              <p class="text-gray-600">
                Track views and clicks to see which links perform best. Monitor
                your profile's reach with built-in analytics.
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
            <p>The open-source link-in-bio</p>
          </div>
        </footer>
      </div>
    </>
  );
});
