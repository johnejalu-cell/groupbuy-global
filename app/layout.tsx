import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GroupBuy — Factory Prices, Together',
  description: 'Join group buys for imported goods at factory prices, held safely until the deal fills.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
