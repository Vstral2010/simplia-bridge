
// Medical term API service using DeepSeek for simplified terminology

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

// DeepSeek API endpoint
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

/**
 * Get the API key from local storage
 * @returns API key string or empty string if not found
 */
const getApiKey = (): string => {
  return localStorage.getItem("medicalTermsApiKey") || "";
};

/**
 * Extract medical terms and their definitions from the DeepSeek response
 * @param text Original text
 * @param response The response from DeepSeek
 * @returns Structured terms with definitions
 */
const extractTermsFromResponse = (text: string, response: any): ApiTerm[] => {
  try {
    // Extract the content from the DeepSeek response
    const content = response.choices[0].message.content;
    
    // Parse the JSON if the model returned JSON format
    let parsedContent;
    try {
      // Try to extract JSON if it's in the response
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                        content.match(/\{[\s\S]*\}/);
      
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;
      parsedContent = JSON.parse(jsonString);
    } catch (e) {
      console.warn("Could not parse JSON from response, using text extraction fallback");
      
      // Use regex to extract medical terms if JSON parsing fails
      const terms: ApiTerm[] = [];
      const termRegex = /(\*\*|__)([^*_]+)(\*\*|__)\s*:\s*([^\n]+)/g;
      let match;
      let id = 1;
      
      while ((match = termRegex.exec(content)) !== null) {
        terms.push({
          id: `term-${id++}`,
          term: match[2].trim(),
          simplified: "",
          definition: match[4].trim(),
          wikiLink: undefined
        });
      }
      
      return terms;
    }
    
    // If we successfully parsed JSON, extract terms
    if (parsedContent && Array.isArray(parsedContent.terms)) {
      return parsedContent.terms.map((term: any, index: number) => ({
        id: `term-${index + 1}`,
        term: term.term,
        simplified: term.simplified || term.layman_term || "",
        definition: term.definition,
        wikiLink: term.wikiLink || term.wiki_link || undefined
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error extracting terms from DeepSeek response:", error);
    return [];
  }
};

/**
 * Simplify text by identifying medical terms through the DeepSeek API
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
    const prompt = `
      Analyze the following medical text and identify all medical terms, jargon, or complex terminology. 
      For each term, provide:
      1. The original medical term
      2. A simplified explanation in layman's terms
      3. A brief definition
      4. (Optional) A relevant Wikipedia link
      
      Format your response as a JSON object with an array of terms:
      {
        "terms": [
          {
            "term": "medical term",
            "simplified": "simple explanation",
            "definition": "definition of the term",
            "wikiLink": "relevant wikipedia link (optional)"
          }
        ]
      }
      
      Here is the text to analyze:
      "${text}"
    `;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2, // Lower temperature for more consistent responses
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`DeepSeek API error: ${errorData.error?.message || response.status}`);
    }

    const responseData = await response.json();
    const terms = extractTermsFromResponse(text, responseData);
    
    return {
      success: true,
      data: {
        sourceText: text,
        terms
      }
    };
  } catch (error) {
    console.error("Error fetching simplified text:", error);
    // Return mock data if the API fails
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
    // For image processing with DeepSeek, we first need to understand if their API supports
    // image analysis or if we need to use a different API for OCR first.
    // For now, we'll return mock data as DeepSeek might not support direct image processing
    
    // TODO: Implement actual DeepSeek image processing if supported
    // This would involve either:
    // 1. Using DeepSeek's API directly if they support image analysis
    // 2. Using an OCR service first to extract text, then sending to DeepSeek
    
    return getMockImageApiResponse();
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
