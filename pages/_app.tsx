import { UserProvider } from "@/auth/auth";
import type { AppProps } from "next/app";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </div>
  );
}
