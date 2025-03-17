
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-mesh-light opacity-50 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-medical-50 border border-medical-100">
            <p className="text-sm font-medium text-medical-700">
              Understand Medicine, Simply
            </p>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-medical-600 to-simplify-500 bg-clip-text text-transparent">
              Simplify
            </span>{" "}
            medical terminology in seconds
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 animate-fade-in delay-100">
            Simplia detects complex medical vocabulary in text and images, 
            and translates it into simple, everyday language — 
            without affecting non-medical content.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-200">
            <a 
              href="#simplify" 
              className="w-full sm:w-auto btn-primary"
            >
              Try it now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="#features" 
              className="w-full sm:w-auto btn-secondary"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
      
      {/* Gradient orb */}
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-medical-200/30 rounded-full blur-3xl animate-pulse-subtle"></div>
      <div className="absolute bottom-0 -left-64 w-96 h-96 bg-simplify-200/30 rounded-full blur-3xl animate-pulse-subtle"></div>
    </section>
  );
};

export default Hero;
