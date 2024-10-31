import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ToDo list',
  description: 'Manager of your tasks'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full max-w-7xl mt-4 m-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
