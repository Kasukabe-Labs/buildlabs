import type { Metadata } from "next";
import "./globals.css";
import MasterNavbar from "@/components/MasterNavbar";



export const metadata: Metadata = {
  title: "BuildLabs",
  description: "Crowdfund opensource projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <MasterNavbar/>
        {children}
      </body>
    </html>
  );
}
