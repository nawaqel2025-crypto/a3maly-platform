"use client";

import { NextIntlClientProvider } from "next-intl";

export default function Providers({ children }) {
  return (
    <NextIntlClientProvider locale="ar">
      {children}
    </NextIntlClientProvider>
  );
}
