import { components } from "#site/content"
import { styled } from "styled-system/jsx"

import { Eyebrow, Section } from "./section"

const Stat = styled("div", {
  base: {
    display: "flex",
    alignItems: "baseline",
    gap: "2.5",
  },
})

// Label first for dt/dd semantics, shown after the value
const StatLabel = styled("dt", {
  base: {
    order: "1",
    textStyle: "xs",
    textTransform: "uppercase",
    letterSpacing: "widest",
    color: "fg.muted",
  },
})

const LeadingStatLabel = styled(StatLabel, {
  base: {
    order: "0",
  },
})

const StatValue = styled("dd", {
  base: {
    textStyle: "xl",
    fontWeight: "medium",
    letterSpacing: "tight",
  },
})

const Dot = styled("span", {
  base: {
    display: { base: "none", sm: "block" },
    boxSize: "1",
    rounded: "full",
    bg: "border.emphasized",
  },
})

// A one-line window onto the framework names, rolled like a wheel picker
const FrameworkRoll = styled("span", {
  base: {
    display: "inline-block",
    verticalAlign: "bottom",
    height: "1.25em",
    lineHeight: "1.25em",
    overflow: "hidden",
    maskImage: "linear-gradient(to bottom, transparent, black 25% 75%, transparent)",
  },
})

const FrameworkRollList = styled("span", {
  base: {
    display: "flex",
    flexDirection: "column",
    animation: "framework-roll 12s cubic-bezier(0.65, 0, 0.35, 1) infinite",
    _motionReduce: { animation: "none" },
  },
})

export function Hero() {
  return (
    <Section>
      <styled.div pt={{ base: "20", md: "36" }} pb={{ base: "16", md: "24" }}>
        <styled.div display="grid" gap="8" gridTemplateColumns={{ md: "repeat(12, minmax(0, 1fr))" }}>
          <styled.div gridColumn={{ md: "span 7 / span 7" }} minW="0">
            <Eyebrow>One machine, every framework</Eyebrow>
            <styled.h1
              mt="4"
              textStyle={{ base: "4xl", sm: "5xl", md: "6xl" }}
              fontWeight="medium"
              lineHeight="1"
              letterSpacing="tighter"
              textWrap="balance"
            >
              Headless components for React, Vue, Svelte, Solid, Preact and plain JavaScript.
            </styled.h1>
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
          <Stat>
            <StatLabel>{components.length === 1 ? "Component" : "Components"}</StatLabel>
            <StatValue>{components.length}</StatValue>
          </Stat>
          <Dot aria-hidden />
          <Stat>
            <StatLabel>Headless</StatLabel>
            <StatValue>100%</StatValue>
          </Stat>
          <Dot aria-hidden />
          <Stat>
            <LeadingStatLabel>Works with</LeadingStatLabel>
            <StatValue>
              <styled.span srOnly>React, Vue, Svelte, Solid, Preact and Vanilla JS</styled.span>
              <FrameworkRoll aria-hidden>
                <FrameworkRollList>
                  <span>React</span>
                  <span>Vue</span>
                  <span>Svelte</span>
                  <span>Solid</span>
                  <span>Preact</span>
                  <span>Vanilla JS</span>
                  <span>React</span>
                </FrameworkRollList>
              </FrameworkRoll>
            </StatValue>
          </Stat>
        </styled.dl>
      </styled.div>
    </Section>
  )
}
