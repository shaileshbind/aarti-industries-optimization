import type { Metadata } from "next";
import { Work_Sans, PT_Serif, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import { GSAPProvider } from "@/app/contexts/GSAPContext";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dhamecha",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${ptSerif.variable} ${inter.variable} antialiased min-h-screen`}
      >
        <GSAPProvider>
          <Header />
          <main>{children}</main>
           
        </GSAPProvider>
      </body>
    </html>
  );
}
