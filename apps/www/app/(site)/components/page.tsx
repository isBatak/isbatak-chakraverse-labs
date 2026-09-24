import { components } from "#site/content"
import type { Metadata } from "next"
import { styled } from "styled-system/jsx"

import { ComponentCard } from "../../../components/catalog/component-card"
import { Eyebrow, Section } from "../../../components/home/section"
import { REPO_URL } from "../../../components/layout/site-links"
import { Icon } from "../../../components/ui/icon"

export const metadata: Metadata = {
  title: "Components",
  description: "Headless Zag machines with live demos for React, Vue, Svelte, Solid, Preact and vanilla JS.",
}

export default function ComponentsPage() {
  const items = components.toSorted((a, b) => a.order - b.order)

  return (
    <Section>
      <styled.div pt={{ base: "16", md: "28" }} pb={{ base: "10", md: "14" }} maxW="2xl">
        <Eyebrow>Components</Eyebrow>
        <styled.h1
          mt="4"
          textStyle={{ base: "4xl", md: "5xl" }}
          fontWeight="medium"
          lineHeight="1.05"
          letterSpacing="tighter"
          textWrap="balance"
        >
          Headless machines, ready for any framework.
        </styled.h1>
        <styled.p mt="5" maxW="lg" color="fg.muted" lineHeight="1.7" textWrap="pretty">
          Each component is a framework-agnostic Zag machine with copy-paste code for six frameworks, Ark UI style
          bindings and a Panda CSS recipe.
        </styled.p>
      </styled.div>

      <styled.div
        display="grid"
        gridTemplateColumns={{
          base: "minmax(0, 1fr)",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(3, minmax(0, 1fr))",
        }}
        gap="5"
        pb="24"
      >
        {items.map((item) => (
          <ComponentCard
            key={item.slug}
            href={item.permalink}
            title={item.title}
            description={item.description}
            category={item.category}
            status={item.status}
            example={item.preview}
          />
        ))}

        <styled.a
          href={`${REPO_URL}/issues/new`}
          target="_blank"
          rel="noopener"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="3"
          minH="64"
          p="8"
          borderRadius="l3"
          borderWidth="1px"
          borderStyle="dashed"
          textAlign="center"
          color="fg.muted"
          transitionProperty="color, border-color"
          transitionDuration="moderate"
          _hover={{ color: "fg", borderColor: "border.emphasized" }}
        >
          <Icon name="plus" size="lg" />
          <styled.span textStyle="sm" fontWeight="medium" color="fg">
            Missing a widget?
          </styled.span>
          <styled.span textStyle="sm" maxW="xs">
            Suggest the next machine on GitHub.
          </styled.span>
        </styled.a>
      </styled.div>
    </Section>
  )
}
