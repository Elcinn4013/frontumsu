import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Player Issue Intelligence", template: "%s · Player Issue Intelligence" },
  description: "Correlated player feedback and gameplay telemetry for issue triage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-canvas`}>
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <div className="min-h-screen lg:grid lg:grid-cols-[14.5rem_minmax(0,1fr)]">
          <Sidebar />
          <div className="min-w-0 w-full overflow-hidden lg:w-auto">
            <Topbar />
            <main className="mx-auto min-w-0 w-full max-w-[100rem] overflow-hidden px-4 py-5 sm:px-6 lg:px-8 lg:py-7">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
