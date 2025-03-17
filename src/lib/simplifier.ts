
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
  // Respiratory
  "dyspnea": {
    simplified: "difficulty breathing",
    definition: "Shortness of breath or breathing discomfort. It can range from mild to severe and may occur during rest or activity."
  },
  "pneumonia": {
    simplified: "lung infection",
    definition: "Infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus causing cough, fever, and difficulty breathing."
  },
  "bronchitis": {
    simplified: "airway inflammation",
    definition: "Inflammation of the lining of the bronchial tubes, which carry air to and from the lungs, causing coughing and mucus production."
  },
  "asthma": {
    simplified: "breathing condition with narrowed airways",
    definition: "A condition that affects the airways of the lungs, causing periodic episodes of wheezing, shortness of breath, chest tightness, and coughing."
  },
  "pulmonary embolism": {
    simplified: "blood clot in lung",
    definition: "A blockage in one of the pulmonary arteries in the lungs, often caused by blood clots that travel from the legs or other parts of the body."
  },
  "chronic obstructive pulmonary disease": {
    simplified: "long-term lung disease",
    definition: "A chronic inflammatory lung disease that causes obstructed airflow from the lungs, typically including chronic bronchitis and emphysema."
  },
  "emphysema": {
    simplified: "damaged lung air sacs",
    definition: "A lung condition where the air sacs (alveoli) are damaged, leading to shortness of breath as the lungs struggle to get enough oxygen."
  },
  "bronchiolitis": {
    simplified: "small airway infection",
    definition: "An infection that affects the small breathing tubes (bronchioles) that lead to the lungs, causing inflammation and mucus buildup."
  },
  "pleurisy": {
    simplified: "inflamed lung lining",
    definition: "Inflammation of the tissues that line the lungs and chest cavity, causing sharp chest pain that worsens during breathing."
  },
  
  // Cardiovascular
  "tachycardia": {
    simplified: "fast heart rate",
    definition: "A heart rate that exceeds the normal resting rate, generally over 100 beats per minute in adults."
  },
  "bradycardia": {
    simplified: "slow heart rate",
    definition: "A slower than normal heart rate, typically less than 60 beats per minute in adults, which may cause insufficient blood flow."
  },
  "hypertension": {
    simplified: "high blood pressure",
    definition: "A condition where the force of blood against artery walls is too high, potentially leading to heart disease and other health problems."
  },
  "hypotension": {
    simplified: "low blood pressure",
    definition: "Blood pressure that is lower than normal, which may cause dizziness, fainting, and in severe cases, shock."
  },
  "myocardial infarction": {
    simplified: "heart attack",
    definition: "The death of heart muscle due to the sudden blockage of a coronary artery by a blood clot, cutting off blood supply."
  },
  "arrhythmia": {
    simplified: "irregular heartbeat",
    definition: "An abnormal rhythm of the heart, which may be too fast, too slow, or irregular, affecting how efficiently the heart works."
  },
  "angina pectoris": {
    simplified: "chest pain from poor heart blood flow",
    definition: "Chest pain or discomfort that occurs when heart muscle doesn't get enough oxygen-rich blood, often a symptom of coronary heart disease."
  },
  "congestive heart failure": {
    simplified: "heart weakness causing fluid buildup",
    definition: "A chronic condition where the heart doesn't pump blood as well as it should, causing fluid to back up in the lungs and other body tissues."
  },
  "atrial fibrillation": {
    simplified: "irregular heart rhythm",
    definition: "An irregular, often rapid heart rate that occurs when the two upper chambers of the heart (atria) beat out of coordination with the lower chambers."
  },
  "cardiac arrest": {
    simplified: "heart suddenly stops",
    definition: "A sudden loss of heart function, breathing, and consciousness, often due to an electrical disturbance in the heart."
  },
  "coronary artery disease": {
    simplified: "narrowed heart arteries",
    definition: "The most common type of heart disease, caused by buildup of plaque in the heart's arteries that can lead to heart attacks."
  },
  "atherosclerosis": {
    simplified: "artery hardening",
    definition: "The buildup of fats, cholesterol, and other substances in and on artery walls, leading to restricted blood flow."
  },
  "venous thrombosis": {
    simplified: "blood clot in vein",
    definition: "A blood clot that forms within a vein, most commonly in the legs, which can potentially break off and travel to the lungs."
  },
  "bilateral lower extremity edema": {
    simplified: "swelling in both legs",
    definition: "Swelling caused by fluid accumulation in both legs or feet, often due to heart or kidney problems."
  },
  
  // Neurological
  "cerebrovascular accident": {
    simplified: "stroke",
    definition: "Sudden interruption of blood supply to part of the brain, causing brain cells to die and potentially leading to brain damage."
  },
  "migraine": {
    simplified: "severe recurring headache",
    definition: "A headache disorder characterized by recurrent attacks of moderate to severe pain that is typically throbbing, often on one side of the head."
  },
  "epilepsy": {
    simplified: "seizure disorder",
    definition: "A central nervous system disorder in which brain activity becomes abnormal, causing seizures or periods of unusual behavior and sensations."
  },
  "parkinsonism": {
    simplified: "movement disorder with shaking",
    definition: "A group of neurological disorders that cause movement problems similar to those seen in Parkinson's disease, such as tremors and stiffness."
  },
  "alzheimer's disease": {
    simplified: "memory loss brain disease",
    definition: "A progressive brain disorder that slowly destroys memory and thinking skills, eventually affecting the ability to carry out simple tasks."
  },
  "multiple sclerosis": {
    simplified: "disease affecting nerves",
    definition: "A disease in which the immune system attacks the protective covering of nerves, disrupting communication between the brain and body."
  },
  "meningitis": {
    simplified: "brain and spinal cord lining infection",
    definition: "Inflammation of the membranes (meninges) surrounding the brain and spinal cord, usually due to infection."
  },
  "encephalitis": {
    simplified: "brain inflammation",
    definition: "Inflammation of the brain, typically caused by viral infection or autoimmune conditions, which can cause headaches, fevers, and seizures."
  },
  "dementia": {
    simplified: "decline in mental function",
    definition: "A general term for a decline in mental ability severe enough to interfere with daily life, affecting memory, thinking, and social abilities."
  },
  "cerebral palsy": {
    simplified: "brain disorder affecting movement",
    definition: "A group of disorders that affect movement, balance, and posture, caused by damage to the developing brain, often before birth."
  },
  "neuropathy": {
    simplified: "nerve damage",
    definition: "Damage to peripheral nerves that often causes weakness, numbness, pain, and coordination problems, particularly in the hands and feet."
  },
  "vertigo": {
    simplified: "spinning sensation",
    definition: "A sensation of spinning or dizziness, as if you or your surroundings are moving when they are not."
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
  
  // Gastrointestinal
  "gastroenteritis": {
    simplified: "stomach and intestinal inflammation",
    definition: "Inflammation of the lining of the stomach and intestines, typically resulting from a bacterial or viral infection."
  },
  "gastroesophageal reflux disease": {
    simplified: "acid reflux disease",
    definition: "A digestive disorder that affects the ring of muscle between the esophagus and stomach, causing stomach acid to flow back into the esophagus."
  },
  "peptic ulcer": {
    simplified: "stomach or small intestine sore",
    definition: "An open sore that develops on the inside lining of the stomach or the upper portion of the small intestine."
  },
  "colitis": {
    simplified: "inflamed colon",
    definition: "Inflammation of the inner lining of the colon (large intestine), causing abdominal pain, diarrhea, and sometimes bleeding."
  },
  "diverticulitis": {
    simplified: "inflamed colon pouches",
    definition: "Inflammation or infection in small pouches (diverticula) that can form in the digestive tract, most commonly in the colon."
  },
  "cirrhosis": {
    simplified: "scarred liver",
    definition: "Late stage of scarring (fibrosis) of the liver caused by many forms of liver diseases and conditions, such as hepatitis and chronic alcoholism."
  },
  "cholecystitis": {
    simplified: "gallbladder inflammation",
    definition: "Inflammation of the gallbladder, typically caused by gallstones blocking the tube leading out of the gallbladder."
  },
  "pancreatitis": {
    simplified: "pancreas inflammation",
    definition: "Inflammation of the pancreas that occurs when digestive enzymes begin attacking the pancreas itself, causing pain and digestive issues."
  },
  "irritable bowel syndrome": {
    simplified: "sensitive bowel condition",
    definition: "A common disorder affecting the large intestine, causing cramping, abdominal pain, bloating, gas, diarrhea and constipation."
  },
  "celiac disease": {
    simplified: "gluten intolerance condition",
    definition: "An immune reaction to eating gluten, a protein found in wheat, barley, and rye, which damages the small intestine's lining."
  },
  
  // Endocrine
  "diabetes mellitus": {
    simplified: "high blood sugar disease",
    definition: "A group of diseases that result in too much sugar in the blood (high blood glucose), due to insufficient insulin production or response."
  },
  "hypothyroidism": {
    simplified: "underactive thyroid",
    definition: "A condition in which the thyroid gland doesn't produce enough thyroid hormone, leading to fatigue, cold sensitivity, and weight gain."
  },
  "hyperthyroidism": {
    simplified: "overactive thyroid",
    definition: "A condition in which the thyroid gland produces too much thyroid hormone, accelerating the body's metabolism and causing weight loss."
  },
  "adrenal insufficiency": {
    simplified: "adrenal gland hormone deficiency",
    definition: "A disorder in which the adrenal glands don't produce enough hormones, causing weakness, fatigue, and low blood pressure."
  },
  "cushing's syndrome": {
    simplified: "high cortisol disorder",
    definition: "A condition caused by too much cortisol in the body, often due to taking cortisol-like medications or problems with the adrenal glands."
  },
  
  // Musculoskeletal
  "osteoarthritis": {
    simplified: "joint wear-and-tear disease",
    definition: "A type of arthritis that occurs when the protective cartilage that cushions the ends of bones wears down over time."
  },
  "rheumatoid arthritis": {
    simplified: "immune system attacks joints",
    definition: "An autoimmune disorder that primarily affects joints, causing pain, swelling, and sometimes joint deformity."
  },
  "osteoporosis": {
    simplified: "brittle bone disease",
    definition: "A condition where bones become weak and brittle, making them more prone to fractures, often due to decreased bone density."
  },
  "fibromyalgia": {
    simplified: "chronic pain condition",
    definition: "A disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, memory and mood issues."
  },
  "gout": {
    simplified: "painful joint inflammation from crystals",
    definition: "A form of arthritis characterized by sudden, severe attacks of pain, redness and tenderness in joints, often at the base of the big toe."
  },
  "herniated disc": {
    simplified: "slipped spinal disc",
    definition: "A condition where a disc between the vertebrae ruptures and the inner gel-like material leaks out, potentially causing nerve pain."
  },
  "scoliosis": {
    simplified: "curved spine",
    definition: "A sideways curvature of the spine that most often occurs during the growth spurt just before puberty."
  },
  
  // Dermatological
  "dermatitis": {
    simplified: "skin inflammation",
    definition: "Inflammation of the skin characterized by itchy, red, swollen, and sore skin, sometimes with small blisters."
  },
  "psoriasis": {
    simplified: "rapid skin cell growth",
    definition: "A skin disorder that causes skin cells to multiply up to 10 times faster than normal, resulting in red, itchy, scaly patches."
  },
  "eczema": {
    simplified: "itchy, inflamed skin",
    definition: "A condition that makes the skin red, itchy, and inflamed, often appearing on the arms and behind the knees."
  },
  "cellulitis": {
    simplified: "skin infection",
    definition: "A common bacterial skin infection that causes redness, swelling, and pain in the affected area of the skin."
  },
  "melanoma": {
    simplified: "serious skin cancer",
    definition: "The most serious type of skin cancer, developing in the cells (melanocytes) that produce melanin, the pigment that gives skin its color."
  },
  
  // Respiratory & Medications
  "bronchodilators": {
    simplified: "medications that open airways",
    definition: "Medications that relax the muscles around the airways, making it easier to breathe by widening the bronchi."
  },
  "corticosteroids": {
    simplified: "anti-inflammatory medications",
    definition: "A class of steroid hormones used to reduce inflammation in the body and suppress the immune system."
  },
  
  // General Medical Terms
  "exacerbation": {
    simplified: "worsening",
    definition: "A worsening of a disease or its symptoms. It refers to an increase in the severity of a disease or its signs and symptoms."
  },
  "MRI": {
    simplified: "magnetic imaging scan",
    definition: "Magnetic Resonance Imaging: a medical imaging technique that uses a magnetic field and radio waves to create detailed images of organs and tissues."
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
  "edema": {
    simplified: "fluid buildup causing swelling",
    definition: "An abnormal accumulation of fluid in the body's tissues, causing swelling."
  },
  "hyperglycemia": {
    simplified: "high blood sugar",
    definition: "An abnormally high concentration of glucose in the blood, typically associated with diabetes."
  },
  "hypoglycemia": {
    simplified: "low blood sugar",
    definition: "An abnormally low level of blood sugar (glucose) that can cause symptoms such as anxiety, sweating, and heart palpitations."
  },
  "anaphylaxis": {
    simplified: "severe allergic reaction",
    definition: "A severe, potentially life-threatening allergic reaction that can occur within seconds or minutes of exposure to an allergen."
  },
  "cyanosis": {
    simplified: "bluish skin from poor oxygen",
    definition: "A bluish discoloration of the skin and mucous membranes due to low oxygen levels in the blood."
  },
  "sepsis": {
    simplified: "severe infection response",
    definition: "A potentially life-threatening condition caused by the body's response to an infection that triggers widespread inflammation."
  },
  "malaise": {
    simplified: "general discomfort or unease",
    definition: "A general feeling of discomfort, illness, or unease whose exact cause is difficult to identify."
  },
  "anemia": {
    simplified: "low red blood cell count",
    definition: "A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues."
  },
  "hypoxia": {
    simplified: "low oxygen levels",
    definition: "A condition in which the body or a region of the body is deprived of adequate oxygen supply at the tissue level."
  },
  "metastasis": {
    simplified: "cancer spread",
    definition: "The spread of cancer cells from the place where they first formed to another part of the body."
  },
  "cachexia": {
    simplified: "severe weight loss and muscle wasting",
    definition: "A complex metabolic syndrome associated with underlying illness and characterized by loss of muscle with or without loss of fat mass."
  },
  "anorexia": {
    simplified: "loss of appetite",
    definition: "A decreased appetite or desire to eat, which can be a symptom of various disorders or conditions."
  },
  "pyrexia": {
    simplified: "fever",
    definition: "An abnormal elevation of body temperature, usually as a result of a disease or illness."
  },
  "syncope": {
    simplified: "fainting",
    definition: "A temporary loss of consciousness caused by a fall in blood pressure, typically resulting from an inadequate flow of blood to the brain."
  },
  "dysphagia": {
    simplified: "difficulty swallowing",
    definition: "Difficulty or discomfort in swallowing, which may be a symptom of various head, neck, or esophageal disorders."
  },
  "dysarthria": {
    simplified: "unclear speech due to muscle problems",
    definition: "A motor speech disorder resulting from impaired movement of the muscles used for speech production, often due to neurological damage."
  },
  "prognosis": {
    simplified: "likely outcome",
    definition: "The likely course of a disease or ailment; a prediction of the outcome or progression of a medical condition."
  },
  "remission": {
    simplified: "decrease or disappearance of symptoms",
    definition: "A period during which the symptoms of a disease are absent or significantly reduced."
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
