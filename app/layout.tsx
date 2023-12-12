import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModelProvider } from "@/providers/model-provider";
import ToasterProvider from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-providers";
import ProgressProvider from "@/providers/progress-provider";

const Roboto = Roboto_Flex({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={Roboto.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ModelProvider></ModelProvider>
            <ProgressProvider />
            <ToasterProvider></ToasterProvider>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
