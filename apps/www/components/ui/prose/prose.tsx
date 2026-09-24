import { styled } from "styled-system/jsx"

// Typography for rendered MDX content
export const Prose = styled("div", {
  base: {
    color: "fg",
    fontSize: "sm",
    lineHeight: "1.7em",
    "& :where(p)": {
      marginTop: "1em",
      marginBottom: "1em",
    },
    "& :where(h1, h2, h3, h4)": {
      fontWeight: "semibold",
      letterSpacing: "tight",
      scrollMarginTop: "20",
    },
    "& :where(h1)": {
      fontSize: "2.15em",
      marginBottom: "0.8em",
      lineHeight: "1.2em",
    },
    // Section labels, e.g. "Installation", "Usage"
    "& :where(h2)": {
      fontSize: "0.8em",
      fontWeight: "medium",
      textTransform: "uppercase",
      letterSpacing: "wider",
      color: "fg.muted",
      marginTop: "4em",
      marginBottom: "1.2em",
    },
    "& :where(h3)": {
      fontSize: "1.285em",
      marginTop: "1.5em",
      marginBottom: "0.4em",
      lineHeight: "1.5em",
    },
    "& :where(a)": {
      color: "colorPalette.fg",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
      textDecorationThickness: "2px",
      textDecorationColor: "border.muted",
      fontWeight: "medium",
      _hover: { textDecorationColor: "colorPalette.fg" },
    },
    "& :where(strong)": {
      fontWeight: "semibold",
    },
    "& :where(ul, ol)": {
      marginTop: "1em",
      marginBottom: "1em",
      paddingInlineStart: "1.5em",
    },
    "& :where(ul)": { listStyleType: "disc" },
    "& :where(ol)": { listStyleType: "decimal" },
    "& :where(li)": {
      marginTop: "0.285em",
      marginBottom: "0.285em",
    },
    "& :where(blockquote)": {
      fontStyle: "italic",
      borderInlineStartWidth: "0.25em",
      borderInlineStartColor: "border",
      paddingInlineStart: "1.2em",
      marginTop: "1.285em",
      marginBottom: "1.285em",
    },
    "& :where(hr)": {
      marginTop: "3em",
      marginBottom: "3em",
      borderColor: "border",
    },
    "& :where(code)": {
      fontFamily: "mono",
      fontSize: "0.925em",
      letterSpacing: "-0.01em",
      borderRadius: "md",
      borderWidth: "thin",
      paddingInline: "0.4em",
      paddingBlock: "0.1em",
      bg: "bg.subtle",
    },
    "& :where(pre)": {
      fontFamily: "mono",
      fontSize: "0.9em",
      lineHeight: "1.6",
      overflowX: "auto",
      borderRadius: "xl",
      padding: "1.25em",
      marginTop: "1.6em",
      marginBottom: "1.6em",
      bg: "bg.muted",
    },
    "& :where(pre code)": {
      fontSize: "inherit",
      letterSpacing: "inherit",
      borderWidth: "0",
      padding: "0",
      bg: "transparent",
    },
  },
})
