import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import { createSupabaseClient } from "../../lib/supabase.ts";
import { getSession } from "../../lib/auth.ts";
import type { UserProfile } from "../../lib/auth.ts";
import UserManagementTable from "../../islands/UserManagementTable.tsx";

export default define.page(async function AdminUsers(ctx) {
  const session = await getSession(ctx.req);
  if (!session) {
    return new Response("", {
      status: 302,
      headers: { Location: "/login" },
    });
  }

  const supabase = createSupabaseClient(session.accessToken);

  // Fetch all users
  const { data: users, error } = await supabase
    .from("user_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return new Response("Error loading users", { status: 500 });
  }

  const usersList = (users as UserProfile[]) || [];

  return (
    <>
      <Head>
        <title>Manage Users - Admin</title>
      </Head>
      <div class="min-h-screen bg-gray-50">
        {/* Header */}
        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <a
                  href="/dashboard"
                  class="text-indigo-600 hover:text-indigo-700"
                >
                  ← Back
                </a>
                <h1 class="text-2xl font-bold text-gray-900">Manage Users</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UserManagementTable users={usersList} />
        </main>
      </div>
    </>
  );
});
