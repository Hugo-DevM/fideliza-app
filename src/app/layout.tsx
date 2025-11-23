import { Poppins, Lato } from "next/font/google";
import React from "react";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata = {
  title: "Fideliza+ — Más ventas, más clientes fieles",
  description:
    "Un sistema de fidelización fácil de usar que te permite dar recompensas por visitas o compras, automatizar beneficios y mantener a tus clientes regresando.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${lato.variable}`}>{children}</body>
    </html>
  );
}
