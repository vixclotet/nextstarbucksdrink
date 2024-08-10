/* eslint-disable prettier/prettier */
// No need to add 'use server' explicitly as this is the default behavior for components in the App directory

import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { ExternalNavigation } from './Navbar';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata = {
  title: 'Next Starbucks Drink',
  description: 'Meet other Starbucks lovers and share your favorite drinks!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <head />
      <body>
        <div className="flex pt-2 flex-col min-h-screen bg-white dark:bg-gray-900">
          <ExternalNavigation />
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
