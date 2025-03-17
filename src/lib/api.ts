
// Medical term API service for fetching medical terminology information

/**
 * API response types for medical terminology
 */
export interface ApiTerm {
  id: string;
  term: string;
  simplified: string;
  definition: string;
  wikiLink?: string;
}

export interface ApiResponse {
  success: boolean;
  data: {
    terms: ApiTerm[];
    sourceText: string;
  };
  error?: string;
}

// API endpoint constants
const API_BASE_URL = "https://api.medical-terms-simplified.org/v1";

/**
 * Get the API key from local storage
 * @returns API key string or empty string if not found
 */
const getApiKey = (): string => {
  return localStorage.getItem("medicalTermsApiKey") || "";
};

/**
 * Simplify text by identifying medical terms through the API
 * @param text The medical text to simplify
 * @returns Simplified content with identified terms
 */
export const fetchSimplifiedText = async (text: string): Promise<ApiResponse> => {
  const apiKey = getApiKey();
  
  // If no API key is configured, return mock data
  if (!apiKey) {
    console.warn("API key not configured, using mock data");
    return getMockApiResponse(text);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/simplify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching simplified text:", error);
    // For now, we'll return mock data if the API fails
    return getMockApiResponse(text);
  }
};

/**
 * Process image to extract and simplify medical text
 * @param imageData Base64 encoded image data
 * @returns Simplified content with identified terms
 */
export const processImageForTerms = async (imageData: string): Promise<ApiResponse> => {
  const apiKey = getApiKey();
  
  // If no API key is configured, return mock data
  if (!apiKey) {
    console.warn("API key not configured, using mock data");
    return getMockImageApiResponse();
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/process-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({ image: imageData })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error processing image:", error);
    // Return mock data for image processing if API fails
    return getMockImageApiResponse();
  }
};

// Mock responses for fallback when API is unavailable or for testing
function getMockApiResponse(text: string): ApiResponse {
  // Use a regex to try to find medical terms in the user's text
  const medicalTermPatterns = [
    /\b(hypertension|high blood pressure)\b/gi,
    /\b(dyspnea|shortness of breath)\b/gi,
    /\b(tachycardia|rapid heart rate)\b/gi,
    /\b(diabetes mellitus|diabetes)\b/gi,
    /\b(myocardial infarction|heart attack)\b/gi,
    /\b(cerebrovascular accident|stroke)\b/gi,
  ];

  const terms: ApiTerm[] = [];
  let id = 1;

  medicalTermPatterns.forEach(pattern => {
    if (pattern.test(text)) {
      const [medical, simplified] = pattern.source.replace(/\\b|\(|\)|\|/g, '').split(/\|/);
      terms.push({
        id: `term-${id++}`,
        term: medical,
        simplified: simplified || medical,
        definition: `Medical term for ${simplified || medical}.`,
        wikiLink: `https://en.wikipedia.org/wiki/${medical.replace(/\s+/g, '_')}`
      });
    }
  });

  return {
    success: true,
    data: {
      terms,
      sourceText: text
    }
  };
}

function getMockImageApiResponse(): ApiResponse {
  return {
    success: true,
    data: {
      sourceText: "The patient presents with dyspnea, tachycardia, and bilateral lower extremity edema, consistent with congestive heart failure exacerbation.",
      terms: [
        {
          id: "term-1",
          term: "dyspnea",
          simplified: "difficulty breathing",
          definition: "Shortness of breath or breathing discomfort. It can range from mild to severe and may occur during rest or activity.",
          wikiLink: "https://en.wikipedia.org/wiki/Dyspnea"
        },
        {
          id: "term-2",
          term: "tachycardia",
          simplified: "fast heart rate",
          definition: "A heart rate that exceeds the normal resting rate, generally over 100 beats per minute in adults.",
          wikiLink: "https://en.wikipedia.org/wiki/Tachycardia"
        },
        {
          id: "term-3",
          term: "bilateral lower extremity edema",
          simplified: "swelling in both legs",
          definition: "Swelling caused by fluid accumulation in both legs or feet, often due to heart or kidney problems.",
          wikiLink: "https://en.wikipedia.org/wiki/Edema"
        },
        {
          id: "term-4",
          term: "congestive heart failure",
          simplified: "heart weakness causing fluid buildup",
          definition: "A chronic condition where the heart doesn't pump blood as well as it should, causing fluid to back up in the lungs and other body tissues.",
          wikiLink: "https://en.wikipedia.org/wiki/Heart_failure"
        },
        {
          id: "term-5",
          term: "exacerbation",
          simplified: "worsening",
          definition: "A worsening of a disease or its symptoms. It refers to an increase in the severity of a disease or its signs and symptoms.",
          wikiLink: "https://en.wikipedia.org/wiki/Exacerbation"
        }
      ]
    }
  };
}
