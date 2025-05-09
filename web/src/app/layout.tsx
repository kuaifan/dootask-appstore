import {NextIntlClientProvider} from 'next-intl';
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
    <html lang={locale}>
    <body className="antialiased">
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </body>
    </html>
  );
}
