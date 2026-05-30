import "./globals.css";

export const metadata = {
  title: "The Responsible AI Classroom",
  description: "AI Readiness Assessment for Educators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#042C53] min-h-screen">{children}</body>
    </html>
  );
}