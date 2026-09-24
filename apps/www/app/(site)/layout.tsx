import type { ReactNode } from "react"
import { styled } from "styled-system/jsx"

import { LayoutContainer } from "../../components/layout/layout-container"
import { SiteHeader } from "../../components/layout/site-header"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <styled.div px="2">
        <LayoutContainer minH="calc(100dvh - {sizes.header})">{children}</LayoutContainer>
      </styled.div>
    </>
  )
}
