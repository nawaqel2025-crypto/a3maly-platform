import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "./sidebar";
import GlobalCommand from "@/components/global-command";

export const metadata = {
  title: "منصة أعمالي",
  description: "ERP عربي حديث بمستوى عالمي",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <GlobalCommand />
          <main className="p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
