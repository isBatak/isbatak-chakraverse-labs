import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import type { ReactNode } from "react"

import { styled } from "styled-system/jsx"

import { LayoutContainer } from "../components/layout/layout-container"
import { SiteHeader } from "../components/layout/site-header"
import { Providers } from "../components/providers"
import { preloadIconSprite } from "../components/ui/icon"
import "../styled-system/styles.css"

const body = Inter({ subsets: ["latin"], variable: "--font-body" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "isbatak zag",
  description: "Zag.js machines and framework adapters by isBatak",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  preloadIconSprite()

  return (
    <html lang="en" className={`${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <SiteHeader />
          <styled.div px="2">
            <LayoutContainer minH="calc(100dvh - {sizes.header})">{children}</LayoutContainer>
          </styled.div>
        </Providers>
      </body>
    </html>
  )
}
