import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard | Student',
    description: 'Learning your Way',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    );
}