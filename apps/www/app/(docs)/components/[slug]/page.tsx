import { components } from "#site/content"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocPage } from "../../../../components/docs/doc-page"

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
    <DocPage
      component={doc}
      title={doc.title}
      description={doc.description}
      preview={doc.preview}
      code={doc.code}
    />
  )
}
