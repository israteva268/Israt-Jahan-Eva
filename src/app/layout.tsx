import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Israt Jahan Eva | Full Stack Developer",
  description: "Portfolio of Israt Jahan Eva (Eva) - CSE student at UIU, Full Stack Developer, and gardening hobbyist.",
  keywords: ["Israt Jahan Eva", "Eva", "Full Stack Developer", "United International University", "Portfolio", "Next.js"],
  authors: [{ name: "Israt Jahan Eva" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline script to prevent FOUC (Flash of Unstyled Theme) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('portfolio-theme');
                if (savedTheme === 'light-minimal') {
                  document.documentElement.classList.add('theme-light-minimal');
                } else if (savedTheme === 'cyber-gradient') {
                  document.documentElement.classList.add('theme-cyber-gradient');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
