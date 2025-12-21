'use client';

import { ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '../contexts/ThemeContext';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';

const DjonAssistant = dynamic(() => import('../components/DjonAssistant/DjonAssistant'), { ssr: false });
const CookieConsent = dynamic(() => import('../components/CookieConsent'), { ssr: false });
const UpdateNotification = dynamic(() => import('../components/UpdateNotification'), { ssr: false });
const ChristmasDecorations = dynamic(() => import('../components/NewYear/ChristmasDecorations'), { ssr: false });

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const showChristmasDecorations = () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    return (month === 11 && day >= 15) || (month === 0 && day <= 15);
  };

  return (
    <html lang="uk">
      <body>
        <ThemeProvider>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="main-content">
            <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Breadcrumbs />
            <main className="page-content">{children}</main>
            <Footer isSidebarOpen={isSidebarOpen} />
          </div>

          {showChristmasDecorations() && <ChristmasDecorations />}
          <UpdateNotification />
          <DjonAssistant />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
