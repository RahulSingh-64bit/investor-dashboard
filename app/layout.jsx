// src/app/layout.jsx
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import MainLayout from "@/components/Layout/MainLayout";
import Providers from "@/components/Providers";   // ← this new file fixes everything
import "@/app/globals.css";

export const metadata = {
  title: "Your App",
  description: "Next.js + shadcn/ui",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <TooltipProvider>
            <MainLayout>{children}</MainLayout>
            <Toaster
              position="top-center"
              richColors
              closeButton
            />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}