import type { Component } from "#site/content"
import Link from "next/link"
import { styled } from "styled-system/jsx"

import { ExamplePreview } from "../examples/example-preview"
import { PreviewProvider } from "../examples/preview-context"
import { MDXContent } from "../mdx-content"
import { Button } from "../ui/button"
import { Icon } from "../ui/icon"
import { Prose } from "../ui/prose"
import { CopyPage } from "./copy-page"
import { DocFooter } from "./doc-footer"
import { DocLinks } from "./doc-links"
import { ExampleSource } from "./framework-code"
import { markdownPath } from "./markdown"

const BreadcrumbLink = styled(Link, {
  base: {
    color: "fg.muted",
    _hover: { color: "fg" },
  },
})

interface DocPageProps {
  component: Component
  title: string
  description?: string | undefined
  preview?: string | undefined
  code: string
}

export function DocPage({ component, title, description, preview, code }: DocPageProps) {
  return (
    // Docs on the left, a sticky preview on the right. On small screens the preview sits between the intro and the content.
    <PreviewProvider defaultId={preview} defaultSource={preview && <ExampleSource id={preview} />}>
      <styled.div
        data-preview={preview ? "" : undefined}
        display="grid"
        minH="100dvh"
        gridTemplateColumns="minmax(0, 1fr)"
        gridTemplateAreas={`"intro" "content"`}
        // Static values only: the Panda transformer drops runtime conditions in style props
        css={{
          "&[data-preview]": {
            gridTemplateAreas: {
              base: `"intro" "preview" "content"`,
              lg: `"intro preview" "content preview"`,
            },
            gridTemplateColumns: { lg: "minmax(0, 1fr) minmax(0, 1fr)" },
            gridTemplateRows: { lg: "auto 1fr" },
          },
        }}
      >
        <styled.header gridArea="intro" minW="0" px={{ base: "5", md: "10" }} pt="6">
          <styled.nav aria-label="Breadcrumb" display="flex" alignItems="center" gap="2" textStyle="sm" ms="-1.5">
            <Button asChild variant="ghost" size="xs" px="0" aspectRatio="square">
              <Link href="/" aria-label="Home">
                <Icon size="sm" name="home" />
              </Link>
            </Button>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            <Icon name="chevron-right" color="fg.subtle" />
            <styled.span color="fg" aria-current="page">
              {component.title}
            </styled.span>
          </styled.nav>

          <styled.div maxW="2xl" pt={{ base: "8", md: "16" }} pb="10">
            <styled.div display="flex" justifyContent="flex-start" mb="4">
              <CopyPage href={markdownPath(component.permalink)} />
            </styled.div>
            <styled.h1 textStyle={{ base: "4xl", md: "5xl" }} fontWeight="semibold" letterSpacing="tight">
              {title}
            </styled.h1>
            {description && (
              <styled.p mt="4" color="fg.muted" textStyle="md" lineHeight="1.8">
                {description}
              </styled.p>
            )}
            <DocLinks links={component.links} />
          </styled.div>
        </styled.header>

        {preview && (
          <styled.aside gridArea="preview" minW="0" p="3" ps={{ lg: "0" }}>
            <styled.div
              position={{ lg: "sticky" }}
              top="3"
              h={{ base: "96", lg: "calc(100dvh - {spacing.6})" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
              borderRadius="l3"
              borderWidth="1px"
              bg="bg.subtle"
              css={{ "&:has([data-fullscreen])": { zIndex: "overlay" } }}
            >
              <ExamplePreview />
            </styled.div>
          </styled.aside>
        )}

        <styled.main
          gridArea="content"
          minW="0"
          px={{ base: "5", md: "10" }}
          pb="24"
          maxW="calc({sizes.2xl} + {spacing.20})"
        >
          <Prose>
            <MDXContent code={code} />
          </Prose>
          <DocFooter component={component} />
        </styled.main>
      </styled.div>
    </PreviewProvider>
  )
}
