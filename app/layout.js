import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata = {
  metadataBase: new URL("https://www.maile.cl"),
  title: "Maile · Mujeres creando futuro con tecnología",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/brand/favicon-32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/assets/brand/favicon-180.png", sizes: "180x180" }]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2f1b34"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-CL">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;1,400&family=Space+Grotesk:wght@300;400;500;700&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
