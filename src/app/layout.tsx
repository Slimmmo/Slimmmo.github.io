import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "AdVenture Capitalist Calculator",
	description: "Calculator to provide upgrade order recommendations for the game AdVenture Capitalist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
		<head>
			<link rel="shortcut icon" href="/static/favicon.png" />
		</head>
		<body className={inter.className}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				{children}
			</ThemeProvider>
		</body>
    </html>
  );
}
