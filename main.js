// Google Sheets API configuration - loaded from secure config.js
function getSheetAPIUrl() {
  if (!window.CONFIG || !CONFIG.GOOGLE_SHEETS_API_KEY || CONFIG.GOOGLE_SHEETS_API_KEY.includes('REPLACE_WITH')) {
    console.warn('⚠️ Google Sheets API key not configured. Using CSV fallback.');
    return null;
  }
  return `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/columbus_resources_enriched?key=${CONFIG.GOOGLE_SHEETS_API_KEY}`;
}

// Use CORS proxy to access the published sheet
const PUBLISHED_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRA-GKdJIlSqsXamMWZThB8m-bnvD4_xBuLKyv1QSqn5VEkJGhLxKuciXF-OwabtVVluZ7cdk-ec1I1/pub?output=csv";
const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const PROXIED_CSV_URL = CORS_PROXY_URL + PUBLISHED_CSV_URL;

function parseCSVRow(row) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];
    
    if (char === '"') {
      if (!inQuotes) {
        // Starting a quoted field
        inQuotes = true;
      } else if (nextChar === '"') {
        // Escaped quote: "" becomes "
        current += '"';
        i++; // Skip the next quote
      } else {
        // Ending a quoted field
        inQuotes = false;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator (only when not in quotes)
      result.push(current.trim());
      current = '';
    } else {
      // Regular character
      current += char;
    }
  }
  
  // Don't forget the last field!
  result.push(current.trim());
  return result;
}

