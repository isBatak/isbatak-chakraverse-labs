import Link from "next/link"

import * as Accordion from "../components/ui/accordion"
import { Button } from "../components/ui/button"
import { Icon } from "../components/ui/icon"
import { icons } from "../.ikona/icons"
import { HStack, Stack, Wrap, styled } from "styled-system/jsx"

const faqs = [
  { value: "zag", title: "What is Zag?", body: "Framework-agnostic UI state machines." },
  { value: "ark", title: "What is Ark UI?", body: "Headless React components built on Zag machines." },
  { value: "panda", title: "How is it styled?", body: "Panda CSS with the Chakra UI preset." },
]

export default function Home() {
  return (
    <Stack gap="8" px="4" py="12">
      <styled.h1 textStyle="3xl" fontWeight="bold">
        isbatak zag
      </styled.h1>
      <styled.p color="fg.muted" textStyle="lg">
        Zag.js machines and framework adapters.
      </styled.p>
      <HStack gap="3">
        <Button asChild>
          <Link href="/docs/introduction">Get started</Link>
        </Button>
        <Button asChild variant="outline">
          <a href="https://github.com/isBatak/isbatak-chakraverse-labs">GitHub</a>
        </Button>
      </HStack>
      <Accordion.Root variant="enclosed" collapsible defaultValue={["zag"]}>
        {faqs.map((faq) => (
          <Accordion.Item key={faq.value} value={faq.value}>
            <Accordion.ItemTrigger>
              {faq.title}
              <Accordion.ItemIndicator>
                <Icon name="chevron-down" />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{faq.body}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <Wrap gap="4" fontSize="2xl">
        {icons.map((name) => (
          <Icon key={name} name={name} />
        ))}
      </Wrap>
    </Stack>
  )
}
