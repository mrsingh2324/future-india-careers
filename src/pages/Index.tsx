import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import StatsSection from '@/components/StatsSection';
import NewsSection from '@/components/NewsSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <StatsSection />
      <NewsSection />
    </div>
  );
};

export default Index;
