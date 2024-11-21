import EmailSignupSection from "./LandingCallToAction";
import LandingDescription from "./LandingDescription";
import LandingFooter from "./LandingFooter";
import LandingHero from "./LandingHero";
import LandingIntro from "./LandingIntro";
import LandingNav from "./LandingNav";
import TestimonialSection from "./LandingTestimonials";


export default function LandingMain() {
  return (
      <div className="bg-landing">
      <div className="relative z-10"><LandingNav /></div>
      <LandingIntro />
      <LandingHero />
      <LandingDescription />
      <TestimonialSection />
      <EmailSignupSection />
      <LandingFooter />
      </div>
  )
}
