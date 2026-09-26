"use client"

import { Portal } from "@ark-ui/react/portal"
import Link from "next/link"
import { type ReactNode, useRef, useState } from "react"
import { styled } from "styled-system/jsx"

import { type FrameworkId, useFramework } from "../docs/framework"
import { type InstallMethodId, useInstallMethod } from "../docs/install-method"
import { type LayerId, useLayer } from "../docs/layer"
import { type StylingId, useStyling } from "../docs/styling"
import { Button } from "../ui/button"
import { Icon, type IconName } from "../ui/icon"
import { HoverCard } from "../ui/hover-card"
import { RadioCard } from "../ui/radio-card"
import { Eyebrow, Section } from "./section"

const ARTICLE_URL = "https://nerdy.dev/headless-boneless-and-skinless-ui"

const QuestionNumber = styled("span", {
  base: {
    fontFamily: "mono",
    textStyle: "overline",
    color: "fg.subtle",
  },
})

const InlineLink = styled("a", {
  base: {
    color: "fg",
    textDecoration: "underline",
    textDecorationColor: "border.emphasized",
    textUnderlineOffset: "3px",
    _hover: { textDecorationColor: "fg.subtle" },
  },
})

function Question({ number, label, hint }: { number: string; label: string; hint?: ReactNode }) {
  return (
    <styled.div display="flex" flexDirection="column" gap="1" mb="2">
      <RadioCard.Label display="flex" alignItems="baseline" gap="3" textStyle="md">
        <QuestionNumber>{number}</QuestionNumber>
        {label}
      </RadioCard.Label>
      {hint && (
        <styled.p ps="8" textStyle="xs" color="fg.muted">
          {hint}
        </styled.p>
      )}
    </styled.div>
  )
}

function FrameworkOption({ value, label, icon }: { value: FrameworkId; label: string; icon: IconName }) {
  return (
    <RadioCard.Item value={value}>
      <RadioCard.ItemHiddenInput />
      <RadioCard.ItemControl alignItems="center">
        <Icon size="md" name={icon} />
        <RadioCard.ItemText>{label}</RadioCard.ItemText>
        <RadioCard.ItemIndicator />
      </RadioCard.ItemControl>
    </RadioCard.Item>
  )
}

function DescribedOption({ value, label, description }: { value: string; label: string; description: string }) {
  return (
    <RadioCard.Item value={value}>
      <RadioCard.ItemHiddenInput />
      <RadioCard.ItemControl pe="10">
        <RadioCard.ItemIndicator />
        <RadioCard.ItemContent>
          <RadioCard.ItemText>{label}</RadioCard.ItemText>
          <RadioCard.ItemDescription>{description}</RadioCard.ItemDescription>
        </RadioCard.ItemContent>
      </RadioCard.ItemControl>
    </RadioCard.Item>
  )
}

