import Nav from "@components/Nav";
import "@styles/globals.css";
import ThemeRegistry from "@styles/theme/themeRegistry";
import { Box } from "@mui/material";

export const metadata = {
  title: "Test",
  description: "Test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
