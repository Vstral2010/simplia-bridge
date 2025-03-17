
// Mock implementation for the text simplifier
// In a real implementation, this would connect to a backend API or ML model

interface Term {
  original: string;
  simplified: string;
  definition: string;
  context?: string;
}

interface SimplifiedContent {
  text: string;
  terms: Term[];
}

const mockMedicalTerms: Record<string, { simplified: string; definition: string }> = {
  "dyspnea": {
    simplified: "difficulty breathing",
    definition: "Shortness of breath or breathing discomfort. It can range from mild to severe and may occur during rest or activity."
  },
  "tachycardia": {
    simplified: "fast heart rate",
    definition: "A heart rate that exceeds the normal resting rate, generally over 100 beats per minute in adults."
  },
  "bilateral lower extremity edema": {
    simplified: "swelling in both legs",
    definition: "Swelling caused by fluid accumulation in both legs or feet, often due to heart or kidney problems."
  },
  "congestive heart failure": {
    simplified: "heart weakness causing fluid buildup",
    definition: "A chronic condition where the heart doesn't pump blood as well as it should, causing fluid to back up in the lungs and other body tissues."
  },
  "exacerbation": {
    simplified: "worsening",
    definition: "A worsening of a disease or its symptoms. It refers to an increase in the severity of a disease or its signs and symptoms."
  },
  "MRI": {
    simplified: "magnetic imaging scan",
    definition: "Magnetic Resonance Imaging: a medical imaging technique that uses a magnetic field and radio waves to create detailed images of organs and tissues."
  },
  "focal lesion": {
    simplified: "specific area of damage",
    definition: "A limited or restricted area of damage or abnormality within a tissue or organ."
  },
  "temporal lobe": {
    simplified: "side part of the brain",
    definition: "One of the four major lobes of the brain, located beneath the lateral fissure on both cerebral hemispheres, involved in processing sensory input to form memories, language comprehension, visual memories, and emotion."
  },
  "perilesional edema": {
    simplified: "swelling around damaged area",
    definition: "Swelling of tissues surrounding a lesion or injury, typically due to increased fluid in the affected area."
  },
  "neoplasm": {
    simplified: "tumor or growth",
    definition: "An abnormal mass of tissue that forms when cells grow and divide more than they should or do not die when they should. Neoplasms may be benign or malignant (cancerous)."
  },
  "biopsy": {
    simplified: "tissue sample test",
    definition: "A medical procedure in which a small sample of tissue is removed from the body to examine it more closely for disease or abnormality."
  },
  "histopathological": {
    simplified: "tissue study under microscope",
    definition: "Relating to the microscopic examination of tissue in order to study the manifestations of disease."
  },
  "chronic obstructive pulmonary disease": {
    simplified: "long-term lung disease",
    definition: "A chronic inflammatory lung disease that causes obstructed airflow from the lungs, typically including chronic bronchitis and emphysema."
  },
  "bronchodilators": {
    simplified: "medications that open airways",
    definition: "Medications that relax the muscles around the airways, making it easier to breathe by widening the bronchi."
  },
  "corticosteroids": {
    simplified: "anti-inflammatory medications",
    definition: "A class of steroid hormones used to reduce inflammation in the body and suppress the immune system."
  }
};

export const simplifyText = async (text: string): Promise<SimplifiedContent> => {
  // In a real implementation, this would send the text to an API
  // For this demo, we'll use a simple mock detection of medical terms
  
  return new Promise((resolve) => {
    // Simulate API processing time
    setTimeout(() => {
      const terms: Term[] = [];
      let processedText = text;
      
      // Look for known medical terms in the text
      Object.entries(mockMedicalTerms).forEach(([term, info]) => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        if (regex.test(text)) {
          terms.push({
            original: term,
            simplified: info.simplified,
            definition: info.definition
          });
        }
      });
      
      resolve({
        text: processedText,
        terms
      });
    }, 1500); // Mock 1.5 second processing time
  });
};

export const simplifyFromImage = async (imageData: string): Promise<SimplifiedContent> => {
  // In a real implementation, this would:
  // 1. Send the image to an OCR service to extract text
  // 2. Then send the extracted text to the medical simplification service
  
  return new Promise((resolve) => {
    // Simulate API processing time
    setTimeout(() => {
      // Mock extracted text from image - in reality this would come from OCR
      const extractedText = "The patient presents with dyspnea, tachycardia, and bilateral lower extremity edema, consistent with congestive heart failure exacerbation.";
      
      // Now process this text the same way as the text simplifier
      const terms: Term[] = [];
      
      // Look for known medical terms in the text
      Object.entries(mockMedicalTerms).forEach(([term, info]) => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        if (regex.test(extractedText)) {
          terms.push({
            original: term,
            simplified: info.simplified,
            definition: info.definition
          });
        }
      });
      
      resolve({
        text: extractedText,
        terms
      });
    }, 2000); // Mock 2 second processing time
  });
};
