import type { ReactNode } from "react"
import { css, cx } from "styled-system/css"
import { prose } from "styled-system/recipes"

const docsProse = css({
  "--prose-leading": "1.7",
  "--prose-flow": "1em",
  maxWidth: "none",
  "& :where(h1, h2, h3, h4)": {
    scrollMarginTop: "20",
  },
  // Section labels, e.g. "Installation", "Usage"
  "& :where(h2)": {
    textStyle: "overline",
    fontWeight: "medium",
    color: "fg.muted",
    marginBlockStart: "11",
  },
  "& :where(a):hover": {
    textDecorationColor: "fg",
  },
})

// Typography for rendered MDX content
export function Prose({ children }: { children: ReactNode }) {
  return <div className={cx(prose({ size: "sm" }), docsProse)}>{children}</div>
}
