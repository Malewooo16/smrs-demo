import LandingFooter from "./LandingFooter";
import LandingHero from "./LandingHero";
import LandingIntro from "./LandingIntro";
import LandingNav from "./LandingNav";


export default function LandingMain() {
  return (
      <div className="bg-landing">
      <LandingNav />
      <LandingIntro />
      <LandingHero />
      <LandingFooter />
      </div>
  )
}
