
// Updated implementation with expanded medical terms dictionary
// Provides simplified definitions and Wikipedia links

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

const mockMedicalTerms: Record<string, { simplified: string; definition: string; wikiLink?: string }> = {
  // COMMON CONDITIONS - RESPIRATORY
  "covid-19": {
    simplified: "coronavirus disease",
    definition: "An infectious disease caused by the SARS-CoV-2 virus, primarily affecting the respiratory system.",
    wikiLink: "https://en.wikipedia.org/wiki/COVID-19"
  },
  "pneumonia": {
    simplified: "lung infection",
    definition: "Infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus causing cough, fever, and difficulty breathing.",
    wikiLink: "https://en.wikipedia.org/wiki/Pneumonia"
  },
  "asthma": {
    simplified: "chronic lung condition with narrowed airways",
    definition: "A condition that affects the airways, causing periodic episodes of wheezing, shortness of breath, chest tightness, and coughing.",
    wikiLink: "https://en.wikipedia.org/wiki/Asthma"
  },
  "chronic obstructive pulmonary disease": {
    simplified: "long-term lung disease",
    definition: "A chronic inflammatory lung disease that causes obstructed airflow from the lungs, typically including chronic bronchitis and emphysema.",
    wikiLink: "https://en.wikipedia.org/wiki/Chronic_obstructive_pulmonary_disease"
  },
  "bronchitis": {
    simplified: "inflammation of the airways",
    definition: "Inflammation of the lining of the bronchial tubes, which carry air to and from the lungs, causing coughing and mucus production.",
    wikiLink: "https://en.wikipedia.org/wiki/Bronchitis"
  },
  "influenza": {
    simplified: "the flu",
    definition: "A highly contagious viral infection that attacks the respiratory system, causing fever, body aches, and general weakness.",
    wikiLink: "https://en.wikipedia.org/wiki/Influenza"
  },
  
  // COMMON CONDITIONS - CARDIOVASCULAR
  "hypertension": {
    simplified: "high blood pressure",
    definition: "A condition where the force of blood against artery walls is too high, potentially leading to heart disease and other health problems.",
    wikiLink: "https://en.wikipedia.org/wiki/Hypertension"
  },
  "heart attack": {
    simplified: "cardiac arrest",
    definition: "Occurs when blood flow to a part of the heart is blocked, usually by a blood clot, causing damage to the heart muscle.",
    wikiLink: "https://en.wikipedia.org/wiki/Myocardial_infarction"
  },
  "myocardial infarction": {
    simplified: "heart attack",
    definition: "The death of heart muscle due to the sudden blockage of a coronary artery by a blood clot, cutting off blood supply.",
    wikiLink: "https://en.wikipedia.org/wiki/Myocardial_infarction"
  },
  "stroke": {
    simplified: "brain attack",
    definition: "Occurs when blood flow to an area of the brain is cut off, causing brain cells to die from lack of oxygen.",
    wikiLink: "https://en.wikipedia.org/wiki/Stroke"
  },
  "coronary artery disease": {
    simplified: "narrowed heart arteries",
    definition: "The most common type of heart disease, caused by buildup of plaque in the heart's arteries that can lead to heart attacks.",
    wikiLink: "https://en.wikipedia.org/wiki/Coronary_artery_disease"
  },
  "atrial fibrillation": {
    simplified: "irregular heart rhythm",
    definition: "An irregular, often rapid heart rate that occurs when the two upper chambers of the heart beat out of coordination with the lower chambers.",
    wikiLink: "https://en.wikipedia.org/wiki/Atrial_fibrillation"
  },
  "congestive heart failure": {
    simplified: "heart weakness causing fluid buildup",
    definition: "A chronic condition where the heart doesn't pump blood as well as it should, causing fluid to back up in the lungs and other body tissues.",
    wikiLink: "https://en.wikipedia.org/wiki/Heart_failure"
  },
  
  // COMMON CONDITIONS - METABOLIC
  "diabetes mellitus": {
    simplified: "high blood sugar disease",
    definition: "A group of diseases that result in too much sugar in the blood (high blood glucose), due to insufficient insulin production or response.",
    wikiLink: "https://en.wikipedia.org/wiki/Diabetes_mellitus"
  },
  "type 1 diabetes": {
    simplified: "insulin-dependent diabetes",
    definition: "A chronic condition in which the pancreas produces little or no insulin, requiring daily insulin administration.",
    wikiLink: "https://en.wikipedia.org/wiki/Type_1_diabetes"
  },
  "type 2 diabetes": {
    simplified: "adult-onset diabetes",
    definition: "A chronic condition affecting the way the body processes blood sugar, where the body becomes resistant to insulin or doesn't produce enough.",
    wikiLink: "https://en.wikipedia.org/wiki/Type_2_diabetes"
  },
  "hypothyroidism": {
    simplified: "underactive thyroid",
    definition: "A condition in which the thyroid gland doesn't produce enough thyroid hormone, leading to fatigue, cold sensitivity, and weight gain.",
    wikiLink: "https://en.wikipedia.org/wiki/Hypothyroidism"
  },
  "hyperthyroidism": {
    simplified: "overactive thyroid",
    definition: "A condition in which the thyroid gland produces too much thyroid hormone, accelerating the body's metabolism and causing weight loss.",
    wikiLink: "https://en.wikipedia.org/wiki/Hyperthyroidism"
  },
  "obesity": {
    simplified: "excessive body fat",
    definition: "A complex disease involving an excessive amount of body fat that increases the risk of other health problems.",
    wikiLink: "https://en.wikipedia.org/wiki/Obesity"
  },
  
  // COMMON CONDITIONS - MENTAL HEALTH
  "depression": {
    simplified: "major depressive disorder",
    definition: "A mood disorder that causes a persistent feeling of sadness and loss of interest, affecting how you feel, think and behave.",
    wikiLink: "https://en.wikipedia.org/wiki/Major_depressive_disorder"
  },
  "anxiety disorder": {
    simplified: "excessive worry or fear",
    definition: "A mental health disorder characterized by feelings of worry, anxiety, or fear that are strong enough to interfere with daily activities.",
    wikiLink: "https://en.wikipedia.org/wiki/Anxiety_disorder"
  },
  "bipolar disorder": {
    simplified: "manic-depressive illness",
    definition: "A mental health condition that causes extreme mood swings that include emotional highs (mania) and lows (depression).",
    wikiLink: "https://en.wikipedia.org/wiki/Bipolar_disorder"
  },
  "schizophrenia": {
    simplified: "chronic brain disorder",
    definition: "A severe mental disorder in which people interpret reality abnormally, experiencing hallucinations, delusions, and disordered thinking.",
    wikiLink: "https://en.wikipedia.org/wiki/Schizophrenia"
  },
  "post-traumatic stress disorder": {
    simplified: "PTSD",
    definition: "A mental health condition triggered by experiencing or witnessing a terrifying event, causing flashbacks, nightmares and severe anxiety.",
    wikiLink: "https://en.wikipedia.org/wiki/Post-traumatic_stress_disorder"
  },
  
  // COMMON CONDITIONS - GASTROINTESTINAL
  "gastroesophageal reflux disease": {
    simplified: "acid reflux disease",
    definition: "A digestive disorder that affects the ring of muscle between the esophagus and stomach, causing stomach acid to flow back into the esophagus.",
    wikiLink: "https://en.wikipedia.org/wiki/Gastroesophageal_reflux_disease"
  },
  "peptic ulcer": {
    simplified: "stomach or small intestine sore",
    definition: "An open sore that develops on the inside lining of the stomach or the upper portion of the small intestine.",
    wikiLink: "https://en.wikipedia.org/wiki/Peptic_ulcer"
  },
  "irritable bowel syndrome": {
    simplified: "IBS",
    definition: "A common disorder affecting the large intestine, causing cramping, abdominal pain, bloating, gas, diarrhea and constipation.",
    wikiLink: "https://en.wikipedia.org/wiki/Irritable_bowel_syndrome"
  },
  "crohn's disease": {
    simplified: "inflammatory bowel disease",
    definition: "A chronic inflammatory bowel disease that affects the lining of the digestive tract, causing abdominal pain, severe diarrhea, and malnutrition.",
    wikiLink: "https://en.wikipedia.org/wiki/Crohn%27s_disease"
  },
  "ulcerative colitis": {
    simplified: "inflammatory bowel disease with ulcers",
    definition: "A chronic inflammatory bowel disease that causes inflammation and ulcers in the digestive tract, primarily affecting the colon and rectum.",
    wikiLink: "https://en.wikipedia.org/wiki/Ulcerative_colitis"
  },
  
  // COMMON CONDITIONS - MUSCULOSKELETAL
  "osteoarthritis": {
    simplified: "joint wear-and-tear disease",
    definition: "A type of arthritis that occurs when the protective cartilage that cushions the ends of bones wears down over time.",
    wikiLink: "https://en.wikipedia.org/wiki/Osteoarthritis"
  },
  "rheumatoid arthritis": {
    simplified: "autoimmune joint disease",
    definition: "An autoimmune disorder that primarily affects joints, causing pain, swelling, and sometimes joint deformity.",
    wikiLink: "https://en.wikipedia.org/wiki/Rheumatoid_arthritis"
  },
  "osteoporosis": {
    simplified: "brittle bone disease",
    definition: "A condition where bones become weak and brittle, making them more prone to fractures, often due to decreased bone density.",
    wikiLink: "https://en.wikipedia.org/wiki/Osteoporosis"
  },
  "fibromyalgia": {
    simplified: "chronic pain condition",
    definition: "A disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, memory and mood issues.",
    wikiLink: "https://en.wikipedia.org/wiki/Fibromyalgia"
  },
  "gout": {
    simplified: "painful joint inflammation from crystals",
    definition: "A form of arthritis characterized by sudden, severe attacks of pain, redness and tenderness in joints, often at the base of the big toe.",
    wikiLink: "https://en.wikipedia.org/wiki/Gout"
  },
  
  // COMMON CONDITIONS - NEUROLOGICAL
  "alzheimer's disease": {
    simplified: "memory loss brain disease",
    definition: "A progressive brain disorder that slowly destroys memory and thinking skills, eventually affecting the ability to carry out simple tasks.",
    wikiLink: "https://en.wikipedia.org/wiki/Alzheimer%27s_disease"
  },
  "parkinson's disease": {
    simplified: "progressive movement disorder",
    definition: "A progressive nervous system disorder that affects movement, causing tremors, stiffness, and difficulty with balance and coordination.",
    wikiLink: "https://en.wikipedia.org/wiki/Parkinson%27s_disease"
  },
  "multiple sclerosis": {
    simplified: "MS",
    definition: "A disease in which the immune system attacks the protective covering of nerves, disrupting communication between the brain and body.",
    wikiLink: "https://en.wikipedia.org/wiki/Multiple_sclerosis"
  },
  "epilepsy": {
    simplified: "seizure disorder",
    definition: "A central nervous system disorder in which brain activity becomes abnormal, causing seizures or periods of unusual behavior and sensations.",
    wikiLink: "https://en.wikipedia.org/wiki/Epilepsy"
  },
  "migraine": {
    simplified: "severe recurring headache",
    definition: "A headache disorder characterized by recurrent attacks of moderate to severe pain that is typically throbbing, often on one side of the head.",
    wikiLink: "https://en.wikipedia.org/wiki/Migraine"
  },
  
  // COMMON CONDITIONS - INFECTIOUS DISEASES
  "hiv": {
    simplified: "human immunodeficiency virus",
    definition: "A virus that attacks the body's immune system, specifically CD4 cells, weakening a person's defenses against infections and disease.",
    wikiLink: "https://en.wikipedia.org/wiki/HIV"
  },
  "aids": {
    simplified: "acquired immunodeficiency syndrome",
    definition: "The late stage of HIV infection that occurs when the body's immune system is badly damaged by the virus.",
    wikiLink: "https://en.wikipedia.org/wiki/HIV/AIDS"
  },
  "tuberculosis": {
    simplified: "TB",
    definition: "An infectious disease that mainly affects the lungs, caused by bacteria that spread through the air from person to person.",
    wikiLink: "https://en.wikipedia.org/wiki/Tuberculosis"
  },
  "hepatitis": {
    simplified: "liver inflammation",
    definition: "Inflammation of the liver, commonly caused by a viral infection, but sometimes due to other causes such as autoimmune response or medications.",
    wikiLink: "https://en.wikipedia.org/wiki/Hepatitis"
  },
  "hepatitis a": {
    simplified: "liver inflammation from HAV",
    definition: "A highly contagious liver infection caused by the hepatitis A virus, transmitted through food, water, or close contact.",
    wikiLink: "https://en.wikipedia.org/wiki/Hepatitis_A"
  },
  "hepatitis b": {
    simplified: "liver inflammation from HBV",
    definition: "A serious liver infection caused by the hepatitis B virus, which can become chronic and lead to liver failure, cancer, or cirrhosis.",
    wikiLink: "https://en.wikipedia.org/wiki/Hepatitis_B"
  },
  "hepatitis c": {
    simplified: "liver inflammation from HCV",
    definition: "A viral infection that causes liver inflammation, sometimes leading to serious liver damage, transmitted via contaminated blood.",
    wikiLink: "https://en.wikipedia.org/wiki/Hepatitis_C"
  },
  "malaria": {
    simplified: "mosquito-borne disease",
    definition: "A serious disease caused by a parasite, transmitted via infected mosquitoes, causing high fevers, shaking chills, and flu-like symptoms.",
    wikiLink: "https://en.wikipedia.org/wiki/Malaria"
  },
  
  // COMMON SYMPTOMS
  "fever": {
    simplified: "high body temperature",
    definition: "A temporary increase in body temperature, often due to an illness, typically indicated as temperature above 100.4°F (38°C).",
    wikiLink: "https://en.wikipedia.org/wiki/Fever"
  },
  "dyspnea": {
    simplified: "difficulty breathing",
    definition: "Shortness of breath or breathing discomfort. It can range from mild to severe and may occur during rest or activity.",
    wikiLink: "https://en.wikipedia.org/wiki/Dyspnea"
  },
  "tachycardia": {
    simplified: "fast heart rate",
    definition: "A heart rate that exceeds the normal resting rate, generally over 100 beats per minute in adults.",
    wikiLink: "https://en.wikipedia.org/wiki/Tachycardia"
  },
  "bradycardia": {
    simplified: "slow heart rate",
    definition: "A slower than normal heart rate, typically less than 60 beats per minute in adults, which may cause insufficient blood flow.",
    wikiLink: "https://en.wikipedia.org/wiki/Bradycardia"
  },
  "cough": {
    simplified: "forceful air expulsion",
    definition: "A sudden, often repetitive, spasmodic contraction of the thoracic cavity, resulting in air being expelled from the lungs.",
    wikiLink: "https://en.wikipedia.org/wiki/Cough"
  },
  "nausea": {
    simplified: "feeling sick to stomach",
    definition: "A sensation of unease and discomfort in the upper stomach, with an involuntary urge to vomit.",
    wikiLink: "https://en.wikipedia.org/wiki/Nausea"
  },
  "vomiting": {
    simplified: "throwing up",
    definition: "The forceful expulsion of stomach contents through the mouth, often due to irritation of the stomach by infection or other stimuli.",
    wikiLink: "https://en.wikipedia.org/wiki/Vomiting"
  },
  "fatigue": {
    simplified: "extreme tiredness",
    definition: "Extreme tiredness resulting from physical or mental exertion or illness, not relieved by rest.",
    wikiLink: "https://en.wikipedia.org/wiki/Fatigue"
  },
  "pain": {
    simplified: "physical suffering",
    definition: "An unpleasant sensory and emotional experience associated with actual or potential tissue damage.",
    wikiLink: "https://en.wikipedia.org/wiki/Pain"
  },
  "syncope": {
    simplified: "fainting",
    definition: "A temporary loss of consciousness caused by a fall in blood pressure, typically resulting from an inadequate flow of blood to the brain.",
    wikiLink: "https://en.wikipedia.org/wiki/Syncope_(medicine)"
  },
  "dizziness": {
    simplified: "feeling unsteady",
    definition: "A range of sensations including feeling faint, woozy, weak or unsteady, often associated with balance disorders.",
    wikiLink: "https://en.wikipedia.org/wiki/Dizziness"
  },
  "vertigo": {
    simplified: "spinning sensation",
    definition: "A sensation of spinning or dizziness, as if you or your surroundings are moving when they are not.",
    wikiLink: "https://en.wikipedia.org/wiki/Vertigo"
  },
  "headache": {
    simplified: "head pain",
    definition: "Pain in any region of the head, may be a symptom of a number of different conditions of the head and neck.",
    wikiLink: "https://en.wikipedia.org/wiki/Headache"
  },
  "rash": {
    simplified: "skin outbreak",
    definition: "A change of the skin which affects its color, appearance, or texture, often associated with allergies or infections.",
    wikiLink: "https://en.wikipedia.org/wiki/Rash"
  },
  "edema": {
    simplified: "swelling from fluid",
    definition: "An abnormal accumulation of fluid in the body's tissues, causing swelling.",
    wikiLink: "https://en.wikipedia.org/wiki/Edema"
  },
  "bilateral lower extremity edema": {
    simplified: "swelling in both legs",
    definition: "Swelling caused by fluid accumulation in both legs or feet, often due to heart or kidney problems.",
    wikiLink: "https://en.wikipedia.org/wiki/Edema"
  },
  
  // DIAGNOSTIC TERMS
  "mri": {
    simplified: "magnetic imaging scan",
    definition: "Magnetic Resonance Imaging: a medical imaging technique that uses a magnetic field and radio waves to create detailed images of organs and tissues.",
    wikiLink: "https://en.wikipedia.org/wiki/Magnetic_resonance_imaging"
  },
  "ct scan": {
    simplified: "computerized x-ray imaging",
    definition: "Computed Tomography scan that combines a series of X-ray images taken from different angles to create cross-sectional images.",
    wikiLink: "https://en.wikipedia.org/wiki/CT_scan"
  },
  "ecg": {
    simplified: "heart rhythm test",
    definition: "Electrocardiogram: a test that records the electrical activity of the heart over a period of time.",
    wikiLink: "https://en.wikipedia.org/wiki/Electrocardiography"
  },
  "ekg": {
    simplified: "heart rhythm test",
    definition: "Electrocardiogram: a test that records the electrical activity of the heart over a period of time.",
    wikiLink: "https://en.wikipedia.org/wiki/Electrocardiography"
  },
  "eeg": {
    simplified: "brain wave test",
    definition: "Electroencephalogram: a test that detects electrical activity in the brain using electrodes attached to the scalp.",
    wikiLink: "https://en.wikipedia.org/wiki/Electroencephalography"
  },
  "ultrasound": {
    simplified: "sound wave imaging",
    definition: "A diagnostic imaging technique based on the application of ultrasound to visualize internal organs and structures.",
    wikiLink: "https://en.wikipedia.org/wiki/Medical_ultrasound"
  },
  "biopsy": {
    simplified: "tissue sample test",
    definition: "A medical procedure in which a small sample of tissue is removed from the body to examine it more closely for disease or abnormality.",
    wikiLink: "https://en.wikipedia.org/wiki/Biopsy"
  },
  "x-ray": {
    simplified: "radiation imaging",
    definition: "A type of radiation that can pass through the body to produce images of internal structures.",
    wikiLink: "https://en.wikipedia.org/wiki/X-ray"
  },
  "blood test": {
    simplified: "blood analysis",
    definition: "A laboratory analysis performed on a blood sample to determine physiological and biochemical states.",
    wikiLink: "https://en.wikipedia.org/wiki/Blood_test"
  },
  
  // TREATMENT TERMS
  "chemotherapy": {
    simplified: "cancer drug treatment",
    definition: "A type of cancer treatment that uses drugs to kill cancer cells by stopping or slowing their growth.",
    wikiLink: "https://en.wikipedia.org/wiki/Chemotherapy"
  },
  "radiation therapy": {
    simplified: "cancer radiation treatment",
    definition: "A cancer treatment that uses high doses of radiation to kill cancer cells and shrink tumors.",
    wikiLink: "https://en.wikipedia.org/wiki/Radiation_therapy"
  },
  "dialysis": {
    simplified: "artificial kidney filtering",
    definition: "A treatment for kidney failure that removes waste products and excess fluid from the blood when the kidneys stop working properly.",
    wikiLink: "https://en.wikipedia.org/wiki/Dialysis"
  },
  "surgery": {
    simplified: "operation",
    definition: "A medical procedure involving an incision with instruments to investigate or treat a pathological condition.",
    wikiLink: "https://en.wikipedia.org/wiki/Surgery"
  },
  "transplantation": {
    simplified: "organ or tissue transfer",
    definition: "The transfer of cells, tissues, or organs from one site to another, or from one individual to another.",
    wikiLink: "https://en.wikipedia.org/wiki/Organ_transplantation"
  },
  "physical therapy": {
    simplified: "exercise-based treatment",
    definition: "Treatment that aims to ease pain and help you function, move, and live better through exercise, manual therapy, and education.",
    wikiLink: "https://en.wikipedia.org/wiki/Physical_therapy"
  },
  "bronchodilators": {
    simplified: "medications that open airways",
    definition: "Medications that relax the muscles around the airways, making it easier to breathe by widening the bronchi.",
    wikiLink: "https://en.wikipedia.org/wiki/Bronchodilator"
  },
  "corticosteroids": {
    simplified: "anti-inflammatory medications",
    definition: "A class of steroid hormones used to reduce inflammation in the body and suppress the immune system.",
    wikiLink: "https://en.wikipedia.org/wiki/Corticosteroid"
  },
  "antibiotics": {
    simplified: "medications that kill bacteria",
    definition: "Medications used to treat bacterial infections by killing or inhibiting the growth of bacteria.",
    wikiLink: "https://en.wikipedia.org/wiki/Antibiotic"
  },
  "antivirals": {
    simplified: "medications that fight viruses",
    definition: "Medications used to treat viral infections, working by inhibiting virus replication.",
    wikiLink: "https://en.wikipedia.org/wiki/Antiviral_drug"
  },
  
  // ADDITIONAL MEDICAL TERMS
  "hypertrophy": {
    simplified: "enlarged tissues or organs",
    definition: "The enlargement or overgrowth of an organ or tissue because of increased size of its cells, often due to chronic stress.",
    wikiLink: "https://en.wikipedia.org/wiki/Hypertrophy"
  },
  "atrophy": {
    simplified: "wasting away of tissues",
    definition: "The partial or complete wasting away of a part of the body, often from lack of use, disease, or injury.",
    wikiLink: "https://en.wikipedia.org/wiki/Atrophy"
  },
  "ischemia": {
    simplified: "restricted blood supply",
    definition: "Insufficient blood supply to an organ or part of the body, especially the heart muscles.",
    wikiLink: "https://en.wikipedia.org/wiki/Ischemia"
  },
  "embolism": {
    simplified: "blocked blood vessel",
    definition: "The obstruction of a blood vessel by a foreign substance or a blood clot that travels through the bloodstream.",
    wikiLink: "https://en.wikipedia.org/wiki/Embolism"
  },
  "thrombosis": {
    simplified: "blood clot in a vessel",
    definition: "The formation of a blood clot inside a blood vessel, obstructing the flow of blood through the circulatory system.",
    wikiLink: "https://en.wikipedia.org/wiki/Thrombosis"
  },
  "neoplasm": {
    simplified: "tumor or growth",
    definition: "An abnormal mass of tissue that forms when cells grow and divide more than they should or do not die when they should. Neoplasms may be benign or malignant (cancerous).",
    wikiLink: "https://en.wikipedia.org/wiki/Neoplasm"
  },
  "metastasis": {
    simplified: "cancer spread",
    definition: "The spread of cancer cells from the place where they first formed to another part of the body.",
    wikiLink: "https://en.wikipedia.org/wiki/Metastasis"
  },
  "hypoxia": {
    simplified: "low oxygen levels",
    definition: "A condition in which the body or a region of the body is deprived of adequate oxygen supply at the tissue level.",
    wikiLink: "https://en.wikipedia.org/wiki/Hypoxia_(medical)"
  },
  "anoxia": {
    simplified: "complete lack of oxygen",
    definition: "An extreme form of hypoxia where there is a complete deprivation of oxygen supply to tissues.",
    wikiLink: "https://en.wikipedia.org/wiki/Hypoxia_(medical)"
  },
  "sepsis": {
    simplified: "severe infection response",
    definition: "A potentially life-threatening condition caused by the body's response to an infection that triggers widespread inflammation.",
    wikiLink: "https://en.wikipedia.org/wiki/Sepsis"
  },
  "remission": {
    simplified: "decrease or disappearance of symptoms",
    definition: "A period during which the symptoms of a disease are absent or significantly reduced.",
    wikiLink: "https://en.wikipedia.org/wiki/Remission_(medicine)"
  },
  "relapse": {
    simplified: "return of disease",
    definition: "The return of a disease or symptoms after a period of improvement or remission.",
    wikiLink: "https://en.wikipedia.org/wiki/Relapse"
  },
  "prognosis": {
    simplified: "likely outcome",
    definition: "The likely course of a disease or ailment; a prediction of the outcome or progression of a medical condition.",
    wikiLink: "https://en.wikipedia.org/wiki/Prognosis"
  },
  "diagnosis": {
    simplified: "identification of illness",
    definition: "The identification of the nature and cause of an illness or problem by examination of the symptoms.",
    wikiLink: "https://en.wikipedia.org/wiki/Diagnosis"
  },
  "acute": {
    simplified: "sudden onset",
    definition: "Having a rapid onset, severe symptoms, and a short course (not chronic). Requiring immediate attention.",
    wikiLink: "https://en.wikipedia.org/wiki/Acute_(medicine)"
  },
  "chronic": {
    simplified: "long-lasting",
    definition: "Persisting for a long time or constantly recurring, usually used to describe a persistent and lasting medical condition.",
    wikiLink: "https://en.wikipedia.org/wiki/Chronic_condition"
  },
  "terminal": {
    simplified: "end-stage",
    definition: "Relating to or occurring in the final stages of a fatal disease, expected to lead to death.",
    wikiLink: "https://en.wikipedia.org/wiki/Terminal_illness"
  },
  "idiopathic": {
    simplified: "unknown cause",
    definition: "Relating to a disease or condition that arises spontaneously or for which the cause is unknown.",
    wikiLink: "https://en.wikipedia.org/wiki/Idiopathic"
  },
  "iatrogenic": {
    simplified: "caused by medical treatment",
    definition: "Relating to illness or injury caused by medical examination or treatment.",
    wikiLink: "https://en.wikipedia.org/wiki/Iatrogenesis"
  },
  "congenital": {
    simplified: "present from birth",
    definition: "A condition that is present at birth, whether inherited or caused by environmental factors.",
    wikiLink: "https://en.wikipedia.org/wiki/Congenital_disorder"
  },
  "hereditary": {
    simplified: "genetically inherited",
    definition: "A condition or trait that is transmitted from parent to offspring through genes.",
    wikiLink: "https://en.wikipedia.org/wiki/Heredity"
  },
  "focal lesion": {
    simplified: "specific area of damage",
    definition: "A limited or restricted area of damage or abnormality within a tissue or organ.",
    wikiLink: "https://en.wikipedia.org/wiki/Focal_(medicine)"
  },
  "perilesional edema": {
    simplified: "swelling around damaged area",
    definition: "Swelling of tissues surrounding a lesion or injury, typically due to increased fluid in the affected area.",
    wikiLink: "https://en.wikipedia.org/wiki/Edema"
  },
  "temporal lobe": {
    simplified: "side part of the brain",
    definition: "One of the four major lobes of the brain, located beneath the lateral fissure on both cerebral hemispheres, involved in processing sensory input to form memories, language comprehension, visual memories, and emotion.",
    wikiLink: "https://en.wikipedia.org/wiki/Temporal_lobe"
  },
  "histopathological": {
    simplified: "tissue study under microscope",
    definition: "Relating to the microscopic examination of tissue in order to study the manifestations of disease.",
    wikiLink: "https://en.wikipedia.org/wiki/Histopathology"
  },
  "exacerbation": {
    simplified: "worsening",
    definition: "A worsening of a disease or its symptoms. It refers to an increase in the severity of a disease or its signs and symptoms.",
    wikiLink: "https://en.wikipedia.org/wiki/Exacerbation"
  },
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
            definition: info.definition,
            wikiLink: info.wikiLink
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
            definition: info.definition,
            wikiLink: info.wikiLink
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
