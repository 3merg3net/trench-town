// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import WalletConnectProvider from '@/components/WalletConnectProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // make sure this exists (server component)

export const metadata: Metadata = {
  title: 'Trench Town',
  description: 'Bond-first launchpad on Base.',
   icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* bg image + overlay handled in globals.css */}
      <body className="min-h-screen text-white">
        <WalletConnectProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
          <Footer />
        </WalletConnectProvider>
      </body>
    </html>
  );
}













