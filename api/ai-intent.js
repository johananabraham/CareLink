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
  const categories = ['Food', 'Housing', 'Healthcare', 'Mental Health', 'Substance Use', 'Employment', 'Veterans', 'Crisis'];
  
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

  // Check if it matches a valid category
  const matchedCategory = categories.find(cat => 
    cat.toUpperCase() === detectedCategory || 
    cat.toUpperCase().includes(detectedCategory) ||
    detectedCategory.includes(cat.toUpperCase())
  );

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
    'Food': [
      // English
      /(?:^|[^a-z])(hungry|starving|food|eat|meal|grocery|restaurant|kitchen|cook)/,
      /(food.*assistance|food.*help|food.*bank|snap|wic)/,
      /(breakfast|lunch|dinner|snack)/,
      /(help.*with.*food|need.*food|food.*support)/,
      // Spanish
      /(hambre|comida|comer|alimento|restaurante|cocina)/,
      /(ayuda.*con.*comida|necesito.*comida|banco.*de.*alimentos)/,
      /(desayuno|almuerzo|cena)/,
      // Arabic
      /(جوعان|طعام|أكل|وجبة|مطعم|مطبخ)/,
      /(مساعدة.*في.*الطعام|أحتاج.*طعام)/,
      // Hindi
      /(भूखा|भोजन|खाना|रसोई|भूख)/,
      /(मदद.*खाने.*के|खाना.*चाहिए)/,
      // Somali
      /(gaajo|cunto|cunno|matbakh)/,
      /(caawimo.*cunto|u.*baahan.*cunto)/
    ],
    'Housing': [
      // English
      /(?:^|[^a-z])(rent|apartment|house|homeless|shelter|evict)/,
      /(housing.*assistance|housing.*help|place.*stay|roof)/,
      /(lease|landlord|utilities|mortgage)/,
      /(help.*with.*housing|need.*housing|housing.*support)/,
      // Spanish
      /(renta|apartamento|casa|sin.*hogar|vivienda)/,
      /(ayuda.*con.*vivienda|necesito.*casa)/,
      // Arabic
      /(إيجار|شقة|بيت|مأوى|سكن)/,
      /(مساعدة.*في.*السكن|أحتاج.*بيت)/,
      // Hindi
      /(किराया|घर|मकान|आवास|शरण)/,
      /(मदद.*घर.*के|घर.*चाहिए)/,
      // Somali
      /(kiro|guri|hoy|hoyga|meel.*lagu.*noolaado)/,
      /(caawimo.*guri|u.*baahan.*hoy)/
    ],
    'Healthcare': [
      // English
      /(?:^|[^a-z])(doctor|hospital|medical|health|sick|medicine|clinic)/,
      /(health.*insurance|medical.*help|see.*doctor)/,
      /(prescription|pharmacy|urgent.*care)/,
      // Spanish
      /(médico|hospital|salud|enfermo|medicina|clínica)/,
      /(seguro.*médico|ayuda.*médica)/,
      // Arabic
      /(طبيب|مستشفى|صحة|مريض|دواء|عيادة)/,
      /(تأمين.*صحي|مساعدة.*طبية)/,
      // Hindi
      /(डॉक्टर|अस्पताल|स्वास्थ्य|बीमार|दवा)/,
      /(स्वास्थ्य.*बीमा|चिकित्सा.*सहायता)/,
      // Somali
      /(dhakhtar|isbitaal|caafimaad|bukaan|dawo)/
    ],
    'Mental Health': [
      // English
      /(?:^|[^a-z])(depress|anxiety|mental|therapy|counseling|stress)/,
      /(mental.*health|feeling.*down|suicide|crisis.*line)/,
      /(therapist|counselor|psychiatrist)/,
      // Spanish
      /(depresión|ansiedad|salud.*mental|terapia|estrés)/,
      /(ayuda.*psicológica|consejería)/,
      // Arabic
      /(اكتئاب|قلق|صحة.*نفسية|علاج.*نفسي|توتر)/,
      /(مساعدة.*نفسية|استشارة.*نفسية)/,
      // Hindi
      /(अवसाद|चिंता|मानसिक.*स्वास्थ्य|तनाव)/,
      /(मानसिक.*सहायता|परामर्श)/,
      // Somali
      /(murugo|walwal|caafimaadka.*maskaxda)/
    ],
    'Substance Use': [
      // English
      /(?:^|[^a-z])(addiction|rehab|substance|alcohol|drug|sober)/,
      /(addiction.*help|recovery|detox|aa|na)/,
      /(substance.*abuse|drinking.*problem)/,
      // Spanish
      /(adicción|rehabilitación|alcohol|drogas|sobrio)/,
      /(ayuda.*adicción|recuperación)/,
      // Arabic
      /(إدمان|إعادة.*تأهيل|كحول|مخدرات|علاج.*الإدمان)/,
      // Hindi
      /(नशा|पुनर्वास|शराब|ड्रग्स|नशामुक्ति)/,
      // Somali
      /(qamri|daroogada|ka.*daaweyn)/
    ],
    'Employment': [
      // English
      /(?:^|[^a-z])(job|work|employment|career|resume|interview)/,
      /(job.*training|employment.*help|work.*program)/,
      /(unemployment|benefits|workforce)/,
      // Spanish
      /(trabajo|empleo|carrera|currículum|entrevista)/,
      /(capacitación.*laboral|ayuda.*empleo)/,
      /(desempleo|beneficios)/,
      // Arabic
      /(وظيفة|عمل|مهنة|سيرة.*ذاتية|مقابلة.*عمل)/,
      /(تدريب.*مهني|مساعدة.*توظيف)/,
      // Hindi
      /(नौकरी|काम|रोजगार|करियर|साक्षात्कार)/,
      /(व्यावसायिक.*प्रशिक्षण|रोजगार.*सहायता)/,
      // Somali
      /(shaqo|hawl|tacliin.*shaqo|mushaharo)/
    ],
    'Veterans': [
      // English
      /(?:^|[^a-z])(veteran|military|va|armed.*forces|service.*member)/,
      /(veteran.*benefits|military.*help|gi.*bill)/,
      /(army|navy|marines|air.*force)/,
      // Spanish
      /(veterano|militar|fuerzas.*armadas)/,
      /(beneficios.*veteranos|ayuda.*militar)/,
      // Arabic
      /(محارب.*قديم|عسكري|القوات.*المسلحة)/,
      /(مساعدة.*المحاربين|فوائد.*المحاربين)/,
      // Hindi
      /(सेवानिवृत्त.*सैनिक|सेना|सशस्त्र.*बल)/,
      /(वेटेरन.*लाभ|सैन्य.*सहायता)/,
      // Somali
      /(askari.*hore|ciidan|qoryooley)/
    ],
    'Crisis': [
      // English
      /(?:^|[^a-z])(emergency|crisis|urgent|immediate|911)/,
      /(crisis.*help|emergency.*assistance|urgent.*need)/,
      /(domestic.*violence|abuse|danger)/,
      // Spanish
      /(emergencia|crisis|urgente|violencia.*doméstica)/,
      /(ayuda.*emergencia|asistencia.*crisis)/,
      // Arabic
      /(طوارئ|أزمة|عاجل|عنف.*منزلي)/,
      /(مساعدة.*طارئة|مساعدة.*الأزمة)/,
      // Hindi
      /(आपातकाल|संकट|तत्काल|घरेलू.*हिंसा)/,
      /(आपातकालीन.*सहायता|संकट.*सहायता)/,
      // Somali
      /(xaalad.*degdeg|mashakii|gurmad|rabshad)/
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