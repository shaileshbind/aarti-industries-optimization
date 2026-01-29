"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (session) {
    router.replace("/");
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        username: username.trim(),
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }
      if (res?.ok) {
        // Force a hard refresh to ensure session is loaded
        window.location.href = "/";
      } else {
        setError("Something went wrong");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/global-reach/gr-banner.png')" }}
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm flex flex-col gap-5 p-6 rounded-lg border border-[var(--grey-200)] bg-[var(--grey-100)]"
      >
        <Image
          src="/images/logo.png"
          alt="Aarti Industries"
          width={80}
          height={80}
          className="object-contain mx-auto"
        />
        <h1 className="text-xl font-bold text-[var(--blue-200)] font-[var(--font-alte-hans)]">
          Sign in
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm text-[var(--grey-400)]">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            className="px-3 py-2 rounded border border-[var(--grey-200)] bg-white text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--orange-200)] focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-[var(--grey-400)]">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="px-3 py-2 rounded border border-[var(--grey-200)] bg-white text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--orange-200)] focus:border-transparent"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 px-4 py-2 rounded bg-[var(--orange-200)] text-white font-medium hover:bg-[var(--orange-300)] focus:outline-none focus:ring-2 focus:ring-[var(--orange-200)] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm flex flex-col gap-5 p-6 rounded-lg border border-[var(--grey-200)] bg-[var(--grey-100)]">
          <div className="text-center text-[var(--grey-400)]">Loading...</div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
