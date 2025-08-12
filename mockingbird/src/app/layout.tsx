import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { InterviewWrapper } from './components/InterviewWrapper'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MockingBird - AI Technical Interview Practice",
  description: "Practice technical interviews with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <InterviewWrapper>
          <Header />
          {children}
          <Footer />
        </InterviewWrapper>
      </body>
    </html>
  );
}
