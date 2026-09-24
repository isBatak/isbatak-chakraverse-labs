import { styled } from "styled-system/jsx"

import { SPONSOR_URL } from "../layout/site-links"
import { Icon } from "../ui/icon"
import { Eyebrow, Section, SectionHeading, SectionText } from "./section"

type TierId = "headline" | "partner" | "friend"

interface Sponsor {
  name: string
  href: string
  /** Path or URL of the logo; the name is shown when missing */
  logo?: string
  tier: TierId
}

// Add sponsors here. Seats a tier doesn't fill are shown as open placeholders.
const sponsors: Sponsor[] = []

const tiers: { id: TierId; label: string; seats: number }[] = [
  { id: "headline", label: "Headline", seats: 1 },
  { id: "partner", label: "Partner", seats: 2 },
  { id: "friend", label: "Friend", seats: 3 },
]

const Seat = styled("a", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "3",
    minH: "36",
    p: "6",
    textAlign: "center",
    bg: "bg.subtle",
    borderWidth: "1px",
    borderColor: "transparent",
    rounded: "l3",
    transitionProperty: "border-color, background-color",
    transitionDuration: "moderate",
    _hover: { bg: "bg.muted" },
    "&[data-open]": { bg: "transparent", borderStyle: "dashed", borderColor: "border" },
    "&[data-open]:hover": { borderColor: "border.emphasized", bg: "bg.subtle" },
  },
})

const SeatIcon = styled("span", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSize: "10",
    borderWidth: "1px",
    borderStyle: "dashed",
    borderColor: "border.emphasized",
    rounded: "l2",
    color: "fg.subtle",
  },
})

function getSeats() {
  return tiers.flatMap((tier) => {
    const taken = sponsors.filter((sponsor) => sponsor.tier === tier.id).slice(0, tier.seats)
    const open = Array.from({ length: tier.seats - taken.length }, () => undefined)
    return [...taken, ...open].map((sponsor, index) => ({ key: `${tier.id}-${index}`, tier, sponsor }))
  })
}

export function Sponsors() {
  return (
    <Section id="sponsors" style={{ scrollMarginTop: "var(--sizes-header)" }}>
      <styled.div py={{ base: "20", md: "32" }}>
        <styled.div maxW="xl" mx="auto" textAlign="center">
          <Eyebrow>Sponsors</Eyebrow>
          <SectionHeading>The sponsor wall is open.</SectionHeading>
          <SectionText>
            Every seat below is still up for grabs. Sponsorship pays for the slow parts: edge cases, accessibility
            passes and the review rounds it takes to land a machine upstream.
          </SectionText>
        </styled.div>

        <styled.div
          mt={{ base: "12", md: "16" }}
          display="grid"
          gap="4"
          gridTemplateColumns={{ sm: "repeat(2, minmax(0, 1fr))", md: "repeat(6, minmax(0, 1fr))" }}
          // Static values only: the Panda transformer drops runtime conditions in style props
          css={{
            "& > [data-tier=headline]": { gridColumn: { sm: "span 2", md: "span 6" }, minH: "52" },
            "& > [data-tier=partner]": { gridColumn: { md: "span 3" }, minH: "44" },
            "& > [data-tier=friend]": { gridColumn: { md: "span 2" } },
          }}
        >
          {getSeats().map(({ key, tier, sponsor }) =>
            sponsor ? (
              <Seat key={key} data-tier={tier.id} href={sponsor.href} target="_blank" rel="noopener">
                {sponsor.logo ? (
                  <styled.img src={sponsor.logo} alt={sponsor.name} maxH="10" maxW="60%" objectFit="contain" />
                ) : (
                  <styled.span textStyle="lg" fontWeight="medium">
                    {sponsor.name}
                  </styled.span>
                )}
                <styled.span textStyle="xs" color="fg.subtle">
                  {tier.label}
                </styled.span>
              </Seat>
            ) : (
              <Seat key={key} data-tier={tier.id} data-open="" href={SPONSOR_URL} target="_blank" rel="noopener">
                <SeatIcon>
                  <Icon name="plus" />
                </SeatIcon>
                <styled.span display="block" textStyle="sm">
                  {tier.label}
                  <styled.span display="block" mt="1" color="fg.muted">
                    Claim this seat
                  </styled.span>
                </styled.span>
              </Seat>
            ),
          )}
        </styled.div>
      </styled.div>
    </Section>
  )
}
