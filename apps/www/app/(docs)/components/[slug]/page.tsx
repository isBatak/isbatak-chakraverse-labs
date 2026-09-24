import { components } from "#site/content"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { styled } from "styled-system/jsx"

import { FrameworkProvider } from "../../../../components/docs/framework"
import { ExamplePreview } from "../../../../components/examples/example-preview"
import { MDXContent } from "../../../../components/mdx-content"
import { Button } from "../../../../components/ui/button"
import { Icon } from "../../../../components/ui/icon"
import { Prose } from "../../../../components/ui/prose"

const BreadcrumbLink = styled(Link, {
  base: {
    color: "fg.muted",
    _hover: { color: "fg" },
  },
})

interface ComponentPageProps {
  params: Promise<{ slug: string }>
}

function getDoc(slug: string) {
  return components.find((doc) => doc.slug === slug)
}

export const dynamicParams = false

export function generateStaticParams() {
  return components.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const doc = getDoc((await params).slug)
  if (!doc) return {}
  return { title: doc.title, description: doc.description }
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const doc = getDoc((await params).slug)
  if (!doc) notFound()

  return (
    // Docs on the left, a sticky preview on the right. On small screens the preview sits between the intro and the content.
    <FrameworkProvider>
      <styled.div
        data-preview={doc.preview ? "" : undefined}
        display="grid"
        minH="100dvh"
        gridTemplateColumns="minmax(0, 1fr)"
        gridTemplateAreas={`"intro" "content"`}
        // Static values only: the Panda transformer drops runtime conditions in style props
        css={{
          "&[data-preview]": {
            gridTemplateAreas: { base: `"intro" "preview" "content"`, lg: `"intro preview" "content preview"` },
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
              {doc.title}
            </styled.span>
          </styled.nav>

          <styled.div maxW="2xl" pt={{ base: "12", md: "24" }} pb="10">
            <styled.h1 textStyle={{ base: "4xl", md: "5xl" }} fontWeight="semibold" letterSpacing="tight">
              {doc.title}
            </styled.h1>
            {doc.description && (
              <styled.p mt="4" color="fg.muted" textStyle="md" lineHeight="1.8">
                {doc.description}
              </styled.p>
            )}
          </styled.div>
        </styled.header>

        {doc.preview && (
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
            >
              <ExamplePreview id={doc.preview} />
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
            <MDXContent code={doc.code} />
          </Prose>
        </styled.main>
      </styled.div>
    </FrameworkProvider>
  )
}
