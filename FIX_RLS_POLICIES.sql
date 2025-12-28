-- Fix for infinite recursion in RLS policies
-- Run this in your Supabase SQL Editor

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Superadmins can read all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Superadmins can update any profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;

-- Create a helper function that bypasses RLS using SECURITY DEFINER
CREATE OR REPLACE FUNCTION is_superadmin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'superadmin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate policies using the helper function
-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Superadmins can read all profiles (using function to avoid recursion)
CREATE POLICY "Superadmins can read all profiles"
  ON user_profiles
  FOR SELECT
  USING (is_superadmin());

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Superadmins can update any profile (using function to avoid recursion)
CREATE POLICY "Superadmins can update any profile"
  ON user_profiles
  FOR UPDATE
  USING (is_superadmin());
