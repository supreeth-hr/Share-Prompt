import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";
import SessionWrapper from "@/components/SessionWrapper";
import CommentModal from "@/components/CommentModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Photo Sphere",
  description: "Developed by Supreeth",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang='en'>
        <body className={inter.className}>
          <div className='flex justify-center max-w-7xl mx-auto'>
            <div className='hidden sm:inline border-r h-screen sticky top-0 w-2/6'>
              <Sidebar />
            </div>
            <div className="w-3/6">{children}</div>
            <div className='lg:flex-col p-3 h-screen border-l hidden lg:flex w-2/6'>
              <News />
            </div>
          </div>
          <CommentModal />
        </body>
      </html>
    </SessionWrapper>
  );
}