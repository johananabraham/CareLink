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
  
  console.log('🤖 Using Hugging Face free API for intent detection...');
  
  // Use Hugging Face's zero-shot classification (completely free!)
  const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-mnli', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: message,
      parameters: {
        candidate_labels: [
          ...categories,
          'Greeting or general conversation',
          'Nonsensical or irrelevant request'
        ]
      }
    })
  });

  console.log('📡 Hugging Face API response status:', response.status);

  if (!response.ok) {
    const error = await response.text();
    console.log('❌ Hugging Face API error details:', error);
    throw new Error(`Hugging Face API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  
  // Hugging Face returns {labels: [...], scores: [...]}
  const topLabel = data.labels[0];
  const topScore = data.scores[0];
  
  console.log(`🎯 Hugging Face result: "${message}" → "${topLabel}" (confidence: ${(topScore * 100).toFixed(1)}%)`);
  
  // Map Hugging Face results to our expected format
  let aiResponse;
  if (topLabel === 'Nonsensical or irrelevant request') {
    aiResponse = 'NONE';
  } else if (topLabel === 'Greeting or general conversation') {
    aiResponse = 'GENERAL';
  } else if (categories.includes(topLabel)) {
    aiResponse = topLabel;
  } else {
    // Low confidence or unclear result
    aiResponse = topScore > 0.5 ? topLabel : 'GENERAL';
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