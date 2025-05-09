import {NextIntlClientProvider} from 'next-intl';
import {ThemeProvider} from "@/components/theme-provider"
import {getLocale} from 'next-intl/server';
import React from "react";
import "./globals.css";

export default async function RootLayout({children}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
    <body className="antialiased">
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
