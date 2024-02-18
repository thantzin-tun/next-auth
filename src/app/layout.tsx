import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./provider";
import "animate.css";
import localFont from "next/font/local";

const myFont = localFont({ src: "../assets/fonts/Roboto.ttf", weight: "600" });

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
            <body className={myFont.className}>
                <NextAuthProvider>{children}</NextAuthProvider>
            </body>
        </html>
    );
}
