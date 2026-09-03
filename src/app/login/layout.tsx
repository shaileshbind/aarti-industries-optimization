import AuthProvider from "@/app/components/AuthProvider";

// next-auth's SessionProvider used to wrap the whole site from the root layout;
// only this route uses useSession/signIn, so only this route pays for it.
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
