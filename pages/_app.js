// pages/_app.js
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/ToastContext"; // ✅ Import it
import { ThemeProvider } from "@/context/ThemeContext";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
     <ThemeProvider> {/* Wrap with ThemeProvider */}
    
    <ToastProvider>
      <Component {...pageProps} />
      </ToastProvider>
       </ThemeProvider>
    </SessionProvider>
  );
}
