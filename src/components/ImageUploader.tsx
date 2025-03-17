import { useState, useRef } from "react";
import { Camera, Upload, X, Clipboard, ScanLine, AlertCircle, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { simplifyFromImage } from "@/lib/simplifier";
import SimplifiedView from "./SimplifiedView";
import ApiKeyConfig from "./ApiKeyConfig";

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [simplifiedContent, setSimplifiedContent] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setIsUploading(false);
      setSimplifiedContent(null);
    };
    reader.onerror = () => {
      toast.error('Failed to read the image file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setImage(null);
    setSimplifiedContent(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProcessImage = async () => {
    if (!image) return;
    
    setIsProcessing(true);
    
    try {
      // Call your processing function
      const result = await simplifyFromImage(image);
      setSimplifiedContent(result);
      toast.success('Image processed successfully!');
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process the image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="scan" className="py-16 md:py-24 bg-gray-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-medical-50 border border-medical-100">
              <p className="text-sm font-medium text-medical-700">
                Image Scanner
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Scan medical documents with ease
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload an image of a medical document, report, or prescription to extract and simplify complex terminology
            </p>
          </div>

          <div className="flex justify-end mb-4">
            <ApiKeyConfig />
          </div>

          <div className="bg-white rounded-xl shadow-glass border border-gray-100 overflow-hidden">
            <div className="p-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {!image ? (
                <div 
                  className={cn(
                    "border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer transition-all hover:border-medical-300 hover:bg-gray-50",
                    isUploading && "opacity-70 pointer-events-none"
                  )}
                  onClick={triggerFileInput}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-medical-600 mb-4"></div>
                      <p className="text-gray-500">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="bg-medical-50 p-3 rounded-full mb-4">
                        <Upload className="h-8 w-8 text-medical-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Upload a medical document</h3>
                      <p className="text-gray-500 mb-4">
                        Drag and drop an image, or click to browse
                      </p>
                      <Button className="bg-medical-600 hover:bg-medical-700">
                        Select Image
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <button
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-100 transition-colors"
                      onClick={clearImage}
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                    <img
                      src={image}
                      alt="Uploaded document"
                      className="w-full object-contain max-h-[300px]"
                    />
                  </div>

                  {!simplifiedContent ? (
                    <Button
                      className="w-full bg-medical-600 hover:bg-medical-700"
                      onClick={handleProcessImage}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <ScanLine className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ScanLine className="mr-2 h-4 w-4" />
                          Extract & Simplify Text
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Simplified Results</h3>
                      <SimplifiedView content={simplifiedContent} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageUploader;
