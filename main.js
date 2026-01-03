const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwhygsZ9TqHoqgeU7NSq9iUsKqPgbdGCV6nI_C4Phu_TyB9qCeby5GrRNsKMGYP-bYfEb-r-ur3ePF/pub?output=csv";

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
  try {
    console.log('🔄 Loading resources from:', SHEET_URL);
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
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
    console.error('❌ Error loading resources:', error);
    return [];
  }
}

let map = L.map('map').setView([39.9612, -82.9988], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

async function showResources(category) {
  console.log('🔍 Searching for category:', category);
  const resources = await loadResources();
  
  // Clear existing markers
  map.eachLayer(layer => { if (layer instanceof L.Marker) map.removeLayer(layer); });
  
  // Filter resources by category
  const matchedResources = resources.filter(r => {
    const matches = r.category.toLowerCase() === category.toLowerCase();
    if (!matches) {
      console.log(`❌ No match: "${r.category}" !== "${category}"`);
    }
    return matches;
  });
  
  console.log(`📍 Found ${matchedResources.length} resources for "${category}"`);
  
  if (matchedResources.length === 0) {
    console.warn('⚠️ No resources found for category:', category);
    console.log('Available categories:', [...new Set(resources.map(r => r.category))]);
  }
  
  // Add markers to map
  matchedResources.forEach((r, index) => {
    console.log(`📌 Adding marker ${index + 1}:`, r.name, 'at', [r.lat, r.lng]);
    L.marker([r.lat, r.lng])
     .addTo(map)
     .bindPopup(`<b>${r.name}</b><br>${r.description}`);
  });
}

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

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
    weight: 1.0
  },
  "Healthcare": {
    keywords: ["medical", "clinic", "health", "doctor", "hospital", "physician", "nurse", "prescription", "medication", "insurance", "checkup", "sick", "illness", "treatment"],
    phrases: ["primary care", "health clinic", "free clinic", "medical care", "doctor visit", "health insurance", "medical help", "dental care", "vision care"],
    weight: 1.0
  },
  "Mental Health": {
    keywords: ["mental", "therapy", "counseling", "depression", "anxiety", "psychiatric", "psychological", "therapist", "counselor", "stress", "trauma", "bipolar", "ptsd"],
    phrases: ["mental health", "feeling depressed", "need therapy", "counseling services", "mental health support", "psychological help", "emotional support"],
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
    phrases: ["veteran services", "va benefits", "military help", "veteran housing", "veteran healthcare"],
    weight: 1.0
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
  if (!intent) {
    return {
      text: "I can help you find resources for food, housing, healthcare, mental health, substance use treatment, employment, veteran services, or crisis support. What do you need help with?",
      category: null
    };
  }

  const { category, confidence } = intent;
  
  // High confidence responses
  if (confidence >= 0.6) {
    const responses = {
      "Food": "I found food resources near you! Let me show you what's available.",
      "Housing": "Here are housing and shelter resources in your area.",
      "Healthcare": "I've located healthcare options that might help you.",
      "Mental Health": "Here are mental health resources and counseling services available.",
      "Substance Use": "I found substance use treatment and recovery resources for you.",
      "Crisis": "I understand you need immediate help. Here are crisis support resources available 24/7.",
      "Employment": "Here are employment and job training resources to help you.",
      "Veterans": "I found veteran-specific services and benefits that may help you."
    };
    
    return {
      text: responses[category] || `Here are ${category.toLowerCase()} resources for you.`,
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
      "Employment": "Would you like job training, resume help, or employment placement services?"
    };
    
    return {
      text: clarifications[category] || `Are you looking for ${category.toLowerCase()} resources?`,
      category: null // Don't show resources yet, wait for clarification
    };
  }

  // Low confidence - general help
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