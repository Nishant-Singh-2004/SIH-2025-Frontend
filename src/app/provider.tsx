import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<Loader />}>
      <ThemeProvider defaultTheme="dark" storageKey="my-app-theme">
        {children}
      </ThemeProvider>
    </React.Suspense>
  );
};
