import { docs } from "#site/content"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Stack, styled } from "styled-system/jsx"

import { MDXContent } from "../../../components/mdx-content"
import { Prose } from "../../../components/ui/prose"

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

  return (
    <styled.article>
      <Stack gap="2" mb="8">
        <styled.h1 textStyle="3xl" fontWeight="bold">
          {doc.title}
        </styled.h1>
        {doc.description && (
          <styled.p color="fg.muted" textStyle="lg">
            {doc.description}
          </styled.p>
        )}
      </Stack>
      <Prose>
        <MDXContent code={doc.code} />
      </Prose>
    </styled.article>
  )
}
