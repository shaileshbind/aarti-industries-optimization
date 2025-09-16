import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "./components/Footer";
import { GSAPProvider } from "@/app/contexts/GSAPContext";

export const metadata: Metadata = {
  title: "Aarti Industries",
  description: "Aarti Industries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GSAPProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  );
}
