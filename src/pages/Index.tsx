import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import StatsSection from '@/components/StatsSection';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <StatsSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
