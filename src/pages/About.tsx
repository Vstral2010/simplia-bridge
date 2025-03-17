
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Target, Users, MessageCircle } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Simplia - Our Mission</title>
        <meta name="description" content="Learn about Simplia's mission to make medical terminology accessible to everyone" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24">
          {/* Hero section */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-simplify-50 border border-simplify-100">
                  <p className="text-sm font-medium text-simplify-700">
                    About Us
                  </p>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Making medical knowledge 
                  <span className="block mt-2 bg-gradient-to-r from-medical-600 to-simplify-500 bg-clip-text text-transparent">
                    accessible to everyone
                  </span>
                </h1>
                <p className="text-xl text-gray-600">
                  Simplia bridges the gap between complex medical terminology and everyday understanding, empowering patients, students, and caregivers.
                </p>
              </div>
            </div>
          </section>
          
          {/* Mission section */}
          <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-6">
                  At Simplia, we believe that understanding medical information shouldn't require a medical degree. Our mission is to democratize medical knowledge and make it accessible to everyone, regardless of their background.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Medical terminology can be intimidating and confusing, creating barriers between patients and their own health information. We're here to break down those barriers with technology that translates complex medical jargon into plain, understandable language.
                </p>
                <p className="text-lg text-gray-700">
                  Whether you're a patient trying to understand your diagnosis, a caregiver supporting a loved one, or a student studying medical concepts, Simplia is here to make medical language simpler, more approachable, and less intimidating.
                </p>
              </div>
            </div>
          </section>
          
          {/* Target audience */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Who We Serve</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl p-6 shadow-glass border border-gray-100">
                    <div className="inline-flex items-center justify-center rounded-full bg-medical-50 p-3 mb-4">
                      <Users className="h-6 w-6 text-medical-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Patients & Caregivers</h3>
                    <p className="text-gray-600">
                      Understanding medical reports, prescriptions, and doctor's instructions is crucial for proper care. Simplia helps patients and their caregivers comprehend complex medical information without confusion.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-glass border border-gray-100">
                    <div className="inline-flex items-center justify-center rounded-full bg-simplify-50 p-3 mb-4">
                      <BookOpen className="h-6 w-6 text-simplify-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Medical Students</h3>
                    <p className="text-gray-600">
                      Medical education involves learning thousands of new terms. Simplia helps students build their vocabulary by providing simple definitions alongside technical terminology.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-glass border border-gray-100">
                    <div className="inline-flex items-center justify-center rounded-full bg-medical-50 p-3 mb-4">
                      <MessageCircle className="h-6 w-6 text-medical-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Healthcare Communicators</h3>
                    <p className="text-gray-600">
                      For health writers, journalists, and educators, Simplia helps translate complex medical concepts into language that's accessible to general audiences.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-glass border border-gray-100">
                    <div className="inline-flex items-center justify-center rounded-full bg-simplify-50 p-3 mb-4">
                      <Target className="h-6 w-6 text-simplify-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Anyone Learning About Health</h3>
                    <p className="text-gray-600">
                      From researching symptoms to understanding health news, Simplia makes medical content more approachable for anyone seeking to improve their health literacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Call to action */}
          <section className="py-16 md:py-20 bg-gradient-to-r from-medical-600 to-simplify-600 text-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to simplify medical terminology?</h2>
                <p className="text-xl mb-8 opacity-90">
                  Start using Simplia today and transform complex medical language into clear, understandable terms.
                </p>
                <a 
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium text-medical-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-medical-600 transition-all duration-300"
                >
                  Get Started Now
                </a>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About;
