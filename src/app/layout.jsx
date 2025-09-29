import PluginInit from "@/helper/PluginInit";
import Providers from "@/components/Providers";
import "./font.css";
import "./globals.css";

export const metadata = {
  title: "OpenFXRates - Real-time Foreign Exchange Rates API",
  description:
    "OpenFXRates provides reliable, real-time foreign exchange rates and currency conversion API services for developers and businesses worldwide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <PluginInit />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
