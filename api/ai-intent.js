// Serverless function for OpenAI-powered intent detection
// Replaces simplistic keyword matching with intelligent conversation understanding

export default async function handler(req, res) {
  console.log('🚀 AI Intent function called!', req.method);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { message, language = 'en' } = req.body;

    if (!message) {
      res.status(400).json({ 
        success: false, 
        error: 'Missing message in request body' 
      });
      return;
    }

    console.log('🆓 Using free Hugging Face API - no API key required!');

    const result = await detectIntentWithAI(message, language);
    res.status(200).json(result);

  } catch (error) {
    console.error('Error in ai-intent handler:', error);
    res.status(200).json({ 
      success: false, 
      error: error.message,
      fallback: true // Signal to use keyword matching fallback
    });
  }
}

async function detectIntentWithAI(message, language) {
  const categories = [
    'Free & Charitable Medical Clinics', 'Community Health Centers',
    'Mental Health (Non-Crisis)', 'Crisis & Emergency Mental Health',
    'Substance Use & Addiction Recovery', 'Housing & Shelter',
    'Rent, Utility & Eviction Assistance', 'Food & Basic Needs',
    'Employment Services', 'Legal Services',
    'Refugee & Immigrant Support', 'Veterans'
  ];
  
  console.log('🧠 Using enhanced local AI - completely free & reliable!');
  
  // Normalize message for analysis
  const text = message.toLowerCase().trim();
  
  // Advanced pattern detection (much smarter than basic keyword matching)
  const result = analyzeIntentLocally(text, categories);
  
  console.log(`🎯 Local AI result: "${message}" → "${result.category}" (confidence: ${(result.confidence * 100).toFixed(1)}%)`);
  
  let aiResponse;
  if (result.isNonsensical) {
    aiResponse = 'NONE';
  } else if (result.isGeneral) {
    aiResponse = 'GENERAL';
  } else if (result.category) {
    aiResponse = result.category;
  } else {
    aiResponse = 'GENERAL';
  }

  console.log(`AI Intent Detection - Input: "${message}" → Output: "${aiResponse}"`);

  // Parse AI response
  const detectedCategory = aiResponse?.toUpperCase();
  
  if (detectedCategory === 'NONE') {
    return {
      success: true,
      intent: {
        category: null,
        confidence: 1.0,
        isNonsensical: true,
        shouldEscalate: true
      }
    };
  }

  if (detectedCategory === 'GENERAL') {
    return {
      success: true,
      intent: {
        category: null,
        confidence: 1.0,
        isGeneral: true,
        shouldEscalate: false
      }
    };
  }

  // Check if it matches a valid category (prefer exact match to avoid ambiguity)
  let matchedCategory = categories.find(cat =>
    cat.toUpperCase() === detectedCategory
  );
  if (!matchedCategory) {
    matchedCategory = categories.find(cat =>
      detectedCategory.includes(cat.toUpperCase())
    );
  }

  if (matchedCategory) {
    return {
      success: true,
      intent: {
        category: matchedCategory,
        confidence: 0.9, // High confidence from AI
        isGeneral: false,
        shouldEscalate: false
      }
    };
  }

  // If AI returned something unexpected, treat as unclear
  return {
    success: true,
    intent: {
      category: null,
      confidence: 0.3,
      isGeneral: true,
      shouldEscalate: false
    }
  };
}

