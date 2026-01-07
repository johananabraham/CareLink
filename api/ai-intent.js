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

    // Validate environment variable
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    if (!OPENAI_API_KEY) {
      console.log('OpenAI API key not found, falling back to keyword matching');
      res.status(200).json({ 
        success: false,
        error: 'OpenAI not configured',
        fallback: true
      });
      return;
    }

    const result = await detectIntentWithAI(message, language, OPENAI_API_KEY);
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

async function detectIntentWithAI(message, language, apiKey) {
  const categories = ['Food', 'Housing', 'Healthcare', 'Mental Health', 'Substance Use', 'Employment', 'Veterans', 'Crisis'];
  
  const prompt = `You are a community resource assistant. Analyze this user message and determine if they need help with any of these categories: ${categories.join(', ')}.

User message: "${message}"
Language: ${language}

Instructions:
1. If the message clearly relates to one of the categories, respond with just the category name (e.g., "Food")
2. If the message relates to multiple categories, pick the most relevant one
3. If the message is nonsensical, off-topic, or doesn't relate to community resources, respond with "NONE"
4. If the message is a greeting or general question, respond with "GENERAL"
5. Be very strict - only match if there's a clear need for that type of resource

Examples:
- "I need food" → "Food"  
- "help with rent" → "Housing"
- "feeling depressed" → "Mental Health"
- "unicorn training" → "NONE"
- "hello" → "GENERAL"
- "thank you" → "GENERAL"

Response (category name only):`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a precise intent classifier for community resources. Respond with only the category name or NONE/GENERAL as instructed.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 20,
      temperature: 0.1, // Low temperature for consistent classification
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const aiResponse = data.choices[0]?.message?.content?.trim();

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