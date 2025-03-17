
// Medical terminology simplifier using API service
import { fetchSimplifiedText, processImageForTerms } from './api';

// Term interface for simplified medical terminology
export interface Term {
  original: string;
  simplified: string;
  definition: string;
  context?: string;
  wikiLink?: string;
}

// Response structure for simplified content
export interface SimplifiedContent {
  text: string;
  terms: Term[];
}

/**
 * Simplifies medical text by identifying and explaining complex terms
 * @param text The medical text to simplify
 * @returns Simplified content with identified terms
 */
export const simplifyText = async (text: string): Promise<SimplifiedContent> => {
  try {
    // Call the API service to get simplified text
    const response = await fetchSimplifiedText(text);
    
    if (!response.success) {
      throw new Error(response.error || "Failed to simplify text");
    }
    
    // Map API terms to our application's Term interface
    const terms: Term[] = response.data.terms.map(apiTerm => ({
      original: apiTerm.term,
      simplified: apiTerm.simplified,
      definition: apiTerm.definition,
      wikiLink: apiTerm.wikiLink
    }));
    
    return {
      text: response.data.sourceText,
      terms
    };
  } catch (error) {
    console.error("Error in simplifyText:", error);
    // Return empty result on error
    return {
      text,
      terms: []
    };
  }
};

/**
 * Process an image to extract and simplify medical text
 * @param imageData Base64 encoded image data
 * @returns Simplified content with identified terms
 */
export const simplifyFromImage = async (imageData: string): Promise<SimplifiedContent> => {
  try {
    // Call the API service to process the image
    const response = await processImageForTerms(imageData);
    
    if (!response.success) {
      throw new Error(response.error || "Failed to process image");
    }
    
    // Map API terms to our application's Term interface
    const terms: Term[] = response.data.terms.map(apiTerm => ({
      original: apiTerm.term,
      simplified: apiTerm.simplified,
      definition: apiTerm.definition,
      wikiLink: apiTerm.wikiLink
    }));
    
    return {
      text: response.data.sourceText,
      terms
    };
  } catch (error) {
    console.error("Error in simplifyFromImage:", error);
    // Return empty result on error
    return {
      text: "Failed to extract text from image",
      terms: []
    };
  }
};
