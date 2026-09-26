import type { ReactNode } from "react"
import { styled } from "styled-system/jsx"
import { highlight } from "sugar-high"
import { lang as resolveLang } from "sugar-high/lang"

import { CopyButton } from "./copy-button"

export const CodeFrame = styled(
  "div",
  {
    base: {
      position: "relative",
      my: "6",
      borderRadius: "l3",
      borderWidth: "1px",
      bg: "bg.subtle",
      overflow: "hidden",
    },
  },
  {
    defaultProps: {
      className: "not-prose",
    },
  },
)

export const CodeHeader = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "3",
    minH: "11",
    ps: "4",
    pe: "2",
    borderBottomWidth: "1px",
    textStyle: "xs",
    color: "fg.muted",
    fontFamily: "mono",
  },
})

const Pre = styled("pre", {
  base: {
    m: "0",
    p: "4",
    overflowX: "auto",
    bg: "transparent",
    borderRadius: "0",
    fontFamily: "mono",
    fontSize: "0.8125rem",
    lineHeight: "1.7",
    "--sh-keyword": "{colors.code.keyword}",
    "--sh-string": "{colors.code.string}",
    "--sh-class": "{colors.code.class}",
    "--sh-identifier": "{colors.code.identifier}",
    "--sh-sign": "{colors.code.sign}",
    "--sh-property": "{colors.code.property}",
    "--sh-entity": "{colors.code.entity}",
    "--sh-jsxliterals": "{colors.code.jsxliterals}",
    "--sh-comment": "{colors.code.comment}",
  },
  variants: {
    floatingActions: {
      true: { pe: "12" },
    },
  },
})

const FloatingActions = styled("div", {
  base: {
    position: "absolute",
    top: "2",
    insetEnd: "2",
  },
})

export function highlightCode(code: string, language?: string) {
  return highlight(code.trimEnd(), { lang: resolveLang(language ?? "") ?? "javascript" })
}

export interface CodeBodyProps {
  code: string
  lang?: string | undefined
  floatingActions?: boolean
}

export function CodeBody({ code, lang, floatingActions }: CodeBodyProps) {
  return (
    <Pre floatingActions={floatingActions}>
      <code dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }} />
    </Pre>
  )
}

export interface CodeBlockProps extends CodeBodyProps {
  title?: ReactNode
}

export function CodeBlock({ code, lang, title }: CodeBlockProps) {
  if (!title) {
    return (
      <CodeFrame>
        <CodeBody code={code} lang={lang} floatingActions />
        <FloatingActions>
          <CopyButton value={code.trimEnd()} />
        </FloatingActions>
      </CodeFrame>
    )
  }

  return (
    <CodeFrame>
      <CodeHeader>
        {title}
        <CopyButton value={code.trimEnd()} />
      </CodeHeader>
      <CodeBody code={code} lang={lang} />
    </CodeFrame>
  )
}
