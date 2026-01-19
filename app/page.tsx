import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HeroSection from './home-sections/HeroSection';
import ServicesSection from './home-sections/ServicesSection';
import FeaturedProductsSection from './home-sections/FeaturedProductsSection';
import CTASection from './home-sections/CTASection';
import LocationSection from './home-sections/LocationSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturedProductsSection />
        <LocationSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}