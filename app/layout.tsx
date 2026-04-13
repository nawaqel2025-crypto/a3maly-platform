import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "منصة أعمالي",
  description: "نظام ERP عالمي ديناميكي",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
