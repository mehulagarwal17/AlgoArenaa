import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero';
import FeaturesSection from '@/components/sections/features';
import DemoSection from '@/components/sections/demo';
import PricingSection from '@/components/sections/pricing';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
