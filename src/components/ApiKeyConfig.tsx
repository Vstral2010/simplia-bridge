
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Key, Save, Check } from "lucide-react";
import { toast } from "sonner";

const ApiKeyConfig = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("medicalTermsApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("medicalTermsApiKey", apiKey.trim());
      // Add code to refresh any global state if needed
      toast.success("API key saved successfully");
      setIsDialogOpen(false);
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  // Check if API key is configured
  const isApiKeyConfigured = !!apiKey;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={isApiKeyConfigured ? "outline" : "default"}
          size="sm" 
          className="flex items-center gap-1.5"
        >
          {isApiKeyConfigured ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              API Configured
            </>
          ) : (
            <>
              <Key className="h-4 w-4" />
              Set API Key
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configure API Key</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">
            Enter your API key for the Medical Terms Simplifier API. 
            Your key will be stored only in your browser.
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="password"
              placeholder="Enter API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button onClick={handleSaveApiKey}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyConfig;
