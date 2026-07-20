import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import ThemeProvider from "./components/ThemeProvider";
import { ToastContainer } from "react-toastify";
import { AnalysisProvider } from "./context/analysisStore";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ResumeScope — AI Resume Analysis & ATS Scoring",
  description:
    "Upload your resume and get instant, AI-powered ATS scoring, keyword analysis, and actionable feedback to land more interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${inter.variable} font-sans antialiased`}
        >
          <ToastContainer position="bottom-right" />

          <AnalysisProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavBar />

              {children}
            </ThemeProvider>
          </AnalysisProvider>
        </body>
      </html>
    </>
  );
}
