"use client"

import { STORYBOOK_URL } from "../layout/site-links"
import { useFramework } from "./framework"
import { ResourceLink } from "./resource-link"

export function StorybookLink({ id }: { id: string }) {
  const { framework } = useFramework()

  return (
    <ResourceLink href={`${STORYBOOK_URL}/?path=/story/${framework}_${id}--basic`} icon="brand-storybook">
      Storybook
    </ResourceLink>
  )
}
