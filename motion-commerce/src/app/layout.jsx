import "../styles.css";
import "../components/HeaderMotion.css";
import ClientProvider from "./ClientProvider";

export const metadata = {
  metadataBase: new URL('https://nexora.com'),
  title: "NEXORA — Shop • Style • Live Better",
  description: "Discover luxury collections, artisanal fashion, jewelry, tech, and everyday essentials curated for thoughtful living.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "NEXORA — Shop • Style • Live Better",
    description: "Discover luxury collections, artisanal fashion, jewelry, tech, and everyday essentials curated for thoughtful living.",
    url: 'https://nexora.com',
    siteName: 'NEXORA',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
