import { UserProvider } from "@/auth/auth";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import theme from "../mui-theme.config";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}
