import type { ReactNode } from "react"
import { styled } from "styled-system/jsx"

import { LayoutContainer } from "../../components/layout/layout-container"
import { SiteFooter } from "../../components/layout/site-footer"
import { SiteHeader } from "../../components/layout/site-header"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <styled.main px="2">
        <LayoutContainer minH="calc(100dvh - {sizes.header})">{children}</LayoutContainer>
      </styled.main>
      <SiteFooter />
    </>
  )
}
