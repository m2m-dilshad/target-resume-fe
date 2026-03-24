import CTASection from './_components/CTASection';
import Features from './_components/Features';
import HeroHome from './_components/HeroHome';
import HowItWorks from './_components/HowItWorks';

export default function Home() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeroHome />
      <Features />
      <HowItWorks />
      <CTASection />
    </div>
  );
}
