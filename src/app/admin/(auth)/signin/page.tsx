"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { adminSignIn } from "../../../actions/admin/auth/signin";
import { createNewAdminUser } from "../../../actions/admin/auth/create-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, UserPlus, LogIn } from "lucide-react";

// Submit button with loading state for signin
function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="bg-Orange w-full hover:bg-orange-600"
      disabled={pending}
    >
      {pending ? (
        "Signing in..."
      ) : (
        <span className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          Sign in
        </span>
      )}
    </Button>
  );
}

// Submit button with loading state for create user
function CreateUserButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="bg-blue w-full hover:bg-blue-700"
      disabled={pending}
    >
      {pending ? (
        "Creating user..."
      ) : (
        <span className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Create Admin User
        </span>
      )}
    </Button>
  );
}

// Define types for our state
interface SignInState {
  error: string;
}

interface CreateUserState {
  success: boolean;
  error: string;
  fields?: {
    email?: string[];
    password?: string[];
  };
  user: {
    id: string;
    email: string;
  } | null;
}

// Initial states
const initialSignInState: SignInState = {
  error: "",
};

const initialCreateUserState: CreateUserState = {
  success: false,
  error: "",
  fields: {
    email: [],
    password: [],
  },
  user: null,
};

export default function AdminSignInPage() {
  const [signInState, signInAction] = useActionState<SignInState, FormData>(
    adminSignIn,
    initialSignInState,
  );
  const [createUserState, createUserAction] = useActionState<
    CreateUserState,
    FormData
  >(createNewAdminUser, initialCreateUserState);
  const [showCreateUser, setShowCreateUser] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Admin Sign In</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Sign in to access the admin dashboard
        </p>
      </div>

      {/* Sign In Form */}
      <div>
        {signInState.error && (
          <div className="bg-destructive/10 border-destructive/30 text-destructive mb-4 rounded-md border p-3 text-sm">
            {signInState.error}
          </div>
        )}

        <form action={signInAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                <Mail className="h-4 w-4" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                autoComplete="email"
                required
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                <Lock className="h-4 w-4" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                required
                className="pl-10"
              />
            </div>
          </div>

          <SignInButton />
        </form>
      </div>

      {/* Toggle Create User Form */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowCreateUser(!showCreateUser)}
          className="text-Orange text-sm transition-colors hover:text-orange-500"
        >
          {showCreateUser ? "Hide Admin User Creation" : "Create Admin User"}
        </button>
      </div>

      {/* Create User Form */}
      {showCreateUser && (
        <div className="rounded-lg border bg-gray-50 p-4">
          <h2 className="mb-4 text-lg font-semibold">Create Admin User</h2>

          {createUserState.error && !createUserState.success && (
            <div className="bg-destructive/10 border-destructive/30 text-destructive mb-4 rounded-md border p-3 text-sm">
              {createUserState.error}
            </div>
          )}

          {createUserState.success && createUserState.user && (
            <div className="mb-4 rounded-md border border-green-300 bg-green-100 p-3 text-sm text-green-800">
              Admin user created successfully: {createUserState.user.email}
            </div>
          )}

          <form action={createUserAction} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="create-email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  id="create-email"
                  name="email"
                  type="email"
                  placeholder="new-admin@example.com"
                  required
                  className="pl-10"
                />
              </div>
              {createUserState.fields?.email &&
                createUserState.fields.email.length > 0 && (
                  <p className="text-destructive text-sm">
                    {createUserState.fields.email[0]}
                  </p>
                )}
            </div>

            <div className="space-y-2">
              <label htmlFor="create-password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  id="create-password"
                  name="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="pl-10"
                />
              </div>
              {createUserState.fields?.password &&
                createUserState.fields.password.length > 0 && (
                  <p className="text-destructive text-sm">
                    {createUserState.fields.password[0]}
                  </p>
                )}
            </div>

            <CreateUserButton />
          </form>
        </div>
      )}
    </div>
  );
}