async function loadResources() {
  // Try serverless function first, fallback to sample data
  try {
    // When deployed to Vercel, this will work. For local development, falls back to sample data.
    const apiUrl = window.location.hostname === 'localhost' ? 
      null : // Use null for localhost to skip API call
      '/api/sheets'; // Use relative URL when deployed
      
    if (apiUrl) {
      console.log('🔄 Loading resources from serverless function...');
      const response = await fetch(apiUrl);
      const result = await response.json();
      
      if (result.success && result.data) {
        const csvData = result.data;
        console.log('📄 Raw CSV length:', csvData.length, 'characters');
        
        const lines = csvData.split('\n').filter(line => line.trim());
        console.log('📊 Total lines (including header):', lines.length);
        
        // Parse CSV data same as before
        const rows = lines.slice(1).map(parseCSVRow);
        const resources = rows.map(r => ({
          name: r[0] || '',
          purpose: r[1] || '',
          location: r[2] || '',
          website: r[3] || '',
          phone: r[4] || '',
          hours: r[5] || '',
          category: (r[6] || '').trim(),
          type: (r[7] || '').trim(),
          lat: parseFloat(r[8]) || null,
          lng: parseFloat(r[9]) || null,
          description: r[10] || ''
        }));
        
        const validResources = resources.filter(resource => 
          resource.lat && resource.lng && resource.category
        );
        
        console.log('✅ Valid resources from serverless function:', validResources.length);
        return validResources;
      }
    }
  } catch (error) {
    console.log('📄 Serverless function not available, using sample data...', error.message);
  }

  // Fallback to sample data for development
  if (true) { // Using local data for development
    console.log('🔄 Using sample data for testing...');
    return [
      { name: "Central Ohio Food Bank", category: "Food", lat: 39.8814, lng: -83.0924, description: "Emergency food assistance" },
      { name: "Mid-Ohio Foodbank", category: "Food", lat: 39.9912, lng: -83.0451, description: "Food pantry serving west Columbus area" },
      { name: "Victory Ministries Pantry", category: "Food", lat: 39.9569, lng: -82.8955, description: "Food pantry and meal support" },
      { name: "YMCA Family Center", category: "Housing", lat: 39.9912, lng: -82.9988, description: "Emergency shelter services" },
      { name: "Friends of the Homeless", category: "Housing", lat: 39.9851, lng: -82.9944, description: "Comprehensive homeless services" },
      { name: "Directions Mental Health", category: "Mental Health", lat: 39.9612, lng: -82.9400, description: "Mental health counseling" },
      { name: "Southeast Peer Support", category: "Mental Health", lat: 39.9504, lng: -83.0321, description: "Peer recovery and support" },
      { name: "Maryhaven Detox", category: "Substance Use", lat: 39.9546, lng: -82.9547, description: "24/7 detox and recovery center" },
      { name: "CompDrug Medication-assisted Treatment", category: "Substance Use", lat: 39.9907, lng: -82.8961, description: "Addiction treatment and counseling" },
      { name: "Nationwide Children's Hospital", category: "Healthcare", lat: 39.9493, lng: -83.0196, description: "Comprehensive pediatric healthcare" },
      { name: "Columbus State Job Training", category: "Employment", lat: 39.9634, lng: -82.9951, description: "Career training and employment assistance" },
      { name: "VA Healthcare", category: "Veterans", lat: 39.9706, lng: -82.9218, description: "Healthcare for homeless veterans" }
    ];
  }
  
  // Try Google Sheets API first, fallback to CSV if needed
  const SHEET_API_URL = getSheetAPIUrl();
  
  if (SHEET_API_URL) {
    try {
      console.log('🔄 Loading resources from Google Sheets API:', SHEET_API_URL);
      const res = await fetch(SHEET_API_URL);
      
      if (res.ok) {
        const data = await res.json();
        console.log('📦 Raw API response:', data);
        
        const rows = data.values || [];
        console.log('📊 Total rows (including header):', rows.length);
        
        if (rows.length === 0) {
          throw new Error('No data returned from Sheets API');
        }
        
        // Debug: Show header row
        console.log('📋 Header:', rows[0]);
        
        // Skip header row and convert to resource objects
        const resources = rows.slice(1).map(r => ({
          name: r[0] || '',
          purpose: r[1] || '',
          location: r[2] || '',
          website: r[3] || '',
          phone: r[4] || '',
          hours: r[5] || '',
          category: (r[6] || '').trim(),
          type: (r[7] || '').trim(),
          lat: parseFloat(r[8]) || null,
          lng: parseFloat(r[9]) || null,
          description: r[10] || ''
        }));
        
        console.log('📦 Total resources parsed:', resources.length);
        
        // Debug: Show categories found
        const categories = [...new Set(resources.map(r => r.category).filter(Boolean))];
        console.log('🏷️ Categories found:', categories);
        
        // Debug: Show sample resource
        console.log('📄 Sample resource object:', resources[0]);
        
        const validResources = resources.filter(resource => 
          resource.lat && resource.lng && resource.category
        );
        
        console.log('✅ Valid resources (with coordinates & category):', validResources.length);
        console.log('❌ Filtered out:', resources.length - validResources.length, 'resources');
        
        return validResources;
      } else {
        console.log('📄 Sheets API returned error:', res.status, 'falling back to CSV...');
      }
    } catch (error) {
      console.log('📄 Sheets API failed, falling back to CSV...', error.message);
    }
  }

  // Try published CSV first, then regular export
  try {
    console.log('🔄 Loading resources from published CSV:', PUBLISHED_CSV_URL);
    const res = await fetch(PUBLISHED_CSV_URL);
    if (!res.ok) {
      console.log('📄 Published CSV failed, trying regular export...');
      throw new Error(`Published CSV failed: ${res.status}`);
    }
    
    const text = await res.text();
    console.log('📄 Raw CSV length:', text.length, 'characters');
    
    const lines = text.split('\n').filter(line => line.trim());
    console.log('📊 Total lines (including header):', lines.length);
    
    // Debug: Show header row
    if (lines.length > 0) {
      console.log('📋 Header:', lines[0]);
    }
    
    // Skip header row and parse each line
    const rows = lines.slice(1).map(parseCSVRow);
    console.log('🔍 Sample parsed row:', rows[0]);
    
    const resources = rows.map(r => ({
      name: r[0] || '',
      purpose: r[1] || '',
      location: r[2] || '',
      website: r[3] || '',
      phone: r[4] || '',
      hours: r[5] || '',
      category: (r[6] || '').trim(),
      type: (r[7] || '').trim(),
      lat: parseFloat(r[8]) || null,
      lng: parseFloat(r[9]) || null,
      description: r[10] || ''
    }));
    
    console.log('📦 Total resources parsed:', resources.length);
    
    // Debug: Show categories found
    const categories = [...new Set(resources.map(r => r.category).filter(Boolean))];
    console.log('🏷️ Categories found:', categories);
    
    // Debug: Show sample resource
    console.log('📄 Sample resource object:', resources[0]);
    
    const validResources = resources.filter(resource => 
      resource.lat && resource.lng && resource.category
    );
    
    console.log('✅ Valid resources (with coordinates & category):', validResources.length);
    console.log('❌ Filtered out:', resources.length - validResources.length, 'resources');
    
    return validResources;
  } catch (error) {
    console.error('❌ Error loading resources from all sources:', error);
    return [];
  }
}