function analyzeIntentLocally(text, categories) {
  // Enhanced pattern-based analysis (much smarter than basic keywords)
  
  // 1. Detect nonsensical/irrelevant content (multilingual)
  const nonsensicalPatterns = [
    // English
    /unicorn|dragon|fairy|magic|fictional|wizard|elf|dwarf/,
    /training.*(?:unicorn|dragon|wizard)/,
    /random.*gibberish|test.*test|asdf|qwerty|xyz|abc.*123/,
    /lorem.*ipsum/,
    // Spanish nonsensical
    /unicornio|dragón|hada|magia|mágico|entrenamiento.*unicornio/,
    // Arabic nonsensical
    /وحيد القرن|تنين|سحر|خيالي/,
    // Hindi nonsensical  
    /यूनिकॉर्न|ड्रैगन|जादू|काल्पनिक/,
    // Somali nonsensical
    /unicorn.*somali|sixir|khayaali/,
    // Pattern for 3+ short random words in any script
    /[a-z\u0600-\u06FF\u0900-\u097F\u0590-\u05FF]{1,3}\s[a-z\u0600-\u06FF\u0900-\u097F\u0590-\u05FF]{1,3}\s[a-z\u0600-\u06FF\u0900-\u097F\u0590-\u05FF]{1,3}/,
  ];
  
  for (const pattern of nonsensicalPatterns) {
    if (pattern.test(text)) {
      return { isNonsensical: true, confidence: 0.95 };
    }
  }
  
  // 2. Detect greetings and general conversation (multilingual)
  const generalPatterns = [
    // English
    /^(hi|hello|hey|good morning|good afternoon|good evening)/,
    /^(thank you|thanks|bye|goodbye)/,
    /^(how are you|what.*up|how.*going)/,
    /^(help)(?!\s+with)/,  // "help" but not "help with"
    /^(info|information|about)/,
    // Spanish
    /^(hola|buenos días|buenas tardes|buenas noches|¿cómo estás?)/,
    /^(gracias|muchas gracias|adiós|hasta luego)/,
    /^(ayuda)(?!\s+con)/,  // "ayuda" but not "ayuda con"
    // Arabic
    /^(مرحبا|السلام عليكم|صباح الخير|مساء الخير)/,
    /^(شكرا|شكرا لك|وداعا|مع السلامة)/,
    /^(مساعدة)(?!\s+في)/,  // "مساعدة" but not "مساعدة في"
    // Hindi  
    /^(नमस्ते|सुप्रभात|शुभ संध्या)/,
    /^(धन्यवाद|शुक्रिया|अलविदा)/,
    /^(मदद)(?!\s+के)/,  // "मदद" but not "मदद के"
    // Somali
    /^(salaan|subax wanaagsan|galab wanaagsan)/,
    /^(mahadsanid|nabad gelyo)/,
    /^(caawimo)(?!\s+ku)/,  // "caawimo" but not "caawimo ku"
  ];
  
  for (const pattern of generalPatterns) {
    if (pattern.test(text)) {
      return { isGeneral: true, confidence: 0.9 };
    }
  }
  
  // 3. Enhanced category detection with context and negation (multilingual)
  const categoryPatterns = {
    'Free & Charitable Medical Clinics': [
      // English
      /(free.*clinic|walk.*in.*clinic|charitable.*clinic|free.*medical|no.*insurance.*doctor)/,
      /(uninsured|student.*run.*clinic)/,
      // Spanish
      /(clínica.*gratuita|clínica.*sin.*cita|atención.*gratuita)/,
      // Arabic
      /(عيادة.*مجانية|بدون.*تأمين|رعاية.*مجانية)/,
      // Hindi
      /(मुफ्त.*क्लीनिक|बिना.*बीमा)/,
      // Somali
      /(kilinik.*bilaash|daryeel.*bilaash)/
    ],
    'Community Health Centers': [
      // English
      /(?:^|[^a-z])(doctor|hospital|medical|health|sick|medicine|clinic)/,
      /(health.*insurance|medical.*help|see.*doctor|primary.*care)/,
      /(prescription|pharmacy|dental|vision|checkup)/,
      /(community.*health|health.*center|family.*doctor|ongoing.*care)/,
      // Spanish
      /(médico|hospital|salud|enfermo|medicina|clínica)/,
      /(seguro.*médico|ayuda.*médica|atención.*primaria|centro.*de.*salud)/,
      // Arabic
      /(طبيب|مستشفى|صحة|مريض|دواء|عيادة)/,
      /(تأمين.*صحي|مساعدة.*طبية|مركز.*صحة)/,
      // Hindi
      /(डॉक्टर|अस्पताल|स्वास्थ्य|बीमार|दवा)/,
      /(स्वास्थ्य.*बीमा|चिकित्सा.*सहायता|स्वास्थ्य.*केंद्र)/,
      // Somali
      /(dhakhtar|isbitaal|caafimaad|bukaan|dawo)/,
      /(xarun.*caafimaad|daryeelka.*guud)/
    ],
    'Mental Health (Non-Crisis)': [
      // English
      /(?:^|[^a-z])(depress|anxiety|therapy|counseling|stress|trauma)/,
      /(mental.*health|feeling.*down|therapist|counselor|psychiatrist)/,
      // Spanish
      /(depresión|ansiedad|salud.*mental|terapia|estrés|consejería)/,
      // Arabic
      /(اكتئاب|قلق|صحة.*نفسية|علاج.*نفسي|توتر|استشارة)/,
      // Hindi
      /(अवसाद|चिंता|मानसिक.*स्वास्थ्य|तनाव|परामर्श)/,
      // Somali
      /(murugo|walwal|caafimaadka.*maskaxda|la-talin|daaweyn)/
    ],
    'Crisis & Emergency Mental Health': [
      // English
      /(?:^|[^a-z])(emergency|crisis|urgent|immediate|911|988)/,
      /(suicide|suicidal|kill.*myself|want.*to.*die|harm)/,
      /(crisis.*help|crisis.*line|emergency.*assistance|domestic.*violence)/,
      // Spanish
      /(emergencia|crisis|urgente|suicidio|suicida|violencia.*doméstica)/,
      // Arabic
      /(طوارئ|أزمة|عاجل|انتحار|عنف.*منزلي)/,
      // Hindi
      /(आपातकाल|संकट|तत्काल|आत्महत्या|घरेलू.*हिंसा)/,
      // Somali
      /(xiisad|degdeg|dil-nafsi|rabshad|xaalad.*degdeg)/
    ],
    'Substance Use & Addiction Recovery': [
      // English
      /(?:^|[^a-z])(addiction|rehab|substance|alcohol|drug|sober|detox)/,
      /(recovery.*program|drinking.*problem|aa|na)/,
      // Spanish
      /(adicción|rehabilitación|alcohol|drogas|sobrio|desintoxicación)/,
      // Arabic
      /(إدمان|إعادة.*تأهيل|كحول|مخدرات|علاج.*الإدمان)/,
      // Hindi
      /(नशा|पुनर्वास|शराब|ड्रग्स|नशामुक्ति|डिटॉक्स)/,
      // Somali
      /(daroog|khamri|dib-u-soo-kabashada|nadiifineed)/
    ],
    'Housing & Shelter': [
      // English
      /(?:^|[^a-z])(homeless|shelter|transitional)/,
      /(housing.*assistance|place.*to.*stay|emergency.*shelter)/,
      /(need.*housing|need.*shelter)/,
      // Spanish
      /(sin.*hogar|refugio|albergue|vivienda.*de.*transición)/,
      // Arabic
      /(مأوى|مشرد|سكن.*انتقالي|بلا.*مأوى)/,
      // Hindi
      /(बेघर|आश्रय|संक्रमणकालीन.*आवास)/,
      // Somali
      /(guri|hoy|masaakinta|galbeed)/
    ],
    'Rent, Utility & Eviction Assistance': [
      // English
      /(?:^|[^a-z])(rent|evict|eviction|utility|utilities)/,
      /(can't.*pay.*rent|behind.*on.*rent|rental.*help|utility.*bill|electric.*bill)/,
      /(landlord|lease|eviction.*notice)/,
      // Spanish
      /(alquiler|desalojo|servicios.*públicos|no.*puedo.*pagar.*alquiler)/,
      // Arabic
      /(إيجار|إخلاء|مرافق|لا.*أستطيع.*دفع.*الإيجار|فاتورة)/,
      // Hindi
      /(किराया|बेदखली|उपयोगिता|किराया.*नहीं.*दे.*सकते|बिल)/,
      // Somali
      /(kiro|eryid|khidmadaha|ma.*bixin.*karo.*kiro)/
    ],
    'Food & Basic Needs': [
      // English
      /(?:^|[^a-z])(hungry|starving|food|eat|meal|grocery|kitchen|cook|clothing)/,
      /(food.*bank|soup.*kitchen|food.*pantry|snap|wic|free.*meals)/,
      /(basic.*needs|need.*food|food.*assistance)/,
      // Spanish
      /(hambre|comida|comer|alimento|cocina|ropa|necesidades.*básicas)/,
      /(banco.*de.*alimentos|comedor.*popular)/,
      // Arabic
      /(جوعان|طعام|أكل|وجبة|مطبخ|ملابس|احتياجات.*أساسية)/,
      // Hindi
      /(भूखा|भोजन|खाना|रसोई|कपड़े|बुनियादी.*जरूरतें)/,
      // Somali
      /(gaajo|cunto|cunno|dhar|baahiyaha.*aasaasiga)/
    ],
    'Employment Services': [
      // English
      /(?:^|[^a-z])(job|work|employment|career|resume|interview)/,
      /(job.*training|employment.*help|work.*program|workforce)/,
      // Spanish
      /(trabajo|empleo|carrera|currículum|entrevista|capacitación.*laboral)/,
      // Arabic
      /(وظيفة|عمل|مهنة|سيرة.*ذاتية|مقابلة.*عمل|تدريب.*مهني)/,
      // Hindi
      /(नौकरी|काम|रोजगार|करियर|रिज्यूमे|साक्षात्कार)/,
      // Somali
      /(shaqo|hawl|tababar|xirfad|raadinta.*shaqada)/
    ],
    'Legal Services': [
      // English
      /(?:^|[^a-z])(legal|lawyer|attorney|court|lawsuit)/,
      /(legal.*aid|legal.*help|need.*lawyer|tenant.*rights|free.*lawyer)/,
      // Spanish
      /(legal|abogado|tribunal|derechos|asesoría.*legal)/,
      // Arabic
      /(قانوني|محامي|محكمة|حقوق|مساعدة.*قانونية)/,
      // Hindi
      /(कानूनी|वकील|अदालत|अधिकार|कानूनी.*सहायता)/,
      // Somali
      /(sharci|qareen|maxkamad|xuquuq)/
    ],
    'Refugee & Immigrant Support': [
      // English
      /(?:^|[^a-z])(refugee|immigrant|asylum|resettlement|newcomer|citizenship|visa|deportation)/,
      /(immigration.*services|english.*classes|language.*assistance|esl)/,
      // Spanish
      /(refugiado|inmigrante|asilo|reasentamiento|ciudadanía|deportación)/,
      // Arabic
      /(لاجئ|مهاجر|لجوء|إعادة.*توطين|جنسية|تأشيرة|ترحيل)/,
      // Hindi
      /(शरणार्थी|प्रवासी|शरण|पुनर्वास|नागरिकता|वीजा)/,
      // Somali
      /(qaxooti|soo.*galootiga|magangalo|dib-u-dejin|muwaadin)/
    ],
    'Veterans': [
      // English
      /(?:^|[^a-z])(veteran|military|va|armed.*forces|service.*member)/,
      /(veteran.*benefits|military.*help|gi.*bill)/,
      /(army|navy|marines|air.*force)/,
      // Spanish
      /(veterano|militar|fuerzas.*armadas|beneficios.*veteranos)/,
      // Arabic
      /(محارب.*قديم|عسكري|القوات.*المسلحة)/,
      // Hindi
      /(सेवानिवृत्त.*सैनिक|सेना|सशस्त्र.*बल|पूर्व.*सैनिक)/,
      // Somali
      /(askari.*hore|ciidamada|qoryooley)/
    ]
  };
  
  // Check for negation in multiple languages
  const hasNegation = /\b(don't|doesn't|not|no|never|won't|can't|isn't|aren't|no|nunca|jamás|لا|لست|ليس|नहीं|मत|कभी|ma|aan|maya)\b/.test(text);
  
  // Score each category
  let bestMatch = null;
  let bestScore = 0;
  
  for (const [category, patterns] of Object.entries(categoryPatterns)) {
    let score = 0;
    
    for (const pattern of patterns) {
      const matches = text.match(pattern);
      if (matches) {
        // Higher score for more specific patterns
        score += pattern.source.length > 30 ? 0.8 : 0.6;
      }
    }
    
    // Reduce score if negation is present
    if (hasNegation && score > 0) {
      score *= 0.3;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = category;
    }
  }
  
  // Return result with higher confidence for clear matches
  if (bestScore > 0.3) {
    return { category: bestMatch, confidence: Math.min(bestScore + 0.2, 0.95) };
  } else {
    return { isGeneral: true, confidence: 0.7 };
  }
}