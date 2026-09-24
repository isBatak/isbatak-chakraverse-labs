"use client"

import { useEffect, useState } from "react"

import { Button } from "../ui/button"
import { Icon } from "../ui/icon"

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <Button
      variant="ghost"
      size="xs"
      px="0"
      aspectRatio="square"
      color="fg.muted"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={() => navigator.clipboard.writeText(value).then(() => setCopied(true))}
    >
      <Icon name={copied ? "check" : "copy"} />
    </Button>
  )
}