function LayerInfo({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const touchTap = useRef<{ wasOpen: boolean } | null>(null)

  return (
    <HoverCard.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      openDelay={150}
      closeDelay={200}
      positioning={{ placement: "top-end" }}
    >
      <HoverCard.Trigger asChild>
        <Button
          variant="ghost"
          size="xs"
          px="0"
          aspectRatio="square"
          position="absolute"
          top="2"
          insetEnd="2"
          zIndex="2"
          aria-label={`About ${title}`}
          onPointerDown={(event) => {
            touchTap.current = event.pointerType === "touch" ? { wasOpen: open } : null
          }}
          onClick={() => {
            if (touchTap.current) setOpen(!touchTap.current.wasOpen)
          }}
        >
          <Icon size="sm" name="info-circle" />
        </Button>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content w="80" display="flex" flexDirection="column" gap="3" textStyle="sm">
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>
            <styled.p fontWeight="medium">{title}</styled.p>
            {children}
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}

export function StackPreferences() {
  const { framework, setFramework } = useFramework()
  const { styling, setStyling } = useStyling()
  const { installMethod, setInstallMethod } = useInstallMethod()
  const { layer, setLayer } = useLayer()

  return (
    <Section id="your-stack" style={{ scrollMarginTop: "var(--sizes-header)" }}>
      <styled.div py={{ base: "16", md: "24" }} borderTopWidth="1px">
        <styled.div
          display="grid"
          gap={{ base: "10", md: "8" }}
          gridTemplateColumns={{ md: "repeat(12, minmax(0, 1fr))" }}
        >
          <styled.div gridColumn={{ md: "span 5 / span 5" }}>
            <styled.div position={{ md: "sticky" }} top="calc({sizes.header} + {spacing.6})">
              <Eyebrow>Your stack</Eyebrow>
              <styled.h2
                mt="3"
                textStyle={{ base: "3xl", md: "4xl" }}
                fontWeight="medium"
                letterSpacing="tight"
                textWrap="balance"
              >
                Tell us how you build.
              </styled.h2>
              <styled.p mt="4" maxW="sm" textStyle="sm" lineHeight="1.7" color="fg.muted" textWrap="pretty">
                Four quick questions. We remember your answers in this browser, and every docs page opens with the
                matching framework, styles, install steps and guide.
              </styled.p>
              <Button asChild mt="8">
                <Link href="/components">
                  Show me the docs
                  <Icon name="arrow-right" />
                </Link>
              </Button>
            </styled.div>
          </styled.div>

          <styled.div gridColumn={{ md: "span 7 / span 7" }} display="flex" flexDirection="column" gap="10">
            <RadioCard.Root
              size="sm"
              variant="surface"
              value={framework}
              onValueChange={(details) => details.value && setFramework(details.value as FrameworkId)}
            >
              <Question number="01" label="Which framework do you use?" />
              <styled.div
                display="grid"
                gridTemplateColumns={{ base: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))" }}
                gap="2"
              >
                <FrameworkOption value="react" label="React" icon="brand-react" />
                <FrameworkOption value="vue" label="Vue" icon="brand-vue" />
                <FrameworkOption value="svelte" label="Svelte" icon="brand-svelte" />
                <FrameworkOption value="solid" label="Solid" icon="brand-solidjs" />
                <FrameworkOption value="preact" label="Preact" icon="brand-preact" />
                <FrameworkOption value="vanilla" label="Vanilla JS" icon="brand-javascript" />
              </styled.div>
            </RadioCard.Root>

            <RadioCard.Root
              size="sm"
              variant="surface"
              value={styling}
              onValueChange={(details) => details.value && setStyling(details.value as StylingId)}
            >
              <Question number="02" label="How do you style it?" />
              <styled.div display="grid" gridTemplateColumns={{ sm: "repeat(2, minmax(0, 1fr))" }} gap="2">
                <DescribedOption value="panda" label="Panda CSS" description="Recipes from your styled-system." />
                <DescribedOption value="css" label="CSS" description="A plain stylesheet, no build step." />
              </styled.div>
            </RadioCard.Root>

            <RadioCard.Root
              size="sm"
              variant="surface"
              value={installMethod}
              onValueChange={(details) => details.value && setInstallMethod(details.value as InstallMethodId)}
            >
              <Question number="03" label="How do you add components?" />
              <styled.div display="grid" gridTemplateColumns={{ sm: "repeat(2, minmax(0, 1fr))" }} gap="2">
                <DescribedOption
                  value="cli"
                  label="shadcn CLI"
                  description="One command adds the files and dependencies."
                />
                <DescribedOption
                  value="manual"
                  label="Manual"
                  description="Install the dependencies and copy the files."
                />
              </styled.div>
            </RadioCard.Root>

            <RadioCard.Root
              size="sm"
              variant="surface"
              value={layer}
              onValueChange={(details) => details.value && setLayer(details.value as LayerId)}
            >
              <Question
                number="04"
                label="Just the life, or the bones too?"
                hint={
                  <>
                    In Adam Argyle&rsquo;s{" "}
                    <InlineLink href={ARTICLE_URL} target="_blank" rel="noopener">
                      Headless, boneless, skinless &amp; lifeless UI
                    </InlineLink>{" "}
                    terms: life is behavior, bones are markup, and your styles are the skin.
                  </>
                }
              />
              <styled.div display="grid" gridTemplateColumns={{ sm: "repeat(2, minmax(0, 1fr))" }} gap="2">
                <styled.div position="relative" display="flex" flexDirection="column">
                  <DescribedOption
                    value="zag"
                    label="Just the life"
                    description="Zag state machines. You bring the bones and skin."
                  />
                  <LayerInfo title="Just the life: Zag">
                    <p>
                      Zag is the behavior: framework-agnostic state machines that handle pointer, keyboard, focus and
                      ARIA. It renders nothing, so you write the markup and spread its props onto your own elements.
                    </p>
                    <p>The article calls this lifeless UI: just the life, bring your own bones and skin.</p>
                    <styled.p display="flex" gap="4">
                      <InlineLink href="https://zagjs.com" target="_blank" rel="noopener">
                        zagjs.com
                      </InlineLink>
                      <InlineLink href={ARTICLE_URL} target="_blank" rel="noopener">
                        Read the article
                      </InlineLink>
                    </styled.p>
                  </LayerInfo>
                </styled.div>
                <styled.div position="relative" display="flex" flexDirection="column">
                  <DescribedOption
                    value="ark"
                    label="Bones and life"
                    description="Ark UI component parts. You bring the skin."
                  />
                  <LayerInfo title="Bones and life: Ark UI">
                    <p>
                      Ark UI wraps the same Zag machines in accessible, unstyled component parts for React, Solid, Vue
                      and Svelte. The markup and the behavior come included.
                    </p>
                    <p>The article calls this headless UI: working components, bring your own style.</p>
                    <styled.p display="flex" gap="4">
                      <InlineLink href="https://ark-ui.com" target="_blank" rel="noopener">
                        ark-ui.com
                      </InlineLink>
                      <InlineLink href={ARTICLE_URL} target="_blank" rel="noopener">
                        Read the article
                      </InlineLink>
                    </styled.p>
                  </LayerInfo>
                </styled.div>
              </styled.div>
            </RadioCard.Root>
          </styled.div>
        </styled.div>
      </styled.div>
    </Section>
  )
}
