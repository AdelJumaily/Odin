import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Odin - Company Platform",
  description: "Odin company platform with products and services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-900 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Odin
            </Link>
            <div className="space-x-4">
              <Link href="/company" className="hover:text-blue-400">
                Company
              </Link>
              <Link href="/products" className="hover:text-blue-400">
                Products
              </Link>
              <Link href="/products/valkyrie" className="hover:text-blue-400">
                Valkyrie
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}