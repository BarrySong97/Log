// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider className="" navigate={router.push}>
        {children}
      </NextUIProvider>
    </QueryClientProvider>
  );
}
