import { type Component, componentGuides } from "#site/content"
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
import { FrameworkProvider } from "./framework"
import { ExampleSource } from "./framework-code"
import { markdownPath } from "./markdown"
import { StylingProvider } from "./styling"

const BreadcrumbLink = styled(Link, {
  base: {
    color: "fg.muted",
    _hover: { color: "fg" },
  },
})

export const getGuides = (component: string) =>
  componentGuides.filter((guide) => guide.component === component).toSorted((a, b) => a.order - b.order)

interface DocPageProps {
  component: Component
  section?: string
  title: string
  description?: string | undefined
  preview?: string | undefined
  code: string
}

export function DocPage({ component, section, title, description, preview, code }: DocPageProps) {
  const guides = getGuides(component.slug)
  const current = guides.find((guide) => guide.slug === section)

  return (
    // Docs on the left, a sticky preview on the right. On small screens the preview sits between the intro and the content.
    <FrameworkProvider>
      <StylingProvider>
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
                {current ? (
                  <>
                    <BreadcrumbLink href={component.permalink}>{component.title}</BreadcrumbLink>
                    <Icon name="chevron-right" color="fg.subtle" />
                    <styled.span color="fg" aria-current="page">
                      {current.label}
                    </styled.span>
                  </>
                ) : (
                  <styled.span color="fg" aria-current="page">
                    {component.title}
                  </styled.span>
                )}
              </styled.nav>

              <styled.div maxW="2xl" pt={{ base: "8", md: "16" }} pb="10">
                <styled.div display="flex" justifyContent="flex-start" mb="4">
                  <CopyPage href={markdownPath(current?.permalink ?? component.permalink)} />
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
                {guides.length > 0 && (
                  <styled.nav aria-label="Sections" display="flex" flexWrap="wrap" gap="1" mt="8" ms="-2.5">
                    <Button asChild variant={current ? "ghost" : "subtle"} size="sm">
                      <Link href={component.permalink} aria-current={current ? undefined : "page"}>
                        Overview
                      </Link>
                    </Button>
                    {guides.map((guide) => (
                      <Button key={guide.slug} asChild variant={guide === current ? "subtle" : "ghost"} size="sm">
                        <Link href={guide.permalink} aria-current={guide === current ? "page" : undefined}>
                          {guide.label}
                        </Link>
                      </Button>
                    ))}
                  </styled.nav>
                )}
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
      </StylingProvider>
    </FrameworkProvider>
  )
}
