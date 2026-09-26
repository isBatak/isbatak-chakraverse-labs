import { Hero } from "../../components/home/hero"
import { SponsorCta } from "../../components/home/sponsor-cta"
import { Sponsors } from "../../components/home/sponsors"
import { StackPreferences } from "../../components/home/stack-preferences"

export default function Home() {
  return (
    <>
      <Hero />
      <StackPreferences />
      <Sponsors />
      <SponsorCta />
    </>
  )
}
