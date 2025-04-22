import NavbarOne from "@/components/headers/NavbarOne";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'EDUVIBE',
    description: 'Learning your Way',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-screen sticky top-0">
        <NavbarOne />
      </div>
      <div className="px-5 lg:px-7">
        {children}
      </div>
    </div>
  );
}
