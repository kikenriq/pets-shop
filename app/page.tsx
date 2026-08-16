import Hero from '@/components/sections/Hero';
import TopCategories from '@/components/sections/TopCategories';
import PromoBanners from '@/components/sections/PromoBanners';
import BestSellers from '@/components/sections/BestSellers';
import Features from '@/components/sections/Features';
import CTA from '@/components/sections/CTA';
import Brands from '@/components/sections/Brands';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TopCategories />
      <PromoBanners />
      <BestSellers />
      <Features />
      <CTA />
      <Brands />
    </>
  );
}
