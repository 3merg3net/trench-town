import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WalletConnectProvider from '@/components/WalletConnectProvider';

export const metadata = {
  title: 'Trench Town — Bond Strong on Base',
  description: 'From the trenches we rise. A Base-native launchpad with anti-rug mechanics.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0A84FF" />
      </head>
      <body className="min-h-screen">
        <WalletConnectProvider>
          <div className="max-w-5xl mx-auto px-4 py-6">
            <header className="mb-6 border-b border-white/10 pb-4">
              <Navbar />
            </header>
            <main className="pb-6">{children}</main>
            <Footer />
          </div>
        </WalletConnectProvider>
      </body>
    </html>
  );
}












