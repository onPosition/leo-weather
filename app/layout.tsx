import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { LocationProvider } from "./storage/LocationContext";
import { UIProvider } from "./storage/UIContext";

const jost = Jost({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "by onPosition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} antialiased`}>
        <UIProvider>
          <LocationProvider>{children}</LocationProvider>
        </UIProvider>
      </body>
    </html>
  );
}
