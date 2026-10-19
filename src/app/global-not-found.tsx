import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — André Souza",
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR">
      <body className="grid min-h-screen place-items-center font-sans antialiased">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">404</p>
          <h1 className="mt-4 text-4xl">Página não encontrada · Page not found</h1>
          <p className="mt-8 flex justify-center gap-6 underline">
            <Link href="/pt">Início</Link>
            <Link href="/en">Home</Link>
          </p>
        </div>
      </body>
    </html>
  );
}
