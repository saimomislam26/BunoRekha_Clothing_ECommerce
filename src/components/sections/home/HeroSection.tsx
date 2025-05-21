"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-[calc(100vh-12rem)] min-h-[400px] md:h-[calc(100vh-10rem)] md:min-h-[500px] lg:min-h-[600px] rounded-lg overflow-hidden shadow-2xl group">
      <Image
        src="https://placehold.co/1600x900/333333/D4AF37.png"
        alt="BunoRekha Hero Image"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="transform transition-transform duration-500 ease-in-out group-hover:scale-105"
        data-ai-hint="fashion model"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-4 animate-fade-in-down">
          Buno<span className="text-primary">Rekha</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 drop-shadow-md max-w-2xl mb-8 animate-fade-in-up delay-200">
          Where threads tell stories, and style is woven with soul. Discover elegance redefined.
        </p>
        <Link href="/products" passHref>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-accent text-primary-foreground rounded-full text-lg px-8 py-6 shadow-lg transform transition-transform duration-300 hover:scale-105 animate-fade-in-up delay-500 group/button"
            aria-label="Explore Collection"
          >
            Explore Collection
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Button>
        </Link>
      </div>
      <style jsx global>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </section>
  );
};

export default HeroSection;
