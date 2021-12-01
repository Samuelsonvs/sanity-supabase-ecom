import type { AppProps } from "next/app";

import "../styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { PaymentProvider } from "@/contexts/PaymentContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <PaymentProvider>
        <Component {...pageProps} />
      </PaymentProvider>
    </AuthProvider>
  );
}
export default MyApp;
