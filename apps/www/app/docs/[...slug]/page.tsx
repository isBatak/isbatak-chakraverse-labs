import { docs } from "#site/content"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { styled } from "styled-system/jsx"

import { DocsNav } from "../../../components/docs/docs-nav"
import { MDXContent } from "../../../components/mdx-content"
import { previews } from "../../../components/previews"
import { Icon } from "../../../components/ui/icon"
import { Prose } from "../../../components/ui/prose"

const BreadcrumbLink = styled(Link, {
  base: {
    color: "fg.muted",
    _hover: { color: "fg" },
  },
})

interface DocPageProps {
  params: Promise<{ slug: string[] }>
}

function getDoc(slug: string[]) {
  return docs.find((doc) => doc.slug === slug.join("/"))
}

export const dynamicParams = false

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug.split("/") }))
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const doc = getDoc((await params).slug)
  if (!doc) return {}
  return { title: doc.title, description: doc.description }
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = getDoc((await params).slug)
  if (!doc) notFound()

  const Preview = doc.preview ? previews[doc.preview] : undefined
  const nav = docs.toSorted((a, b) => a.order - b.order).map(({ title, permalink }) => ({ title, permalink }))

  return (
    // Docs on the left, a sticky preview on the right. On small screens the preview sits between the intro and the content.
    <styled.div
      data-preview={Preview ? "" : undefined}
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
          <DocsNav items={nav} />
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
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

      {Preview && (
        <styled.aside gridArea="preview" minW="0" p="3" ps={{ lg: "0" }}>
          <styled.div
            position={{ lg: "sticky" }}
            top="3"
            h={{ base: "96", lg: "calc(100dvh - {spacing.6})" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            borderRadius="2xl"
            borderWidth="1px"
            bg="bg.subtle"
          >
            <Preview />
          </styled.div>
        </styled.aside>
      )}

      <styled.main gridArea="content" minW="0" px={{ base: "5", md: "10" }} pb="24" maxW="calc({sizes.2xl} + {spacing.20})">
        <Prose>
          <MDXContent code={doc.code} />
        </Prose>
      </styled.main>
    </styled.div>
  )
}
