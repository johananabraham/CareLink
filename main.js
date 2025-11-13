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

async function handleUserInput() {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";

  let reply = "";
  if (text.match(/food/i)) reply = "Here are food resources near you!";
  else if (text.match(/shelter|housing/i)) reply = "Here are housing resources!";
  else if (text.match(/medical|clinic|health/i)) reply = "Here are healthcare options!";
  else reply = "I can help you find food, housing, or healthcare resources.";

  addMessage(reply, "bot");

  if (reply.includes("food")) showResources("Food");
  else if (reply.includes("housing")) showResources("Housing");
  else if (reply.includes("health")) showResources("Healthcare");
}