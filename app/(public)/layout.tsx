export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#050509] text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}