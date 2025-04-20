import NavbarOne from "@/components/headers/NavbarOne";

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
