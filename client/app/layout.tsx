import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import classNames from "classnames";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
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
    <html lang="en" className="h-full">
      <body className={classNames(inter.className, 'flex justify-center item-center bg-slate-100 h-full')}>
        <div className=" bg-slate-50 w-[50%] max-w-7xl m-auto h-4/5 rounded-lg shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
