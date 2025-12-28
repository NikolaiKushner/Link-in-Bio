# Fresh Project with Supabase Authentication

A modern web application built with Deno Fresh and Supabase, featuring
comprehensive authentication and user management.

## Features

- 🔐 **Authentication**
  - Email/Password registration and login
  - Google OAuth integration
  - Secure session management with HTTP-only cookies
  - Protected routes with middleware

- 👥 **User Management**
  - User profiles with customizable information
  - Role-based access control (Regular User, Superadmin)
  - Admin panel for user management
  - Profile editing capabilities

- 🎨 **Modern UI**
  - Responsive design with Tailwind CSS
  - Beautiful gradient backgrounds
  - Professional forms and layouts
  - Intuitive navigation

## Prerequisites

- [Deno](https://deno.land/) installed (v1.37 or higher)
- [Supabase](https://supabase.com) account
- Node.js (for npm packages via Deno)

## Setup

### 1. Supabase Configuration

1. Create a new project at [https://supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your Project URL and anon key

### 2. Database Setup

Run the SQL commands in `DATABASE_SETUP.md` to:

- Create the `user_profiles` table
- Set up Row Level Security policies
- Create triggers for automatic profile creation
- Configure user roles

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your-project-url.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Enable Authentication Providers

#### Email Authentication

1. Go to Authentication > Providers in Supabase
2. Enable Email provider
3. Configure email templates (optional)

#### Google OAuth

1. Go to Authentication > Providers
2. Enable Google provider
3. Create OAuth credentials at
   [Google Cloud Console](https://console.cloud.google.com):
   - Create a new project or select existing
   - Enable Google+ API
   - Go to Credentials > Create Credentials > OAuth 2.0 Client ID
   - Application type: Web application
   - Add authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret to Supabase

### 5. Configure Redirect URLs

In Supabase Authentication > URL Configuration:

- Site URL: `http://localhost:8000` (development) or your production URL
- Redirect URLs:
  - `http://localhost:8000/**`
  - `https://yourdomain.com/**` (production)

## Installation

```bash
# The dependencies are managed in deno.json
# No installation needed - Deno will download them automatically
```

## Running the Application

### Development

```bash
deno task dev
```

The application will be available at `http://localhost:8000`

### Build for Production

```bash
deno task build
```

### Start Production Server

```bash
deno task start
```

## Project Structure

```
fresh-project/
├── lib/
│   ├── auth.ts              # Authentication utilities
│   ├── database.types.ts    # Database type definitions
│   └── supabase.ts          # Supabase client configuration
├── routes/
│   ├── _app.tsx             # Root app layout
│   ├── _middleware.ts       # Global authentication middleware
│   ├── index.tsx            # Home page
│   ├── login.tsx            # Login page
│   ├── register.tsx         # Registration page
│   ├── dashboard.tsx        # User dashboard
│   ├── profile.tsx          # Profile editing
│   ├── admin/
│   │   ├── _middleware.ts   # Admin-only middleware
│   │   └── users.tsx        # User management
│   ├── auth/
│   │   └── callback.tsx     # OAuth callback handler
│   └── api/
│       ├── auth/
│       │   ├── session.ts   # Session management
│       │   └── logout.ts    # Logout handler
│       ├── admin/
│       │   └── update-role.ts # Update user roles
│       └── profile/
│           └── update.ts    # Update profile
├── components/
│   └── Button.tsx
├── islands/
│   └── Counter.tsx
├── static/
├── deno.json
├── main.ts
├── utils.ts
├── DATABASE_SETUP.md        # Database setup instructions
└── README.md
```

## User Roles

### Regular User

- Can view and edit their own profile
- Access to standard features
- Cannot manage other users

### Superadmin

- All regular user capabilities
- Can view all users
- Can change user roles
- Access to admin panel

## Creating the First Superadmin

After your first user signs up:

1. Go to your Supabase dashboard
2. Navigate to Table Editor > user_profiles
3. Find your user record
4. Change the `role` column from `regular` to `superadmin`

Alternatively, run this SQL:

```sql
UPDATE user_profiles
SET role = 'superadmin'
WHERE email = 'your-email@example.com';
```

## Key Features Explained

### Authentication Flow

1. **Registration**: User signs up via email or Google
2. **Trigger**: Supabase automatically creates a profile in `user_profiles`
3. **Login**: User authenticates and receives session tokens
4. **Session**: Tokens are stored in HTTP-only cookies
5. **Protected Routes**: Middleware checks authentication status
6. **Logout**: Session cleared and cookies deleted

### Role-Based Access Control

- Implemented via middleware in `routes/_middleware.ts` and
  `routes/admin/_middleware.ts`
- Superadmin-only routes are protected by checking user role
- Regular users receive 403 Forbidden when accessing admin routes

### Security Features

- HTTP-only cookies prevent XSS attacks
- Row Level Security (RLS) policies in Supabase
- Secure password hashing by Supabase Auth
- CSRF protection via SameSite cookies
- OAuth state verification

## API Endpoints

### Authentication

- `POST /api/auth/session` - Set authentication session
- `POST /api/auth/logout` - Clear session and logout

### Profile Management

- `POST /api/profile/update` - Update user profile

### Admin (Superadmin only)

- `POST /api/admin/update-role` - Change user role

## Troubleshooting

### "Missing Supabase environment variables" error

- Ensure `.env` file exists with correct values
- Restart the development server

### Google OAuth not working

- Check redirect URIs in Google Cloud Console
- Verify Google provider is enabled in Supabase
- Ensure Site URL is configured correctly

### Users can't sign up

- Check Supabase dashboard for email confirmations
- Verify email provider is enabled
- Check database trigger is working

### Profile not created after signup

- Verify the `handle_new_user()` function exists
- Check the trigger `on_auth_user_created` is enabled
- Look for errors in Supabase logs

## Development Tips

- Use `deno task check` to check formatting and types
- Check browser console for client-side errors
- Monitor Supabase logs for database issues
- Test both authentication methods (email and Google)

## Tech Stack

- **Framework**: [Fresh](https://fresh.deno.dev/) - Modern web framework for
  Deno
- **Runtime**: [Deno](https://deno.land/) - Secure TypeScript runtime
- **UI**: Preact + Signals
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) +
  [DaisyUI](https://daisyui.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Database**: PostgreSQL via Supabase

## License

MIT

## Support

For issues and questions:

- Check `DATABASE_SETUP.md` for database configuration
- Review Supabase documentation
- Check Fresh documentation at https://fresh.deno.dev
