import { styled } from "styled-system/jsx"

import { SPONSOR_URL } from "../layout/site-links"
import { Button } from "../ui/button"
import { Icon } from "../ui/icon"
import { Section } from "./section"

export function SponsorCta() {
  return (
    <Section>
      <styled.div pb={{ base: "20", md: "32" }}>
        <styled.div
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="8"
          px={{ base: "6", md: "16" }}
          py={{ base: "14", md: "20" }}
          textAlign="center"
          bg="bg.subtle"
          rounded="l3"
        >
          <styled.p
            maxW="2xl"
            textStyle={{ base: "lg", md: "2xl" }}
            lineHeight="1.5"
            letterSpacing="tight"
            textWrap="balance"
          >
            Missing a widget in your stack? Sponsoring is the shortest path from &ldquo;someone should build this&rdquo;
            to a component that runs in every framework, and in none at all.
          </styled.p>
          <Button asChild>
            <a href={SPONSOR_URL} target="_blank" rel="noopener">
              <Icon name="heart" />
              Become a sponsor
            </a>
          </Button>
        </styled.div>
      </styled.div>
    </Section>
  )
}
