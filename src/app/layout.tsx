import { ThemeContextProvider } from '@/context/ThemeContext';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Next.js with MUI theme toggle',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}
