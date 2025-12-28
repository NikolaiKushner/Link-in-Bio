import { define } from "../utils.ts";
import { Head } from "fresh/runtime";
import { getAuthUser } from "../lib/auth.ts";
import ProfileForm from "../islands/ProfileForm.tsx";

export default define.page(async function Profile(ctx) {
  const authUser = await getAuthUser(ctx.req);

  if (!authUser) {
    return new Response("", {
      status: 302,
      headers: { Location: "/login" },
    });
  }

  const { user, profile } = authUser;

  return (
    <>
      <Head>
        <title>Profile - Fresh Project</title>
      </Head>
      <div class="min-h-screen bg-gray-50">
        {/* Header */}
        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex items-center gap-4">
              <a
                href="/dashboard"
                class="text-indigo-600 hover:text-indigo-700"
              >
                ← Back
              </a>
              <h1 class="text-2xl font-bold text-gray-900">Edit Profile</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProfileForm
            email={user.email!}
            fullName={profile.full_name}
            role={profile.role}
            createdAt={profile.created_at}
          />
        </main>
      </div>
    </>
  );
});

export default define.page(async function Profile(ctx) {
  const authUser = await getAuthUser(ctx.req);

  if (!authUser) {
    return new Response("", {
      status: 302,
      headers: { Location: "/login" },
    });
  }

  const { user, profile } = authUser;

  return (
    <>
      <Head>
        <title>Profile - Fresh Project</title>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', () => {
                const form = document.getElementById('profile-form');
                const errorDiv = document.getElementById('error-message');
                const successDiv = document.getElementById('success-message');

                form.addEventListener('submit', async (e) => {
                  e.preventDefault();
                  errorDiv.classList.add('hidden');
                  successDiv.classList.add('hidden');

                  const formData = new FormData(form);
                  const fullName = formData.get('fullName');

                  try {
                    const response = await fetch('/api/profile/update', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ fullName }),
                    });

                    if (!response.ok) {
                      const data = await response.json();
                      throw new Error(data.error || 'Failed to update profile');
                    }

                    successDiv.textContent = 'Profile updated successfully!';
                    successDiv.classList.remove('hidden');

                    setTimeout(() => {
                      successDiv.classList.add('hidden');
                    }, 3000);
                  } catch (error) {
                    errorDiv.textContent = error.message;
                    errorDiv.classList.remove('hidden');
                  }
                });
              });
            `,
          }}
        />
      </Head>
      <div class="min-h-screen bg-gray-50">
        {/* Header */}
        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex items-center gap-4">
              <a
                href="/dashboard"
                class="text-indigo-600 hover:text-indigo-700"
              >
                ← Back
              </a>
              <h1 class="text-2xl font-bold text-gray-900">Edit Profile</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="bg-white rounded-lg shadow p-6">
            <div
              id="error-message"
              class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              role="alert"
            >
            </div>

            <div
              id="success-message"
              class="hidden bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
              role="alert"
            >
            </div>

            <form id="profile-form" class="space-y-6">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  disabled
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label
                  for="fullName"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profile.full_name || ""}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <div class="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 capitalize">
                  {profile.role}
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  Your role is managed by administrators
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Member Since
                </label>
                <div class="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                  {new Date(profile.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <div class="flex gap-4">
                <button
                  type="submit"
                  class="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium transition-colors"
                >
                  Save Changes
                </button>
                <a
                  href="/dashboard"
                  class="flex-1 text-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 font-medium transition-colors"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
});
