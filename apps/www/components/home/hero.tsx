import Link from "next/link"
import { Fragment } from "react"
import { styled } from "styled-system/jsx"

import { Button } from "../ui/button"
import { Icon } from "../ui/icon"
import { Eyebrow, Section } from "./section"

const stats = [
  { value: "6", label: "Framework adapters" },
  { value: "100%", label: "Headless" },
  { value: "MIT", label: "Licensed" },
]

export function Hero() {
  return (
    <Section>
      <styled.div pt={{ base: "20", md: "36" }} pb={{ base: "16", md: "24" }}>
        <styled.div display="grid" gap="8" gridTemplateColumns={{ md: "repeat(12, minmax(0, 1fr))" }}>
          <styled.div gridColumn={{ md: "span 7 / span 7" }} minW="0">
            <Eyebrow>Zag machine lab</Eyebrow>
            <styled.h1
              mt="4"
              textStyle={{ base: "4xl", sm: "5xl", md: "6xl" }}
              fontWeight="medium"
              lineHeight="1"
              letterSpacing="tighter"
              textWrap="balance"
            >
              State machines for the widgets Zag doesn&apos;t have yet.
            </styled.h1>
          </styled.div>

          <styled.div gridColumn={{ md: "9 / span 4" }} pt={{ md: "10" }}>
            <styled.p maxW="sm" color="fg.muted" lineHeight="1.7" textWrap="pretty">
              A workbench for framework-agnostic UI logic. Each machine is built, documented and put through its paces
              here, then proposed to Zag so every Ark UI and Chakra UI user gets it too.
            </styled.p>
            <styled.div display="flex" flexWrap="wrap" gap="2" mt="6">
              <Button asChild size="sm">
                <Link href="/docs/components/wheel-picker">
                  Try the wheel picker
                  <Icon name="arrow-right" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/docs/introduction">Read the docs</Link>
              </Button>
            </styled.div>
          </styled.div>
        </styled.div>

        <styled.dl
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          flexWrap="wrap"
          gap={{ base: "3", sm: "6" }}
          alignItems={{ sm: "center" }}
          mt={{ base: "14", md: "20" }}
        >
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && (
                <styled.span
                  aria-hidden
                  display={{ base: "none", sm: "block" }}
                  boxSize="1"
                  rounded="full"
                  bg="border.emphasized"
                />
              )}
              {/* Label first for dt/dd semantics, shown after the value */}
              <styled.div display="flex" alignItems="baseline" gap="2.5">
                <styled.dt order="1" textStyle="xs" textTransform="uppercase" letterSpacing="widest" color="fg.muted">
                  {stat.label}
                </styled.dt>
                <styled.dd textStyle="xl" fontWeight="medium" letterSpacing="tight">
                  {stat.value}
                </styled.dd>
              </styled.div>
            </Fragment>
          ))}
        </styled.dl>
      </styled.div>
    </Section>
  )
}
