import { styled } from "styled-system/jsx"

// Inline `styled()` configs: don't pass style props to these, the Panda transformer would drop
// the base styles. Wrap the content in a plain `styled.div` for spacing instead.

export const Section = styled("section", {
  base: {
    position: "relative",
    px: { base: "5", md: "10" },
  },
})

/** Small mono label above a heading. */
export const Eyebrow = styled("p", {
  base: {
    fontFamily: "mono",
    textStyle: "overline",
    color: "fg.subtle",
  },
})

export const SectionHeading = styled("h2", {
  base: {
    mt: "3",
    textStyle: { base: "3xl", md: "4xl" },
    fontWeight: "medium",
    letterSpacing: "tight",
    textWrap: "balance",
  },
})

export const SectionText = styled("p", {
  base: {
    mt: "4",
    mx: "auto",
    maxW: "md",
    textStyle: "sm",
    lineHeight: "1.7",
    color: "fg.muted",
    textWrap: "pretty",
  },
})