let map = L.map('map').setView([39.9612, -82.9988], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

async function showResources(category) {
  console.log('🔍 Searching for category:', category);
  const resources = await loadResources();
  
  console.log('📊 Total resources loaded:', resources.length);
  if (resources.length > 0) {
    console.log('🏷️ Sample resource categories:', resources.slice(0, 5).map(r => r.category));
  }
  
  // Clear existing markers
  map.eachLayer(layer => { if (layer instanceof L.Marker) map.removeLayer(layer); });
  
  // Enhanced category matching with flexible patterns  
  const matchedResources = resources.filter(r => {
    const resourceCategory = r.category.toLowerCase().trim();
    const targetCategory = category.toLowerCase().trim();
    
    // Direct exact match first
    if (resourceCategory === targetCategory) {
      console.log(`✅ Direct match: "${r.category}" === "${category}"`);
      return true;
    }
    
    // Map intent categories to Google Sheet categories
    const intentToSheetMapping = {
      'food': 'food',
      'housing': 'housing', 
      'healthcare': 'healthcare',
      'mental health': 'mental health',
      'substance use': 'substance use',
      'crisis': 'crisis',
      'employment': 'employment',
      'veterans': 'veterans'
    };
    
    // Check if we have a direct mapping
    const mappedCategory = intentToSheetMapping[targetCategory];
    if (mappedCategory && resourceCategory === mappedCategory) {
      console.log(`✅ Mapped match: "${r.category}" maps to "${category}"`);
      return true;
    }
    
    // Fallback: flexible keyword matching
    const categoryMappings = {
      'food': ['food', 'nutrition', 'meal', 'pantry', 'kitchen'],
      'housing': ['housing', 'shelter', 'homeless'],
      'healthcare': ['healthcare', 'health', 'medical', 'clinic'],
      'mental health': ['mental', 'therapy', 'counseling', 'behavioral'],
      'substance use': ['substance', 'addiction', 'recovery', 'drug'],
      'crisis': ['crisis', 'emergency', 'urgent', 'immediate'],
      'employment': ['employment', 'job', 'work', 'career'],
      'veterans': ['veteran', 'military', 'va']
    };
    
    const keywords = categoryMappings[targetCategory] || [];
    const matches = keywords.some(keyword => resourceCategory.includes(keyword));
    
    if (!matches) {
      console.log(`❌ No match: "${r.category}" vs "${category}"`);
    } else {
      console.log(`✅ Keyword match: "${r.category}" matches "${category}"`);
    }
    
    return matches;
  });
  
  console.log(`📍 Found ${matchedResources.length} resources for "${category}"`);
  
  if (matchedResources.length === 0) {
    console.warn('⚠️ No resources found for category:', category);
    console.log('Available categories:', [...new Set(resources.map(r => r.category))]);
    
    // Add user-facing message when no resources are found
    addMessage(`I'm sorry, I couldn't find any mappable ${category.toLowerCase()} resources in your area right now. This might be because:
    
• The resources don't have location coordinates yet
• They may be listed under a different category name
• The data is still being updated

You can try asking for a different type of assistance, or check back later.`, "bot");
    return; // Exit early when no resources found
  }
  
  // Add markers to map
  matchedResources.forEach((r, index) => {
    console.log(`📌 Adding marker ${index + 1}:`, r.name, 'at', [r.lat, r.lng]);
    
    try {
      // Validate coordinates
      if (!r.lat || !r.lng || isNaN(r.lat) || isNaN(r.lng)) {
        console.error(`❌ Invalid coordinates for ${r.name}:`, r.lat, r.lng);
        return;
      }
      
      console.log(`✅ Creating marker for ${r.name} at coordinates [${r.lat}, ${r.lng}]`);
      const marker = L.marker([r.lat, r.lng])
        .addTo(map)
        .bindPopup(`<b>${r.name}</b><br>${r.description || r.purpose}`);
      
      console.log(`✅ Marker successfully added to map`);
    } catch (error) {
      console.error(`❌ Error creating marker for ${r.name}:`, error);
    }
  });
  
  // Success message to user
  if (matchedResources.length > 0) {
    addMessage(`Found ${matchedResources.length} ${category.toLowerCase()} resource${matchedResources.length > 1 ? 's' : ''} near you! Check the map above to see their locations. Click on any marker for more details.`, "bot");
  }
}

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Conversational memory system for enhanced user experience
let conversationState = {
  awaitingClarification: false,
  pendingCategory: null,
  lastQuestion: null
};

sendBtn.onclick = handleUserInput;

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "text-right mb-2" : "text-left mb-2";
  msg.innerHTML = `<span class="inline-block px-3 py-2 rounded-lg ${
    sender === "user" ? 'bg-blue-500 text-white' : 'bg-gray-200'
  }">${text}</span>`;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Enhanced Intent Detection System
const INTENT_PATTERNS = {
  "Food": {
    keywords: ["food", "hungry", "eat", "meal", "kitchen", "pantry", "nutrition", "groceries", "feeding", "starving", "appetite", "dining", "nourishment", "sustenance"],
    phrases: ["food bank", "soup kitchen", "food pantry", "free meals", "food assistance", "can't afford food", "need food", "food stamps", "snap benefits"],
    weight: 1.0
  },
  "Housing": {
    keywords: ["shelter", "housing", "homeless", "rent", "apartment", "home", "eviction", "foreclosure", "roommate", "lease", "landlord", "utilities"],
    phrases: ["need shelter", "can't pay rent", "being evicted", "homeless shelter", "housing assistance", "affordable housing", "rental help", "utility assistance"],
    weight: 1.3
  },
  "Mental Health": {
    keywords: ["mental", "therapy", "counseling", "depression", "anxiety", "psychiatric", "psychological", "therapist", "counselor", "stress", "trauma", "bipolar", "ptsd"],
    phrases: ["mental health", "mental health help", "need mental health", "mental health support", "feeling depressed", "need therapy", "counseling services", "psychological help", "emotional support"],
    weight: 1.5
  },
  "Healthcare": {
    keywords: ["medical", "clinic", "doctor", "hospital", "physician", "nurse", "prescription", "medication", "insurance", "checkup", "sick", "illness", "treatment"],
    phrases: ["primary care", "medical clinic", "free clinic", "medical care", "doctor visit", "medical insurance", "medical help", "dental care", "vision care"],
    weight: 1.0
  },
  "Substance Use": {
    keywords: ["drug", "alcohol", "addiction", "recovery", "rehab", "substance", "detox", "sober", "sobriety", "withdrawal", "overdose", "clean"],
    phrases: ["substance abuse", "drug addiction", "alcohol problem", "need rehab", "drug treatment", "addiction recovery", "detox program", "getting clean"],
    weight: 1.0
  },
  "Crisis": {
    keywords: ["crisis", "emergency", "urgent", "immediate", "suicide", "suicidal", "harm", "danger", "distress", "desperate", "hopeless"],
    phrases: ["suicide hotline", "crisis line", "emergency help", "need help now", "feeling suicidal", "crisis support", "immediate assistance"],
    weight: 1.2
  },
  "Employment": {
    keywords: ["job", "work", "employment", "career", "resume", "interview", "unemployed", "training", "skills", "hiring"],
    phrases: ["need job", "job training", "resume help", "career services", "employment assistance", "job search", "work training"],
    weight: 1.0
  },
  "Veterans": {
    keywords: ["veteran", "military", "va", "army", "navy", "marines", "air force", "combat", "deployment", "service"],
    phrases: ["veteran services", "veteran resources", "va benefits", "military help", "military assistance", "veteran housing", "veteran healthcare"],
    weight: 1.6
  }
};

function detectIntent(text) {
  const normalizedText = text.toLowerCase();
  const results = [];

  for (const [category, patterns] of Object.entries(INTENT_PATTERNS)) {
    let score = 0;
    let matches = [];

    // Check keyword matches
    for (const keyword of patterns.keywords) {
      if (normalizedText.includes(keyword)) {
        score += 1 * patterns.weight;
        matches.push(keyword);
      }
    }

    // Check phrase matches (higher weight)
    for (const phrase of patterns.phrases) {
      if (normalizedText.includes(phrase)) {
        score += 2 * patterns.weight;
        matches.push(phrase);
      }
    }

    if (score > 0) {
      // Better normalization: Crisis gets special handling, others use 2.5 divisor
      let confidence = category === "Crisis" ? 
        Math.min(score / 2, 1.0) : 
        Math.min(score / 2.5, 1.0);
      
      results.push({
        category,
        score,
        confidence,
        matches
      });
    }
  }

  // Sort by score and return best match
  results.sort((a, b) => b.score - a.score);
  return results.length > 0 ? results[0] : null;
}

function generateResponse(intent, userText) {
  // Check if we're waiting for clarification from previous question
  if (conversationState.awaitingClarification) {
    // Look for positive confirmation words or specific resource mentions
    const confirmationWords = ['yes', 'yeah', 'yep', 'sure', 'okay', 'ok', 'correct', 'right', 'exactly', 'please', 'show me'];
    const resourceMentions = ['food pantries', 'soup kitchens', 'meal programs', 'emergency shelter', 'housing assistance', 'rental help', 'va benefits', 'veteran housing', 'veteran healthcare', 'medical care', 'dental services', 'counseling', 'therapy', 'detox services', 'recovery programs', 'job training', 'resume help'];
    
    const isConfirmation = confirmationWords.some(word => userText.toLowerCase().includes(word)) ||
                          resourceMentions.some(phrase => userText.toLowerCase().includes(phrase));
    
    if (isConfirmation) {
      // Reset conversation state and show resources
      const category = conversationState.pendingCategory;
      conversationState.awaitingClarification = false;
      conversationState.pendingCategory = null;
      conversationState.lastQuestion = null;
      
      return {
        text: `Great! Looking for ${category.toLowerCase()} resources in your area...`,
        category
      };
    } else {
      // User didn't confirm, ask what they need
      conversationState.awaitingClarification = false;
      conversationState.pendingCategory = null;
      conversationState.lastQuestion = null;
      
      return {
        text: "I want to make sure I understand what you need. Could you tell me more specifically what kind of help you're looking for?",
        category: null
      };
    }
  }

  if (!intent) {
    return {
      text: "I can help you find resources for food, housing, healthcare, mental health, substance use treatment, employment, veteran services, or crisis support. What do you need help with?",
      category: null
    };
  }

  const { category, confidence } = intent;
  
  // High confidence responses - will be verified when resources are loaded
  if (confidence >= 0.6) {
    // Reset conversation state when showing immediate resources
    conversationState.awaitingClarification = false;
    conversationState.pendingCategory = null;
    conversationState.lastQuestion = null;
    
    return {
      text: `Looking for ${category.toLowerCase()} resources in your area...`,
      category
    };
  }

  // Medium confidence - ask for clarification
  if (confidence >= 0.4) {
    const clarifications = {
      "Food": "It sounds like you might need food assistance. Would you like to see food pantries, soup kitchens, or meal programs?",
      "Housing": "Are you looking for emergency shelter, housing assistance, or help with rent?",
      "Healthcare": "Do you need medical care, dental services, or help finding health insurance?",
      "Mental Health": "Are you interested in counseling, therapy, or mental health support services?",
      "Substance Use": "Are you looking for detox services, recovery programs, or ongoing addiction support?",
      "Employment": "Would you like job training, resume help, or employment placement services?",
      "Veterans": "Are you looking for VA benefits, veteran housing, or veteran healthcare services?",
      "Crisis": "Do you need immediate crisis support, a suicide hotline, or emergency assistance?"
    };
    
    // Set up conversation state for clarification
    conversationState.awaitingClarification = true;
    conversationState.pendingCategory = category;
    conversationState.lastQuestion = clarifications[category] || `Are you looking for ${category.toLowerCase()} resources?`;
    
    return {
      text: conversationState.lastQuestion,
      category: null // Don't show resources yet, wait for clarification
    };
  }

  // Low confidence - general help
  // Reset conversation state for low confidence responses
  conversationState.awaitingClarification = false;
  conversationState.pendingCategory = null;
  conversationState.lastQuestion = null;
  
  return {
    text: "I want to make sure I understand what you need. Could you tell me more specifically what kind of help you're looking for?",
    category: null
  };
}

async function handleUserInput() {
  const text = input.value.trim();
  if (!text) return;
  
  addMessage(text, "user");
  input.value = "";

  // Detect user intent
  const intent = detectIntent(text);
  console.log("Detected intent:", intent); // For debugging
  
  // Generate appropriate response
  const response = generateResponse(intent, text);
  addMessage(response.text, "bot");

  // Show resources if we have a confident category match
  if (response.category) {
    showResources(response.category);
  }
}