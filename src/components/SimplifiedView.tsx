
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bookmark,
  BookmarkCheck,
  AlertCircle,
  Book,
  ThumbsUp,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

interface Term {
  original: string;
  simplified: string;
  definition: string;
  context?: string;
  wikiLink?: string;
}

interface SimplifiedContent {
  text: string;
  terms: Term[];
}

interface SimplifiedViewProps {
  content: SimplifiedContent;
}

const SimplifiedView = ({ content }: SimplifiedViewProps) => {
  const [savedTerms, setSavedTerms] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"highlighted" | "simplified">("highlighted");

  // This function parses the text and applies highlighting to medical terms
  const renderHighlightedText = () => {
    if (!content || !content.terms || !content.text) {
      return <p>No content to display</p>;
    }

    let highlightedText = content.text;
    const termsByLength = [...content.terms].sort(
      (a, b) => b.original.length - a.original.length
    );

    // Placeholders to avoid double-highlighting
    const placeholders: Record<string, { term: Term; key: string }> = {};

    // Replace each term with a unique placeholder
    termsByLength.forEach((term, index) => {
      const placeholder = `__TERM_${index}__`;
      const regex = new RegExp(`\\b${term.original}\\b`, "gi");
      highlightedText = highlightedText.replace(regex, placeholder);
      placeholders[placeholder] = { term, key: `term-${index}` };
    });

    // Split by placeholders and create React elements
    const parts = highlightedText.split(/(__|__TERM_\d+__)/g);
    
    return (
      <div className="prose max-w-none">
        {parts.map((part, index) => {
          // Check if this part is a placeholder
          if (placeholders[part]) {
            const { term, key } = placeholders[part];
            const isSaved = savedTerms.includes(term.original);

            return (
              <HoverCard key={key} openDelay={300} closeDelay={200}>
                <HoverCardTrigger asChild>
                  <span className="highlight-medical group relative">
                    {term.original}
                    <span 
                      className="absolute -top-1 -right-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveTerm(term);
                      }}
                    >
                      {isSaved ? (
                        <BookmarkCheck size={14} className="text-medical-600" />
                      ) : (
                        <Bookmark size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-medical-600 transition-opacity" />
                      )}
                    </span>
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white shadow-lg rounded-lg border border-gray-100 p-4">
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{term.original}</div>
                    <span 
                      className="cursor-pointer text-gray-500 hover:text-medical-600 transition-colors"
                      onClick={() => handleSaveTerm(term)}
                    >
                      {isSaved ? (
                        <BookmarkCheck size={16} className="text-medical-600" />
                      ) : (
                        <Bookmark size={16} />
                      )}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-simplify-700 mt-2">
                    Simple Definition:
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    {term.simplified}
                  </div>
                  {term.definition && (
                    <>
                      <div className="text-sm font-medium text-medical-700 mt-3">
                        Full Definition:
                      </div>
                      <div className="text-sm text-gray-700 mt-1">
                        {term.definition}
                      </div>
                    </>
                  )}
                  {term.wikiLink && (
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <a 
                        href={term.wikiLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-medical-600 hover:text-medical-800 flex items-center gap-1.5"
                      >
                        <ExternalLink size={14} />
                        Learn more on Wikipedia
                      </a>
                    </div>
                  )}
                </HoverCardContent>
              </HoverCard>
            );
          }
          
          // Regular text part
          return <span key={`text-${index}`}>{part}</span>;
        })}
      </div>
    );
  };

  // This function shows the text with all medical terms replaced by simplified versions
  const renderSimplifiedText = () => {
    if (!content || !content.terms || !content.text) {
      return <p>No content to display</p>;
    }

    let simplifiedText = content.text;
    content.terms.forEach((term) => {
      const regex = new RegExp(`\\b${term.original}\\b`, "gi");
      simplifiedText = simplifiedText.replace(
        regex,
        `<span class="highlight-definition">${term.simplified}</span>`
      );
    });

    return (
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: simplifiedText }}
      />
    );
  };

  const handleSaveTerm = (term: Term) => {
    if (savedTerms.includes(term.original)) {
      setSavedTerms(savedTerms.filter(t => t !== term.original));
      toast.success(`"${term.original}" removed from your glossary`);
    } else {
      setSavedTerms([...savedTerms, term.original]);
      toast.success(`"${term.original}" added to your glossary`);
    }
  };

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-1">No Content</h3>
        <p className="text-gray-500">There is no content to display</p>
      </div>
    );
  }

  // Count medical terms identified
  const termsCount = content.terms?.length || 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
            <ThumbsUp className="h-4 w-4 text-simplify-600" />
            <span>{termsCount} terms simplified</span>
          </div>
          {savedTerms.length > 0 && (
            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
              <Book className="h-4 w-4 text-medical-600" />
              <span>{savedTerms.length} saved to glossary</span>
            </div>
          )}
        </div>

        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            className={cn(
              "flex items-center rounded-md py-1.5 px-3 text-sm font-medium focus:outline-none",
              viewMode === "highlighted"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-700 hover:bg-gray-50"
            )}
            onClick={() => setViewMode("highlighted")}
          >
            Highlighted
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center rounded-md py-1.5 px-3 text-sm font-medium focus:outline-none",
              viewMode === "simplified"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-700 hover:bg-gray-50"
            )}
            onClick={() => setViewMode("simplified")}
          >
            Simplified
          </button>
        </div>
      </div>

      <div className="mt-3 text-gray-800 leading-relaxed">
        {viewMode === "highlighted" ? renderHighlightedText() : renderSimplifiedText()}
      </div>

      {termsCount === 0 && (
        <div className="flex items-center justify-center py-8 px-4 border border-gray-100 rounded-lg bg-gray-50 mt-4">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <h4 className="text-lg font-medium text-gray-800 mb-1">No Medical Terms Found</h4>
            <p className="text-gray-600">
              No complex medical terminology was detected in the provided text.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplifiedView;
