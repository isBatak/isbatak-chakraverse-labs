import { componentGuides, components } from "#site/content"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocPage } from "../../../../../components/docs/doc-page"

interface ComponentGuidePageProps {
  params: Promise<{ slug: string; section: string }>
}

async function getDocs(params: ComponentGuidePageProps["params"]) {
  const { slug, section } = await params
  const component = components.find((doc) => doc.slug === slug)
  const guide = componentGuides.find((doc) => doc.component === slug && doc.slug === section)
  return { component, guide }
}

export const dynamicParams = false

export function generateStaticParams() {
  return componentGuides.map((doc) => ({ slug: doc.component, section: doc.slug }))
}

export async function generateMetadata({ params }: ComponentGuidePageProps): Promise<Metadata> {
  const { component, guide } = await getDocs(params)
  if (!component || !guide) return {}
  return { title: `${component.title}: ${guide.label}`, description: guide.description }
}

export default async function ComponentGuidePage({ params }: ComponentGuidePageProps) {
  const { component, guide } = await getDocs(params)
  if (!component || !guide) notFound()

  return (
    <DocPage
      component={component}
      section={guide.slug}
      title={guide.title}
      description={guide.description}
      preview={guide.preview}
      code={guide.code}
    />
  )
}
