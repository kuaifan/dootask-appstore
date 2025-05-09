import {NextIntlClientProvider} from 'next-intl';
import {ThemeProvider} from "@/components/theme-provider"
import {getLocale, getTranslations} from 'next-intl/server';
import React from "react";
import "./globals.css";

export async function generateMetadata() {
  const t = await getTranslations('common');
  return {
    title: t("title"),
  }
}

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
