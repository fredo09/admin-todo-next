import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin todo",
  description: "Un administrador de tareas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
