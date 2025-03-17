
import { 
  Scan, 
  FileText, 
  BookOpen, 
  Languages, 
  FolderKanban, 
  Brain,
  BarChart3,
  Sparkles
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Scan className="h-6 w-6 text-medical-600" />,
      title: "Image-to-Simple",
      description: "Scan medical documents, extract the text, and simplify complex terminology without altering general content."
    },
    {
      icon: <FileText className="h-6 w-6 text-medical-600" />,
      title: "Text Simplifier",
      description: "Paste any medical text and we'll highlight and simplify only the medical jargon while preserving everything else."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-simplify-600" />,
      title: "Smart Glossary",
      description: "Build your personal simplified glossary while you read, with the ability to review saved terms using flashcards."
    },
    {
      icon: <Languages className="h-6 w-6 text-simplify-600" />,
      title: "Language Options",
      description: "Translate simplified terms into multiple languages while keeping the original text structure intact."
    },
    {
      icon: <FolderKanban className="h-6 w-6 text-medical-600" />,
      title: "Medical Categories",
      description: "Filter results by specialty like Cardiology, Neurology, or Pharmacology to focus on specific areas."
    },
    {
      icon: <Brain className="h-6 w-6 text-medical-600" />,
      title: "AI-Powered Definitions",
      description: "Get not just definitions, but visual explanations and analogies that boost understanding of complex terms."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-simplify-600" />,
      title: "Learning Progress",
      description: "Track how many terms you've learned and review your simplified reading history to measure growth."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-simplify-600" />,
      title: "Intuitive Design",
      description: "A focused, user-friendly interface that keeps the attention on what matters - understanding medical content."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-light opacity-50 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-simplify-50 border border-simplify-100">
            <p className="text-sm font-medium text-simplify-700">
              Key Features
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Making medical terminology <span className="text-medical-600">accessible</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simplia bridges the gap between complex medical language and everyday understanding
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100 p-3">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-medical-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-simplify-100/30 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Features;
