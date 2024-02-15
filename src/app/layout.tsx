import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "../../utils/QueryProvider";
import Slider from "./components/Slider";
import SliderEmp from "./components/SliderEmp";
import Header from "./components/Header";
import { NextAuthProvider } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/authOptions";
import FontPrompt from "../../utils/customFonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SSB-ADMIN",
  description: "Suggestion system for BUS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // console.log("session layout", session?.userData);
  // console.log(session?.jwt);
  return (
    <NextAuthProvider>
      <html lang="en">
        <body
          style={{ fontFamily: "var(--font-prompt)" }}
          className={FontPrompt.variable}
        >
          <QueryProvider>
            {session ? (
              <>
                <Header />
                {session?.userData.role.typeName === "admin" ? (
                  <Slider>{children}</Slider>
                ) : (
                  <SliderEmp>{children}</SliderEmp>
                )}
              </>
            ) : (
              children
            )}
          </QueryProvider>
        </body>
      </html>
    </NextAuthProvider>
  );
}
