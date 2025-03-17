
import { useState, useRef, useEffect } from "react";
import { 
  FilePlus2, 
  RefreshCw, 
  Clipboard, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb 
} from "lucide-react";
import { simplifyText } from "@/lib/simplifier";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SimplifiedView from "./SimplifiedView";
import { toast } from "sonner";

interface TextSimplifierProps {
  initialText?: string;
}

const TextSimplifier = ({ initialText = "" }: TextSimplifierProps) => {
  const [text, setText] = useState(initialText);
  const [simplifiedContent, setSimplifiedContent] = useState<any>(null);
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSimplifyText = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to simplify!");
      return;
    }

    setIsSimplifying(true);
    
    try {
      const simplified = await simplifyText(text);
      setSimplifiedContent(simplified);
      toast.success("Text simplified successfully!");
    } catch (error) {
      console.error("Error simplifying text:", error);
      toast.error("Failed to simplify text. Please try again.");
    } finally {
      setIsSimplifying(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (simplifiedContent?.text) {
      navigator.clipboard.writeText(simplifiedContent.text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setText("");
    setSimplifiedContent(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      toast.success("Text pasted from clipboard!");
    } catch (error) {
      toast.error("Failed to read from clipboard. Please paste manually.");
    }
  };

  // Sample texts
  const exampleTexts = [
    "The patient presents with dyspnea, tachycardia, and bilateral lower extremity edema, consistent with congestive heart failure exacerbation.",
    "MRI shows a 3cm focal lesion in the temporal lobe with perilesional edema, suspicious for neoplasm requiring biopsy for histopathological confirmation.",
    "The patient has chronic obstructive pulmonary disease with a history of recurrent exacerbations requiring bronchodilators and corticosteroids."
  ];

  const handleUseExample = (example: string) => {
    setText(example);
  };

  return (
    <section id="simplify" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-simplify-50 border border-simplify-100">
              <p className="text-sm font-medium text-simplify-700">
                Text Simplifier
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simplify complex medical terminology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Paste medical content and our AI will identify and explain complex medical terms in simple language
            </p>
          </div>

          <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="input" className="text-base">Input</TabsTrigger>
              <TabsTrigger value="result" disabled={!simplifiedContent} className="text-base">
                Result
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="input" className="mt-0">
              <div className="bg-white rounded-xl shadow-glass border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <Textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter or paste medical text here..."
                    className="min-h-[200px] glass-input resize-none text-base"
                  />

                  <div className="flex flex-wrap justify-between items-center mt-4 gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePaste}
                        className="flex items-center gap-1.5"
                      >
                        <Clipboard className="h-4 w-4" />
                        Paste
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        disabled={!text}
                        className="flex items-center gap-1.5"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Reset
                      </Button>
                    </div>

                    <Button
                      onClick={handleSimplifyText}
                      disabled={isSimplifying || !text.trim()}
                      className={cn(
                        "bg-medical-600 hover:bg-medical-700 text-white",
                        isSimplifying && "opacity-90 cursor-not-allowed"
                      )}
                    >
                      {isSimplifying ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Simplifying
                          <span className="loading-dots"></span>
                        </>
                      ) : (
                        <>Simplify</>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 border-t border-gray-100 p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      Try out one of these examples:
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exampleTexts.map((example, i) => (
                      <button
                        key={i}
                        onClick={() => handleUseExample(example)}
                        className="text-xs bg-white px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Example {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="result" className="mt-0">
              {simplifiedContent ? (
                <div className="bg-white rounded-xl shadow-glass border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <SimplifiedView content={simplifiedContent} />
                    
                    <div className="flex justify-end mt-4">
                      <Button
                        variant="outline" 
                        onClick={handleCopyToClipboard}
                        className="flex items-center gap-1.5"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Clipboard className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-1">No Results Yet</h3>
                  <p className="text-gray-500">Simplify some text to see results here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TextSimplifier;
