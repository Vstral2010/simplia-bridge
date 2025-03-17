
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TextSimplifier from "@/components/TextSimplifier";
import ImageUploader from "@/components/ImageUploader";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  // Smooth scroll to section when clicking on anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Adjust for header height
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <Helmet>
        <title>Simplia - Understand Medicine, Simply</title>
        <meta name="description" content="Simplia is an AI-powered app that detects complex medical vocabulary in any text or photo, and translates those terms into simple, everyday language." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          <TextSimplifier />
          <ImageUploader />
          <Features />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
