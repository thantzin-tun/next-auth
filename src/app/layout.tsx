import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./provider";
import "animate.css";
const roboto = Roboto({
    subsets: ["latin"],
    weight: "500",
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "Authenticate",
    description: "Next Js and Shadcn Library",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <NextAuthProvider>{children}</NextAuthProvider>
            </body>
        </html>
    );
}
