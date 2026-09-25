import type { Component } from "#site/content"
import { styled } from "styled-system/jsx"

import { REPO_URL } from "../layout/site-links"
import { ResourceLink } from "./resource-link"
import { StorybookLink } from "./storybook-link"

const repoUrl = (path: string) => `${REPO_URL}/tree/main/${path}`

export function DocLinks({ links }: { links: Component["links"] }) {
  const { source, storybook, recipe, ark } = links
  if (!source && !storybook && !recipe && !ark) return null

  return (
    <styled.div display="flex" flexWrap="wrap" columnGap="6" rowGap="3" mt="6">
      {source && (
        <ResourceLink href={repoUrl(source)} icon="brand-github">
          Source
        </ResourceLink>
      )}
      {storybook && <StorybookLink id={storybook} />}
      {recipe && (
        <ResourceLink href={repoUrl(recipe)} icon="brand-github">
          Recipe
        </ResourceLink>
      )}
      {ark && (
        <ResourceLink href={repoUrl(ark)} icon="brand-ark">
          Ark
        </ResourceLink>
      )}
    </styled.div>
  )
}
