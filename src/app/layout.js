


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "./components/Notification";
import Providers from "./components/Providers";
import Header from "./components/Header";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kamwale – Showcase Your Talent, Skills & Creativity",
  description: "Kamwale is a platform where anyone can upload and share their work – videos, projects, skills, and more. Showcase your talent, connect with others, and grow your presence online.",
  icons: {
    icon: "/favicon.ico", 
    shortcut: "/favicon.ico",
  },
};


export default function RootLayout({children}) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
     <Providers>
        <NotificationProvider>
            <Header/>
            {children}
          </NotificationProvider>
          </Providers>
            
      </body>
    </html>
  );
}