import "./globals.css";
import { Libre_Baskerville } from "next/font/google";
import {TransitionWrapper} from "@/components/TransitionWrapper/TransitionWrapper";

const libreBaskerville = Libre_Baskerville({
  weight: ["400"], // Select available font weights
  style: ["italic"], // Select style (normal/italic)
  subsets: ["latin"], // Support Latin characters
  display: "swap", // Improves performance
});

export const metadata = {
  title: "Jaywithnoay",
  description: "Hi, I'm JJ",
};

/* THE ENTRANCE OF YOUR APPLICATION */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={libreBaskerville.className}>
        <TransitionWrapper>
          {children}
        </TransitionWrapper>
        {/* Morph filter */}
        <svg id="filters">
          <defs>
            <filter id="threshold">
  
              <feColorMatrix in="SourceGraphic"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 255 -140" />
            </filter>
          </defs>
        </svg>

      </body>
    </html>
  );
}
