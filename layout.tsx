import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Arena (Mini App)",
  description: "Telegram Mini App demo: courses + exams + rewards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="text-slate-100 antialiased">{children}</body>
    </html>
  );
}
