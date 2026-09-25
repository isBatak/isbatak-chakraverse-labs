"use client"

import { Portal } from "@ark-ui/react/portal"
import { useEffect, useState } from "react"
import { styled } from "styled-system/jsx"

import { Button } from "../ui/button"
import { Icon } from "../ui/icon"
import { Menu } from "../ui/menu"
import { SITE_URL } from "./site-url"

const prompt = (url: string) => encodeURIComponent(`Read ${url}, I want to ask questions about it.`)

export function CopyPage({ href }: { href: string }) {
  const [copied, setCopied] = useState(false)
  const url = `${SITE_URL}${href}`

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timeout)
  }, [copied])

  const copy = () => {
    const markdown = fetch(href)
      .then((response) => response.text())
      .then((text) => new Blob([text], { type: "text/plain" }))
    navigator.clipboard.write([new ClipboardItem({ "text/plain": markdown })]).then(() => setCopied(true))
  }

  return (
    <styled.div display="flex" flexShrink="0">
      <Button variant="subtle" size="2xs" borderEndRadius="0" onClick={copy}>
        <Icon name={copied ? "check" : "markdown"} />
        {copied ? "Copied" : "Copy page"}
      </Button>
      <Menu.Root positioning={{ placement: "bottom-end" }}>
        <Menu.Trigger asChild>
          <Button
            variant="subtle"
            size="2xs"
            px="0"
            aspectRatio="square"
            borderStartRadius="0"
            borderStartWidth="1px"
            borderStartColor="bg"
            aria-label="More page actions"
          >
            <Icon name="chevron-down" />
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="markdown" asChild>
                <a href={href} target="_blank" rel="noopener">
                  <Icon name="markdown" />
                  View as markdown
                </a>
              </Menu.Item>
              <Menu.Item value="chatgpt" asChild>
                <a href={`https://chatgpt.com/?hints=search&q=${prompt(url)}`} target="_blank" rel="noopener">
                  <Icon name="brand-openai" />
                  Open in ChatGPT
                </a>
              </Menu.Item>
              <Menu.Item value="claude" asChild>
                <a href={`https://claude.ai/new?q=${prompt(url)}`} target="_blank" rel="noopener">
                  <Icon name="brand-anthropic" />
                  Open in Claude
                </a>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </styled.div>
  )
}
