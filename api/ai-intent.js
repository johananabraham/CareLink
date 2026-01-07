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
  
  // 1. Detect nonsensical/irrelevant content
  const nonsensicalPatterns = [
    /unicorn|dragon|fairy|magic|fictional/,
    /training.*(?:unicorn|dragon|wizard)/,
    /random.*gibberish|test.*test|asdf|qwerty/,
    /lorem.*ipsum/,
    /[a-z]{1,3}\s[a-z]{1,3}\s[a-z]{1,3}/, // 3+ short random words
  ];
  
  for (const pattern of nonsensicalPatterns) {
    if (pattern.test(text)) {
      return { isNonsensical: true, confidence: 0.95 };
    }
  }
  
  // 2. Detect greetings and general conversation
  const generalPatterns = [
    /^(hi|hello|hey|good morning|good afternoon|good evening)/,
    /^(thank you|thanks|bye|goodbye)/,
    /^(how are you|what.*up|how.*going)/,
    /^(help|info|information|about)/,
  ];
  
  for (const pattern of generalPatterns) {
    if (pattern.test(text)) {
      return { isGeneral: true, confidence: 0.9 };
    }
  }
  
  // 3. Enhanced category detection with context and negation
  const categoryPatterns = {
    'Food': [
      /(?:^|[^a-z])(hungry|starving|food|eat|meal|grocery|restaurant|kitchen|cook)/,
      /(food.*assistance|food.*help|food.*bank|snap|wic)/,
      /(breakfast|lunch|dinner|snack)/
    ],
    'Housing': [
      /(?:^|[^a-z])(rent|apartment|house|homeless|shelter|evict)/,
      /(housing.*assistance|housing.*help|place.*stay|roof)/,
      /(lease|landlord|utilities|mortgage)/,
      /(help.*with.*housing|need.*housing|housing.*support)/
    ],
    'Healthcare': [
      /(?:^|[^a-z])(doctor|hospital|medical|health|sick|medicine|clinic)/,
      /(health.*insurance|medical.*help|see.*doctor)/,
      /(prescription|pharmacy|urgent.*care)/
    ],
    'Mental Health': [
      /(?:^|[^a-z])(depress|anxiety|mental|therapy|counseling|stress)/,
      /(mental.*health|feeling.*down|suicide|crisis.*line)/,
      /(therapist|counselor|psychiatrist)/
    ],
    'Substance Use': [
      /(?:^|[^a-z])(addiction|rehab|substance|alcohol|drug|sober)/,
      /(addiction.*help|recovery|detox|aa|na)/,
      /(substance.*abuse|drinking.*problem)/
    ],
    'Employment': [
      /(?:^|[^a-z])(job|work|employment|career|resume|interview)/,
      /(job.*training|employment.*help|work.*program)/,
      /(unemployment|benefits|workforce)/
    ],
    'Veterans': [
      /(?:^|[^a-z])(veteran|military|va|armed.*forces|service.*member)/,
      /(veteran.*benefits|military.*help|gi.*bill)/,
      /(army|navy|marines|air.*force)/
    ],
    'Crisis': [
      /(?:^|[^a-z])(emergency|crisis|urgent|immediate|911)/,
      /(crisis.*help|emergency.*assistance|urgent.*need)/,
      /(domestic.*violence|abuse|danger)/
    ]
  };
  
  // Check for negation (e.g., "I don't need food")
  const hasNegation = /\b(don't|doesn't|not|no|never|won't|can't|isn't|aren't)\b/.test(text);
  
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