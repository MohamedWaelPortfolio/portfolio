import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mohamed Wael - Portfolio",
  description: "Full Stack Developer & UI/UX Designer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
        {/* Zoho Live Chat Scripts */}
        {typeof window !== 'undefined' && (
          <>
            <Script id="zoho-inline" strategy="lazyOnload">
              {`
                window.$zoho = window.$zoho || {};
                window.$zoho.salesiq = window.$zoho.salesiq || {
                  ready: function() {
                    // Customization placeholder: Add your customization code here
                  }
                };
              `}
            </Script>
            <Script
              id="zsiqscript"
              src="https://salesiq.zohopublic.com/widget?wc=siq01c879ad1e38d8bfba257d2548a2f3b091d7588dd4755948a356091447984eaf"
              strategy="lazyOnload"
            />
          </>
        )}
      </body>
    </html>
  );
}
