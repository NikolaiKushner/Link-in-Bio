import { define } from "../utils.ts";
import { Head } from "fresh/runtime";
import { getAuthUser, isSuperAdmin } from "../lib/auth.ts";

export default define.page(async function Dashboard(ctx) {
  const authUser = await getAuthUser(ctx.req);

  if (!authUser) {
    return new Response("", {
      status: 302,
      headers: { Location: "/login" },
    });
  }

  const { user, profile } = authUser;
  const isAdmin = isSuperAdmin(profile);

  return (
    <>
      <Head>
        <title>Dashboard - Fresh Project</title>
      </Head>
      <div class="min-h-screen bg-gray-50">
        {/* Header */}
        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-600">
                {profile.full_name || user.email}
              </span>
              {isAdmin && (
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Superadmin
                </span>
              )}
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  class="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-900">
                  Your Profile
                </h2>
                <a
                  href="/profile"
                  class="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Edit
                </a>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="text-sm text-gray-500">Email</p>
                  <p class="text-sm font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Full Name</p>
                  <p class="text-sm font-medium text-gray-900">
                    {profile.full_name || "Not set"}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Role</p>
                  <p class="text-sm font-medium text-gray-900 capitalize">
                    {profile.role}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Member Since</p>
                  <p class="text-sm font-medium text-gray-900">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p class="text-sm text-gray-600">Account Status</p>
                    <p class="text-lg font-semibold text-blue-600">Active</p>
                  </div>
                </div>
                <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p class="text-sm text-gray-600">Last Login</p>
                    <p class="text-lg font-semibold text-green-600">Today</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Panel */}
            {isAdmin && (
              <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">
                  Admin Actions
                </h2>
                <div class="space-y-3">
                  <a
                    href="/admin/users"
                    class="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Manage Users
                  </a>
                  <a
                    href="/admin/settings"
                    class="block w-full text-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    System Settings
                  </a>
                </div>
              </div>
            )}

            {/* Regular User Actions */}
            {!isAdmin && (
              <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div class="space-y-3">
                  <a
                    href="/profile"
                    class="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Edit Profile
                  </a>
                  <a
                    href="/settings"
                    class="block w-full text-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Settings
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Welcome Message */}
          <div class="mt-8 bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              Welcome back, {profile.full_name || user.email}! 👋
            </h2>
            <p class="text-gray-600">
              This is your personal dashboard. Here you can manage your account,
              view your activity, and access various features of the
              application.
            </p>
            {isAdmin && (
              <div class="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p class="text-purple-800 font-medium">
                  🛡️ You have superadmin privileges
                </p>
                <p class="text-purple-700 text-sm mt-1">
                  You can manage all users and system settings through the admin
                  panel.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
});
