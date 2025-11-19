// src/app/layout.jsx

import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "@/components/Layout/MainLayout";
import "@/app/globals.css"; // this is your index.css

// Create a client (same as before)
const queryClient = new QueryClient();

export const metadata = {
  title: "My Lovable App",
  description: "Moved to Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <MainLayout>{children}</MainLayout>
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}