import HeroSection from '@/components/sections/home/HeroSection';
import FeaturedProducts from '@/components/sections/home/FeaturedProducts';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <Separator className="my-12 bg-border/40" />
      <FeaturedProducts />
      {/* Add more sections as needed, e.g., Brand Story, Testimonials */}
    </div>
  );
}
