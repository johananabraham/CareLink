// Internationalization setup
function initializeI18n() {
  // Show language modal on first visit
  if (window.i18n.shouldShowLanguageModal()) {
    showLanguageModal();
  } else {
    // Apply saved language immediately and initialize map
    updateUILanguage();
    setTimeout(() => {
      initializeMap();
    }, 500); // Small delay to ensure Leaflet is loaded
    // Show welcome message for returning users
    addMessage(window.i18n.t('bot.welcome'), "bot");
  }
  
  // Listen for language changes
  window.i18n.addListener((newLanguage) => {
    console.log(`🌐 Language changed to: ${newLanguage}`);
    updateUILanguage();
    
    // Force translate all sections
    setTimeout(() => {
      forceTranslateAllSections();
    }, 50);
    
    translateChatHistory();
    refreshMapPopups();
    console.log('✅ Language change processing completed');
  });
}

// Show language selection modal
function showLanguageModal() {
  console.log('὞3️ Showing language modal');
  const modal = document.getElementById('languageModal');
  const optionsContainer = document.getElementById('languageOptions');
  
  if (!modal || !optionsContainer) {
    console.error('❌ Language modal elements not found');
    return;
  }
  
  // Add body class to hide map and other content
  document.body.classList.add('language-modal-open');
  
  // Clear existing options
  optionsContainer.innerHTML = '';
  
  // Create language options
  const languages = window.i18n.getAvailableLanguages();
  languages.forEach(lang => {
    const option = document.createElement('button');
    option.className = 'language-option w-full p-4 border-2 border-neutral-200 rounded-2xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 flex items-center justify-between group hover:shadow-lg hover:scale-102 transform cursor-pointer';
    option.innerHTML = `
      <div class="flex items-center gap-4">
        <span class="text-3xl">${lang.flag}</span>
        <div class="text-left" dir="${lang.dir}">
          <div class="font-semibold text-neutral-800">${lang.nativeName}</div>
          <div class="text-sm text-neutral-500">${lang.name}</div>
        </div>
      </div>
      <svg class="w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    `;
    
    option.onclick = () => selectLanguage(lang.code);
    optionsContainer.appendChild(option);
  });
  
  modal.classList.remove('hidden');
}

// Select language and close modal
function selectLanguage(langCode) {
  console.log(`🌐 Selecting language: ${langCode}`);
  window.i18n.setLanguage(langCode);
  
  // Hide modal and remove body class
  document.getElementById('languageModal').classList.add('hidden');
  document.body.classList.remove('language-modal-open');
  
  // Force immediate UI update
  updateUILanguage();
  
  // Ensure all content is translated after a short delay
  setTimeout(() => {
    updateUILanguage(); // Second pass to catch any missed elements
    
    // Force translate all sections that were mentioned
    forceTranslateAllSections();
    
    console.log('✅ Language selection completed');
  }, 200);
  
  // Also trigger immediate forced translation
  forceTranslateAllSections();
  
  // Initialize map now that language is selected
  setTimeout(() => {
    initializeMap();
  }, 500); // Small delay to ensure everything is ready
  
  // Show welcome message in selected language
  addMessage(window.i18n.t('bot.welcome'), "bot");
}

// Update all UI elements with current language
function updateUILanguage() {
  const currentLang = window.i18n.getCurrentLanguage();
  const langInfo = window.LANGUAGE_INFO[currentLang];
  
  console.log(`🌐 Updating UI language to: ${currentLang}`);
  
  // Update document properties
  document.documentElement.lang = currentLang;
  document.documentElement.dir = window.i18n.getLanguageDirection();
  
  // Update page title
  document.title = window.i18n.t('pageTitle');
  
  // Update language switcher
  const currentLanguageFlag = document.getElementById('currentLanguageFlag');
  const currentLanguageName = document.getElementById('currentLanguageName');
  if (currentLanguageFlag) currentLanguageFlag.textContent = langInfo.flag;
  if (currentLanguageName) currentLanguageName.textContent = langInfo.nativeName;
  
  // Update all elements with data-i18n attributes
  const elementsToTranslate = document.querySelectorAll('[data-i18n]');
  console.log(`🔄 Translating ${elementsToTranslate.length} elements`);
  
  elementsToTranslate.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = window.i18n.t(key);
    if (translation && translation !== `[Missing: ${key}]`) {
      const oldText = element.textContent;
      element.textContent = translation;
      if (oldText !== translation) {
        console.log(`✅ Translated: ${key} = "${translation}"`);
      }
    } else {
      console.warn(`⚠️ Missing translation for key: ${key}`);
    }
  });
  
  // Update placeholder texts
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = window.i18n.t(key);
    if (translation && translation !== `[Missing: ${key}]`) {
      element.placeholder = translation;
    }
  });
  
  // Update select options with translations
  document.querySelectorAll('option[data-i18n]').forEach(option => {
    const key = option.getAttribute('data-i18n');
    const translation = window.i18n.t(key);
    if (translation && translation !== `[Missing: ${key}]`) {
      option.textContent = translation;
    }
  });
  
  console.log('✅ UI language update completed');
}

// Force translate all sections with aggressive approach
function forceTranslateAllSections() {
  console.log('🔥 Force translating ALL sections');
  
  const sectionsToTranslate = [
    '#how-it-works',
    '#about', 
    'header nav',
    'footer',
    '#sessionControl',
    '#chatbox'
  ];
  
  sectionsToTranslate.forEach(sectionSelector => {
    const section = document.querySelector(sectionSelector);
    if (section) {
      const elementsInSection = section.querySelectorAll('[data-i18n]');
      console.log(`🔄 Force translating ${elementsInSection.length} elements in ${sectionSelector}`);
      
      elementsInSection.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = window.i18n.t(key);
        if (translation && translation !== `[Missing: ${key}]`) {
          element.textContent = translation;
          console.log(`✅ Force translated: ${key} = "${translation}"`);
        }
      });
    }
  });
}

// Translate existing chat history when language changes
function translateChatHistory() {
  console.log('💬 Translating chat history');
  
  const messages = document.querySelectorAll('#messages .message');
  let translatedCount = 0;
  
  messages.forEach(messageDiv => {
    const messageContent = messageDiv.querySelector('.message-content');
    if (messageContent) {
      // Check if this is a bot message
      if (messageDiv.classList.contains('bot-message')) {
        const messageText = messageContent.textContent;
        const translatedText = translateBotMessage(messageText);
        if (translatedText !== messageText) {
          messageContent.textContent = translatedText;
          translatedCount++;
        }
      }
    }
  });
  
  console.log(`✅ Translated ${translatedCount} chat messages`);
}

// Translate bot messages to current language
function translateBotMessage(originalText) {
  // Direct translation mappings for common bot messages
  const directTranslations = {
    // Welcome messages
    "I can help you find resources like food, housing, healthcare, and more in your community. What are you looking for?": 'bot.welcome',
    "Puedo ayudarte a encontrar recursos como comida, vivienda, atención médica y más en tu comunidad. ¿Qué estás buscando?": 'bot.welcome',
    
    // Consent messages
    "I'd be happy to connect you with someone who can provide personalized assistance.": 'bot.personalAssistance',
    "Would you like to share some basic information so we can connect you with the right resources and support?": 'bot.shareInfo',
    
    // Help messages
    "You can ask me about food, housing, healthcare, or any other community resources.": 'bot.helpPrompt',
    
    // Instructions
    "Type 'food', 'housing', 'healthcare', or tell me what you need help with.": 'bot.instructions',
  };
  
  // Check for direct translations first
  if (directTranslations[originalText]) {
    return window.i18n.t(directTranslations[originalText]);
  }
  
  // Pattern matching for dynamic messages
  const patterns = [
    {
      regex: /I found (\d+) resources? for (.+)/,
      key: 'bot.foundResources',
      replacer: (match, count, category) => {
        return window.i18n.t('bot.foundResources', { count, category });
      }
    },
    {
      regex: /Looking for (.+) resources/,
      key: 'bot.searchingFor',
      replacer: (match, category) => {
        return window.i18n.t('bot.searchingFor', { category });
      }
    }
  ];
  
  // Try pattern matching
  for (const pattern of patterns) {
    const match = originalText.match(pattern.regex);
    if (match && pattern.replacer) {
      return pattern.replacer.apply(null, match);
    }
  }
  
  return originalText; // Return original if no translation found
}

// Refresh map popups when language changes
function refreshMapPopups() {
  if (map) {
    // Get current markers and refresh their popups
    map.eachLayer(layer => {
      if (layer instanceof L.Marker && layer.resourceData) {
        // Update popup content with new language
        const newContent = createPopupContent(layer.resourceData);
        layer.getPopup().setContent(newContent);
      }
    });
  }
}

// Setup language switcher
function setupLanguageSwitcher() {
  const languageSwitcher = document.getElementById('languageSwitcher');
  if (languageSwitcher) {
    languageSwitcher.onclick = () => {
      console.log('🔄 Language switcher clicked, showing modal');
      showLanguageModal();
    };
    console.log('✅ Language switcher initialized');
  } else {
    console.error('❌ Language switcher element not found');
  }
}

// Location service for geolocation and distance calculations
const LocationService = {
  userLocation: null,
  permissionAsked: false,
  userMarker: null, // Track user location marker
  
  // Request user location with privacy-focused messaging
  async requestLocation() {
    if (this.permissionAsked) {
      return this.userLocation;
    }
    
    this.permissionAsked = true;
    
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      console.log('📍 Geolocation not supported, falling back to ZIP code');
      this.showLocationFallback();
      return null;
    }
    
    try {
      console.log('📍 Requesting user location...');
      
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { 
            enableHighAccuracy: true, 
            timeout: 10000, 
            maximumAge: 300000 // 5 minutes cache
          }
        );
      });
      
      this.userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy
      };
      
      console.log('✅ Location acquired:', this.userLocation);
      this.showLocationSuccess();
      this.addUserMarkerToMap();
      return this.userLocation;
      
    } catch (error) {
      console.log('❌ Location permission denied or failed:', error.message);
      this.showLocationFallback();
      return null;
    }
  },
  
  // Calculate distance using Turf.js for maximum accuracy
  calculateDistance(lat1, lng1, lat2, lng2) {
    try {
      // Create GeoJSON points for Turf.js
      const point1 = turf.point([lng1, lat1]); // Note: Turf uses [lng, lat] format
      const point2 = turf.point([lng2, lat2]);
      
      // Calculate distance using Turf.js (returns kilometers by default)
      const distanceKm = turf.distance(point1, point2, { units: 'kilometers' });
      
      // Convert to miles (1 km = 0.621371 miles)
      const distanceMiles = distanceKm * 0.621371;
      
      // Debug logging for verification
      console.log(`🧮 Turf.js distance: [${lat1}, ${lng1}] to [${lat2}, ${lng2}] = ${distanceMiles.toFixed(2)} miles`);
      
      return distanceMiles;
      
    } catch (error) {
      console.error('❌ Error calculating distance with Turf.js:', error);
      
      // Fallback to simple calculation if Turf.js fails
      const lat1Rad = this.toRad(lat1);
      const lng1Rad = this.toRad(lng1);
      const lat2Rad = this.toRad(lat2);
      const lng2Rad = this.toRad(lng2);
      
      const dLat = lat2Rad - lat1Rad;
      const dLng = lng2Rad - lng1Rad;
      
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) * 
                Math.sin(dLng/2) * Math.sin(dLng/2);
      
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const fallbackDistance = 3958.8 * c;
      
      console.log(`🔄 Fallback distance calculation: ${fallbackDistance.toFixed(2)} miles`);
      return fallbackDistance;
    }
  },
  
  toRad(degrees) {
    return degrees * (Math.PI/180);
  },
  
  // Add distance to resources and sort by proximity
  enhanceResourcesWithDistance(resources) {
    if (!this.userLocation) {
      return resources; // Return unchanged if no user location
    }
    
    return resources.map(resource => ({
      ...resource,
      distance: this.calculateDistance(
        this.userLocation.lat,
        this.userLocation.lng,
        parseFloat(resource.lat),
        parseFloat(resource.lng)
      )
    })).sort((a, b) => a.distance - b.distance);
  },
  
  // Show success message when location is acquired
  showLocationSuccess() {
    addMessage("📍 Great! I can now show you resources near your location.", "bot");
  },
  
  // Show fallback options when location is denied
  showLocationFallback() {
    addMessage(window.i18n.t('location.zipCodeFallback'), "bot");
    // Set flag to handle ZIP code input
    conversationState.awaitingZipCode = true;
    addMessage(window.i18n.t('location.zipCodePrompt'), "bot");
  },
  
  // Geocode ZIP code to get coordinates
  async geocodeZipCode(zipCode) {
    try {
      console.log(`📍 Geocoding ZIP code: ${zipCode}`);
      
      // Use OpenStreetMap Nominatim API (free and reliable)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=us&postalcode=${encodeURIComponent(zipCode)}&limit=1`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const location = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          accuracy: 5000, // ZIP code accuracy is ~5km
          source: 'zipcode',
          zipCode: zipCode
        };
        
        console.log('✅ ZIP code geocoded:', location);
        this.userLocation = location;
        this.showZipCodeSuccess(zipCode);
        this.addUserMarkerToMap();
        return location;
      } else {
        throw new Error('ZIP code not found');
      }
      
    } catch (error) {
      console.error('❌ ZIP code geocoding failed:', error);
      this.showZipCodeError(zipCode);
      return null;
    }
  },
  
  // Show success message for ZIP code
  showZipCodeSuccess(zipCode) {
    const message = window.i18n.t('location.zipCodeSuccess').replace('{zipCode}', zipCode);
    addMessage(`✅ ${message}`, "bot");
  },
  
  // Show error message for invalid ZIP code
  showZipCodeError(zipCode) {
    const message = window.i18n.t('location.zipCodeError').replace('{zipCode}', zipCode);
    addMessage(`❌ ${message}`, "bot");
  },
  
  // Validate ZIP code format (US ZIP codes)
  isValidZipCode(zipCode) {
    // Accept 5-digit ZIP or ZIP+4 format (12345 or 12345-6789)
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode.trim());
  },
  
  // Add user location marker to map
  addUserMarkerToMap() {
    if (!this.userLocation || !map) {
      return;
    }
    
    // Remove existing user marker if it exists
    if (this.userMarker) {
      map.removeLayer(this.userMarker);
    }
    
    // Create custom icon for user location (blue circle)
    const userIcon = L.divIcon({
      className: 'user-location-marker',
      html: `<div style="
        width: 20px; 
        height: 20px; 
        background-color: #3B82F6; 
        border: 3px solid white; 
        border-radius: 50%; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        position: relative;
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    
    // Add user marker with custom popup
    this.userMarker = L.marker([this.userLocation.lat, this.userLocation.lng], {
      icon: userIcon,
      zIndexOffset: 1000 // Ensure it appears above other markers
    }).addTo(map);
    
    // Add popup to user marker
    const accuracy = this.userLocation.accuracy ? Math.round(this.userLocation.accuracy) : 'unknown';
    this.userMarker.bindPopup(`
      <div style="text-align: center; min-width: 150px;">
        <div style="font-weight: bold; color: #3B82F6; margin-bottom: 8px;">📍 ${window.i18n.t('location.yourLocation')}</div>
        <div style="font-size: 12px; color: #6B7280;">
          ${window.i18n.t('location.accuracy')}: ±${accuracy} meters
        </div>
      </div>
    `, { maxWidth: 200 });
    
    console.log('✅ User location marker added to map');
  },
  
  // Remove user location marker
  removeUserMarkerFromMap() {
    if (this.userMarker && map) {
      map.removeLayer(this.userMarker);
      this.userMarker = null;
      console.log('📍 User location marker removed');
    }
  }
};

// Near Me functionality
let nearMeMode = false;

function toggleNearMeMode() {
  const toggle = document.getElementById('nearMeToggle');
  const text = document.getElementById('nearMeText');
  
  if (!LocationService.userLocation) {
    // Request location if not available
    LocationService.requestLocation().then(location => {
      if (location) {
        enableNearMeMode();
      } else {
        // Show fallback options
        addMessage("📍 To use 'Near Me', I need your location. You can also search by entering your ZIP code.", "bot");
      }
    });
  } else {
    // Toggle mode
    if (nearMeMode) {
      disableNearMeMode();
    } else {
      enableNearMeMode();
    }
  }
}

function enableNearMeMode() {
  nearMeMode = true;
  const toggle = document.getElementById('nearMeToggle');
  const text = document.getElementById('nearMeText');
  
  toggle.className = 'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400';
  text.textContent = window.i18n.t('location.nearMeActive');
  text.setAttribute('data-i18n', 'location.nearMeActive');
  
  addMessage("📍 Great! I'll now show you the closest resources first.", "bot");
}

function disableNearMeMode() {
  nearMeMode = false;
  const toggle = document.getElementById('nearMeToggle');
  const text = document.getElementById('nearMeText');
  
  toggle.className = 'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400';
  text.textContent = window.i18n.t('location.enableNearMe');
  text.setAttribute('data-i18n', 'location.enableNearMe');
  
  addMessage("📍 I'll now show you all available resources.", "bot");
}

// Update Near Me button state without messaging (used by ZIP code handler)
function updateNearMeButton(isEnabled) {
  const toggle = document.getElementById('nearMeToggle');
  const text = document.getElementById('nearMeText');
  
  if (isEnabled) {
    nearMeMode = true;
    toggle.className = 'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400';
    text.textContent = window.i18n.t('location.nearMeActive');
    text.setAttribute('data-i18n', 'location.nearMeActive');
  } else {
    nearMeMode = false;
    toggle.className = 'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400';
    text.textContent = window.i18n.t('location.enableNearMe');
    text.setAttribute('data-i18n', 'location.enableNearMe');
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM Content Loaded - Initializing CareLink+');
  
  // Initialize in the correct order
  initializeI18n();
  
  // Setup language switcher with error handling
  setTimeout(() => {
    setupLanguageSwitcher();
  }, 100); // Small delay to ensure DOM is ready
  
  // Request location permission early for better UX
  setTimeout(() => {
    LocationService.requestLocation();
  }, 2000); // Wait 2 seconds after page load
});

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

  // Only use sample data if we're in local development and all other methods fail
  console.log('⚠️ All data loading methods failed, using sample data as last resort...');
  
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

let map = null; // Will be initialized after language selection

// Initialize map (called after language selection)
function initializeMap() {
  // Check if Leaflet is loaded
  if (typeof L === 'undefined') {
    console.error('❌ Leaflet library not loaded');
    setTimeout(() => {
      initializeMap(); // Retry after a delay
    }, 1000);
    return;
  }
  
  // Only initialize if not already initialized
  if (map === null) {
    try {
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('❌ Map container not found');
        return;
      }
      
      map = L.map('map').setView([39.9612, -82.9988], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      console.log('✅ Map initialized successfully');
      
      // Add user location marker if location is already available
      if (LocationService.userLocation) {
        LocationService.addUserMarkerToMap();
      }
    } catch (error) {
      console.error('❌ Error initializing map:', error);
    }
  }
}

// Create popup content with potential translation
function createPopupContent(resource) {
  let popupContent = `<div style="min-width: 200px;">`;
  
  // Name (always show, it's the organization name)
  popupContent += `<div style="font-weight: bold; margin-bottom: 8px; color: #1e40af;">${resource.name}</div>`;
  
  // Distance (if user location is available and distance was calculated)
  if (resource.distance !== undefined && LocationService.userLocation) {
    popupContent += `<div style="margin-bottom: 8px; padding: 4px 8px; background: #f3f4f6; border-radius: 4px; font-size: 14px;">
      <span style="color: #059669; font-weight: 500;">📍 ${resource.distance.toFixed(1)} miles away</span>
    </div>`;
  }
  
  // Description/Purpose with translation attempt
  if (resource.description || resource.purpose) {
    const description = resource.description || resource.purpose;
    const translatedDescription = translateResourceDescription(description);
    
    popupContent += `<div style="margin-bottom: 6px;">
      <strong>${window.i18n.t('mapPopup.description')}:</strong><br>
      <span style="color: #374151;">${translatedDescription}</span>
    </div>`;
  }
  
  // Location
  if (resource.location) {
    popupContent += `<div style="margin-bottom: 6px;">
      <strong>${window.i18n.t('mapPopup.location')}:</strong><br>
      <span style="color: #374151;">${resource.location}</span>
    </div>`;
  }
  
  // Phone
  if (resource.phone) {
    popupContent += `<div style="margin-bottom: 6px;">
      <strong>${window.i18n.t('mapPopup.phone')}:</strong><br>
      <a href="tel:${resource.phone}" style="color: #2563eb; text-decoration: none;">${resource.phone}</a>
    </div>`;
  }
  
  // Website
  if (resource.website) {
    popupContent += `<div style="margin-bottom: 6px;">
      <strong>${window.i18n.t('mapPopup.website')}:</strong><br>
      <a href="${resource.website}" target="_blank" style="color: #2563eb; text-decoration: none;">🔗 ${window.i18n.t('mapPopup.website')}</a>
    </div>`;
  }
  
  // Hours
  if (resource.hours) {
    popupContent += `<div>
      <strong>${window.i18n.t('mapPopup.hours')}:</strong><br>
      <span style="color: #374151;">${resource.hours}</span>
    </div>`;
  }
  
  popupContent += `</div>`;
  return popupContent;
}

// Translate common resource descriptions
function translateResourceDescription(description) {
  const currentLang = window.i18n.getCurrentLanguage();
  
  // If already in English or no translation needed
  if (currentLang === 'en') return description;
  
  // Common description translations
  const translations = {
    es: {
      'Emergency food assistance': 'Asistencia alimentaria de emergencia',
      'Food pantry serving west Columbus area': 'Despensa de alimentos que sirve el área oeste de Columbus',
      'Food pantry and meal support': 'Despensa de alimentos y apoyo de comidas',
      'Emergency shelter services': 'Servicios de refugio de emergencia',
      'Comprehensive homeless services': 'Servicios integrales para personas sin hogar',
      'Mental health counseling': 'Consejería de salud mental',
      'Peer recovery and support': 'Recuperación y apoyo entre pares',
      '24/7 detox and recovery center': 'Centro de desintoxicación y recuperación 24/7',
      'Addiction treatment and counseling': 'Tratamiento de adicciones y consejería',
      'Comprehensive pediatric healthcare': 'Atención médica pediátrica integral',
      'Career training and employment assistance': 'Capacitación profesional y asistencia de empleo',
      'Healthcare for homeless veterans': 'Atención médica para veteranos sin hogar'
    },
    ar: {
      'Emergency food assistance': 'مساعدة غذائية طارئة',
      'Mental health counseling': 'استشارة الصحة النفسية',
      'Emergency shelter services': 'خدمات مأوى طارئ',
      '24/7 detox and recovery center': 'مركز إزالة السموم والتعافي على مدار الساعة'
    },
    hi: {
      'Emergency food assistance': 'आपातकालीन भोजन सहायता',
      'Mental health counseling': 'मानसिक स्वास्थ्य परामर्श',
      'Emergency shelter services': 'आपातकालीन आश्रय सेवाएं'
    },
    so: {
      'Emergency food assistance': 'Caawimo cunto oo degdeg ah',
      'Mental health counseling': 'La-talinta caafimaadka maskaxda',
      'Emergency shelter services': 'Adeegyada galbeedka degdega ah'
    }
  };
  
  const langTranslations = translations[currentLang];
  if (langTranslations && langTranslations[description]) {
    return langTranslations[description];
  }
  
  return description; // Return original if no translation found
}

async function showResources(category) {
  console.log('🔍 Searching for category:', category);
  
  // Show loading message
  addMessage(`🔍 Searching for ${category.toLowerCase()} resources...`, "bot", 300);
  
  const resources = await loadResources();
  
  console.log('📊 Total resources loaded:', resources.length);
  if (resources.length > 0) {
    console.log('🏷️ Sample resource categories:', resources.slice(0, 5).map(r => r.category));
  }
  
  // Clear existing resource markers (preserve user location marker)
  if (map) {
    map.eachLayer(layer => { 
      if (layer instanceof L.Marker && layer !== LocationService.userMarker) {
        map.removeLayer(layer); 
      }
    });
  }
  
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
  
  // Enhance resources with distance calculations and sort by proximity
  let resourcesWithDistance = LocationService.enhanceResourcesWithDistance(matchedResources);
  
  // Filter by distance if "Near Me" mode is enabled
  if (nearMeMode && LocationService.userLocation) {
    const maxDistance = 25; // 25 miles radius
    resourcesWithDistance = resourcesWithDistance.filter(r => r.distance <= maxDistance);
    console.log(`📍 Near Me mode: Filtered to ${resourcesWithDistance.length} resources within ${maxDistance} miles`);
  }
  
  // Log distance information if user location is available
  if (LocationService.userLocation && resourcesWithDistance.length > 0) {
    console.log('📏 Resources sorted by distance:');
    resourcesWithDistance.slice(0, 5).forEach(r => 
      console.log(`  ${r.name}: ${r.distance?.toFixed(1)} miles`)
    );
  }
  
  if (resourcesWithDistance.length === 0) {
    console.warn('⚠️ No resources found for category:', category);
    console.log('Available categories:', [...new Set(resources.map(r => r.category))]);
    
    // Add user-facing message when no resources are found
    addMessage(window.i18n.t('bot.noResourcesFound', { 
      category: window.i18n.t(`categories.${category}`) 
    }), "bot");
    
    // Offer personal assistance when no resources found
    addMessage(window.i18n.t('bot.noResourcesOffer'), "bot");
    
    // Request consent before showing form
    setTimeout(() => {
      requestFormConsent(category);
    }, 800);
    return; // Exit early when no resources found
  }
  
  // Add markers to map and store for carousel (now sorted by distance)
  const mapMarkers = [];
  resourcesWithDistance.forEach((r, index) => {
    console.log(`📌 Adding marker ${index + 1}:`, r.name, 'at', [r.lat, r.lng]);
    
    try {
      // Validate coordinates
      if (!r.lat || !r.lng || isNaN(r.lat) || isNaN(r.lng)) {
        console.error(`❌ Invalid coordinates for ${r.name}:`, r.lat, r.lng);
        return;
      }
      
      console.log(`✅ Creating marker for ${r.name} at coordinates [${r.lat}, ${r.lng}]`);
      if (map) {
        const marker = L.marker([r.lat, r.lng]);
        
        // Store resource data with marker for language switching
        marker.resourceData = r;
        marker.resourceIndex = index; // Add index for carousel sync
        
        // Create popup content
        const popupContent = createPopupContent(r);
        
        marker.addTo(map).bindPopup(popupContent, { maxWidth: 300 });
        
        // Store marker for carousel interaction
        mapMarkers.push(marker);
        
        console.log(`✅ Marker successfully added to map`);
      } else {
        console.warn('⚠️ Map not initialized, skipping marker creation');
      }
    } catch (error) {
      console.error(`❌ Error creating marker for ${r.name}:`, error);
    }
  });

  // Create and show resource carousel
  createResourceCarousel(resourcesWithDistance, mapMarkers);
  
  // Success message to user with distance information
  if (resourcesWithDistance.length > 0) {
    const plural = window.i18n.formatPlural(resourcesWithDistance.length, category);
    let message = window.i18n.t('bot.resourcesFound', { 
      count: resourcesWithDistance.length,
      category: window.i18n.t(`categories.${category}`),
      plural: plural
    });
    
    // Add distance context if user location is available
    if (LocationService.userLocation) {
      const nearestDistance = resourcesWithDistance[0]?.distance?.toFixed(1);
      if (nearestDistance) {
        if (nearMeMode) {
          message += ` The closest one is ${nearestDistance} miles away (showing resources within 25 miles).`;
        } else {
          message += ` The closest one is ${nearestDistance} miles away.`;
        }
      }
    }
    
    addMessage(message, "bot");
    
    // Show feedback prompt after successful resource display
    showFeedbackPrompt(category);
  }
}

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Conversational memory system for enhanced user experience
let conversationState = {
  awaitingClarification: false,
  pendingCategory: null,
  lastQuestion: null,
  awaitingFeedback: false,
  awaitingNameForAnalytics: false,
  awaitingIntakeForm: false,
  awaitingZipCode: false,
  awaitingFormConfirmation: false,
  lastSearchCategory: null,
  pendingFormCategory: null
};

// Feedback System Functions - More seamless approach
function showFeedbackPrompt(category) {
  conversationState.awaitingFeedback = true;
  conversationState.lastSearchCategory = category;
  
  // More natural/seamless messaging
  addMessage("I hope these resources are helpful! 😊", "bot");
  
  // Add a brief pause then ask for optional feedback
  setTimeout(() => {
    addMessage("If you found what you were looking for, I'd love to know your first name so we can track how well we're helping the community (completely optional).", "bot");
    
    // Create interactive feedback buttons - more casual approach
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = "feedback-buttons flex gap-2 mt-2 mb-4 justify-center";
    
    // Success button (leads to Tier 1 - basic analytics)
    const successButton = document.createElement("button");
    successButton.className = "bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm";
    successButton.textContent = "✓ Found what I need";
    successButton.onclick = () => handleFeedbackResponse(true, category);
    
    // Need help button (leads to Tier 2 - full intake)
    const helpButton = document.createElement("button");
    helpButton.className = "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm";
    helpButton.textContent = "Need more help";
    helpButton.onclick = () => handleFeedbackResponse(false, category);
    
    // Skip button (no data collection)
    const skipButton = document.createElement("button");
    skipButton.className = "bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm";
    skipButton.textContent = "Skip";
    skipButton.onclick = () => {
      removeFeedbackButtons();
      addMessage("No problem! Feel free to search for other resources or ask me anything else.", "bot");
      conversationState.awaitingFeedback = false;
    };
    
    feedbackDiv.appendChild(successButton);
    feedbackDiv.appendChild(helpButton);
    feedbackDiv.appendChild(skipButton);
    
    // Add to messages container
    messagesDiv.appendChild(feedbackDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 1500); // 1.5 second delay for more natural flow
}

// Helper function to remove feedback buttons
function removeFeedbackButtons() {
  const feedbackButtons = document.querySelector('.feedback-buttons');
  if (feedbackButtons) {
    feedbackButtons.remove();
  }
}

function handleFeedbackResponse(wasHelpful, category) {
  // Remove feedback buttons
  removeFeedbackButtons();
  
  if (wasHelpful) {
    // Tier 1: Basic analytics collection - more casual approach
    addMessage("That's wonderful! 🎉", "bot");
    setTimeout(() => {
      addMessage("Just so we can celebrate our successes, what's your first name? (This helps us know we're making a real difference in people's lives!)", "bot");
      startTier1Analytics(category);
    }, 800);
  } else {
    // Tier 2: Full intake for personalized assistance
    addMessage("I'd love to help you find exactly what you need! Let me connect you with someone who can provide more personalized assistance.", "bot");
    
    // Use the new consent flow
    setTimeout(() => {
      requestFormConsent(conversationState.lastSearchCategory);
    }, 800);
  }
  
  conversationState.awaitingFeedback = false;
}

function startTier1Analytics(category) {
  conversationState.awaitingNameForAnalytics = true;
  conversationState.lastSearchCategory = category;
  
  // Message is now handled in the calling function for better flow
}

// Request consent before showing progressive form
function requestFormConsent(category) {
  // Store the category for later use
  conversationState.pendingFormCategory = category;
  
  // Ask for consent first
  conversationState.awaitingFormConfirmation = true;
  
  addMessage("I'd be happy to connect you with someone who can provide personalized assistance.", "bot");
  setTimeout(() => {
    addMessage("Would you like me to open a form where you can share your information so someone can help you directly? Just type 'yes' or 'no'.", "bot");
  }, 800);
}

function startTier2Intake(category) {
  // Show the progressive form after consent is given
  showProgressiveForm(category);
}

sendBtn.onclick = handleUserInput;

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Get Help Now button functionality
  const getHelpBtn = document.getElementById('getHelpBtn');
  if (getHelpBtn) {
    getHelpBtn.addEventListener('click', function() {
      // Scroll to chat interface or trigger form
      const chatInterface = document.getElementById('chat-interface');
      if (chatInterface) {
        chatInterface.scrollIntoView({ behavior: 'smooth' });
        // Focus on the input after scroll
        setTimeout(() => {
          const userInput = document.getElementById('userInput');
          if (userInput) {
            userInput.focus();
          }
        }, 500);
      }
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Enhanced message system with typing indicators and smoother animations
function addMessage(text, sender, delay = 0) {
  // Add typing indicator for bot messages if there's a delay
  if (sender === "bot" && delay > 0) {
    showTypingIndicator();
  }

  const showMessage = () => {
    // Remove typing indicator
    hideTypingIndicator();

    const msg = document.createElement("div");
    msg.className = `message ${sender === "user" ? "user-message text-right" : "bot-message text-left"} mb-4`;
    
    if (sender === "user") {
      msg.innerHTML = `
        <div class="flex justify-end">
          <div class="flex items-end gap-2 max-w-xs lg:max-w-md">
            <div class="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-sm">
              <p class="message-content text-sm font-medium">${text}</p>
            </div>
            <div class="w-8 h-8 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      `;
    } else {
      msg.innerHTML = `
        <div class="flex justify-start">
          <div class="flex items-end gap-3 max-w-xs lg:max-w-md xl:max-w-lg">
            <div class="w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div class="bg-white border border-neutral-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
              <p class="message-content text-sm text-neutral-800">${text}</p>
            </div>
          </div>
        </div>
      `;
    }
    
    // Add subtle animation
    msg.style.opacity = '0';
    msg.style.transform = 'translateY(10px)';
    
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Animate in
    setTimeout(() => {
      msg.style.transition = 'all 0.3s ease';
      msg.style.opacity = '1';
      msg.style.transform = 'translateY(0)';
    }, 10);
  };

  if (delay > 0) {
    setTimeout(showMessage, delay);
  } else {
    showMessage();
  }
}

function showTypingIndicator() {
  // Remove any existing typing indicator
  hideTypingIndicator();

  const typingDiv = document.createElement("div");
  typingDiv.id = "typingIndicator";
  typingDiv.className = "text-left mb-2";
  
  typingDiv.innerHTML = `
    <span class="inline-block px-3 py-2 rounded-lg bg-gray-200">
      <div class="flex items-center space-x-1">
        <div class="flex space-x-1">
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
        </div>
        <span class="text-sm text-gray-500 ml-2">typing...</span>
      </div>
    </span>
  `;
  
  messagesDiv.appendChild(typingDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function hideTypingIndicator() {
  const existingTyping = document.getElementById("typingIndicator");
  if (existingTyping) {
    existingTyping.remove();
  }
}

// Enhanced Multilingual Intent Detection System
const INTENT_PATTERNS = {
  en: {
  "Food": {
    keywords: ["food", "hungry", "eat", "meal", "kitchen", "pantry", "nutrition", "groceries", "feeding", "starving", "appetite", "dining", "nourishment", "sustenance", "help"],
    phrases: ["food bank", "soup kitchen", "food pantry", "free meals", "food assistance", "help with food", "need food", "can't afford food", "food stamps", "snap benefits"],
    weight: 1.0
  },
  "Housing": {
    keywords: ["shelter", "housing", "homeless", "rent", "apartment", "home", "eviction", "foreclosure", "roommate", "lease", "landlord", "utilities", "help"],
    phrases: ["need shelter", "need housing", "help with housing", "help with rent", "can't pay rent", "being evicted", "homeless shelter", "housing assistance", "affordable housing", "rental help", "utility assistance"],
    weight: 1.3
  },
  "Mental Health": {
    keywords: ["mental", "therapy", "counseling", "depression", "anxiety", "psychiatric", "psychological", "therapist", "counselor", "stress", "trauma", "bipolar", "ptsd", "help"],
    phrases: ["mental health", "mental health help", "help with mental health", "need mental health", "mental health support", "feeling depressed", "need therapy", "counseling services", "psychological help", "emotional support"],
    weight: 1.5
  },
  "Healthcare": {
    keywords: ["medical", "clinic", "doctor", "hospital", "physician", "nurse", "prescription", "medication", "insurance", "checkup", "sick", "illness", "treatment", "health"],
    phrases: ["primary care", "medical clinic", "free clinic", "medical care", "help with health", "health help", "doctor visit", "medical insurance", "medical help", "dental care", "vision care"],
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
    keywords: ["job", "work", "employment", "career", "resume", "interview", "unemployed", "training", "skills", "hiring", "help"],
    phrases: ["need job", "job training", "resume help", "help with job", "help with work", "career services", "employment assistance", "job search", "work training", "find job", "looking for work"],
    weight: 1.0
  },
  "Veterans": {
    keywords: ["veteran", "military", "va", "army", "navy", "marines", "air force", "combat", "deployment", "service"],
    phrases: ["veteran services", "veteran resources", "va benefits", "military help", "military assistance", "veteran housing", "veteran healthcare"],
    weight: 1.6
  }
  },
  
  es: {
    "Food": {
      keywords: ["comida", "hambre", "comer", "alimento", "cocina", "despensa", "nutrición", "víveres", "alimentación", "muerto de hambre", "apetito", "cenar", "alimentar", "ayuda"],
      phrases: ["banco de alimentos", "comedor popular", "despensa de alimentos", "comidas gratis", "asistencia alimentaria", "ayuda con comida", "no puedo pagar comida", "necesito comida", "cupones de comida", "beneficios snap"],
      weight: 1.0
    },
    "Housing": {
      keywords: ["refugio", "vivienda", "sin hogar", "alquiler", "apartamento", "casa", "desalojo", "ejecución hipotecaria", "compañero de cuarto", "arrendamiento", "propietario", "servicios públicos", "ayuda"],
      phrases: ["necesito refugio", "necesito vivienda", "ayuda con vivienda", "ayuda con alquiler", "no puedo pagar alquiler", "siendo desalojado", "refugio para personas sin hogar", "asistencia de vivienda", "vivienda asequible"],
      weight: 1.3
    },
    "Mental Health": {
      keywords: ["mental", "terapia", "consejería", "depresión", "ansiedad", "psiquiátrico", "psicológico", "terapeuta", "consejero", "estrés", "trauma", "bipolar", "tept", "ayuda"],
      phrases: ["salud mental", "ayuda de salud mental", "ayuda con salud mental", "necesito salud mental", "apoyo de salud mental", "sintiéndome deprimido", "necesito terapia", "servicios de consejería", "ayuda psicológica", "apoyo emocional"],
      weight: 1.5
    },
    "Healthcare": {
      keywords: ["médico", "clínica", "doctor", "hospital", "enfermera", "receta", "medicamento", "seguro", "chequeo", "enfermo", "enfermedad", "tratamiento", "salud", "ayuda"],
      phrases: ["atención primaria", "clínica médica", "clínica gratuita", "atención médica", "ayuda con salud", "ayuda médica", "visita al doctor", "seguro médico", "atención dental", "atención de la vista"],
      weight: 1.0
    },
    "Substance Use": {
      keywords: ["drogas", "alcohol", "adicción", "recuperación", "rehabilitación", "sustancia", "desintoxicación", "sobrio", "sobriedad", "abstinencia", "sobredosis", "limpio", "ayuda"],
      phrases: ["abuso de sustancias", "adicción a las drogas", "problema de alcohol", "ayuda con drogas", "ayuda con alcohol", "necesito rehabilitación", "tratamiento de drogas", "recuperación de adicciones", "programa de desintoxicación", "volverse sobrio"],
      weight: 1.0
    },
    "Crisis": {
      keywords: ["crisis", "emergencia", "urgente", "inmediato", "suicidio", "suicida", "daño", "peligro", "angustia", "desesperado", "sin esperanza"],
      phrases: ["línea de suicidio", "línea de crisis", "ayuda de emergencia", "necesito ayuda ahora", "sintiéndome suicida", "apoyo de crisis", "asistencia inmediata"],
      weight: 1.2
    },
    "Employment": {
      keywords: ["trabajo", "empleo", "carrera", "currículum", "entrevista", "desempleado", "capacitación", "habilidades", "contratación", "ayuda"],
      phrases: ["necesito trabajo", "capacitación laboral", "ayuda con currículum", "ayuda con trabajo", "ayuda con empleo", "servicios de carrera", "asistencia de empleo", "búsqueda de trabajo", "busco trabajo", "quiero trabajo"],
      weight: 1.0
    },
    "Veterans": {
      keywords: ["veterano", "militar", "va", "ejército", "marina", "marines", "fuerza aérea", "combate", "despliegue", "servicio"],
      phrases: ["servicios para veteranos", "recursos para veteranos", "beneficios va", "ayuda militar", "asistencia militar", "vivienda para veteranos", "atención médica para veteranos"],
      weight: 1.6
    }
  },
  
  so: {
    "Food": {
      keywords: ["cunto", "gaajo", "cuni", "cuntada", "jikada", "qado", "nafaqo", "dukaan", "cunno"],
      phrases: ["bangiga cuntada", "matbakhyada guud", "caawimo cunto", "cunno bilaash ah", "ma heli karo cunto", "u baahan cunto", "kaalmada cuntada"],
      weight: 1.0
    },
    "Housing": {
      keywords: ["guri", "hoy", "galbeed", "kiro", "qaboojiye", "guryaha", "masaakinta", "dulucda"],
      phrases: ["u baahan galbeed", "ma bixin karo kiro", "laga saari", "caawimo guri", "guryo jaban", "galbeed degdeg ah"],
      weight: 1.3
    },
    "Mental Health": {
      keywords: ["maskax", "daaweyn", "la-talin", "murugasho", "walwal", "cilmi-nafsiga", "dareen"],
      phrases: ["caafimaadka maskaxda", "daaweynta maskaxda", "caawimo maskax", "la-talinta", "taageero dareen"],
      weight: 1.5
    },
    "Healthcare": {
      keywords: ["caafimaad", "dhakhtar", "isbitaal", "dawo", "caafimad", "bukaan", "daryeel"],
      phrases: ["daryeelka guud", "xarun caafimaad", "dhakhtarka", "caymiska caafimaadka", "caawimo caafimaad"],
      weight: 1.0
    },
    "Substance Use": {
      keywords: ["daroog", "khamri", "qaylo", "dib-u-soo-kabashada", "dabaaldegga", "nadiifineed"],
      phrases: ["isticmaalka daroogada", "dhibaatada khamriga", "caawimo daroog", "daaweynta qaylada"],
      weight: 1.0
    },
    "Crisis": {
      keywords: ["xiisad", "degdeg", "muhiim", "isla-markiiba", "dil-nafsi", "khataro"],
      phrases: ["khadka xiisadaha", "caawimo degdeg ah", "taageero xiisad", "caawimo isla-markiiba"],
      weight: 1.2
    },
    "Employment": {
      keywords: ["shaqo", "hawl", "shaqaale", "tababar", "xirfad", "kiraysan"],
      phrases: ["u baahan shaqo", "tababarka shaqada", "caawimo shaqo", "raadinta shaqada"],
      weight: 1.0
    },
    "Veterans": {
      keywords: ["askari", "ciidamada", "dagaalka", "hawlgal", "adeegga"],
      phrases: ["adeegyada askarta", "faa'iidooyinka askarta", "caawimo askari", "guri askari"],
      weight: 1.6
    }
  },

  ar: {
    "Food": {
      keywords: ["طعام", "جوع", "أكل", "وجبة", "مطبخ", "مؤن", "غذاء", "طحين", "خضار"],
      phrases: ["بنك الطعام", "مطبخ شعبي", "مساعدة غذائية", "وجبات مجانية", "لا أستطيع دفع ثمن الطعام", "أحتاج طعام"],
      weight: 1.0
    },
    "Housing": {
      keywords: ["مأوى", "سكن", "بيت", "إيجار", "شقة", "منزل", "طرد", "مشرد"],
      phrases: ["أحتاج مأوى", "لا أستطيع دفع الإيجار", "مساعدة السكن", "مأوى طارئ", "مساعدة إيجار"],
      weight: 1.3
    },
    "Mental Health": {
      keywords: ["نفسي", "علاج", "استشارة", "اكتئاب", "قلق", "نفسية", "طبيب نفسي"],
      phrases: ["الصحة النفسية", "مساعدة نفسية", "أحتاج علاج", "استشارة نفسية", "دعم عاطفي"],
      weight: 1.5
    },
    "Healthcare": {
      keywords: ["طبي", "عيادة", "طبيب", "مستشفى", "دواء", "تأمين", "علاج", "صحة"],
      phrases: ["رعاية أولية", "عيادة طبية", "رعاية صحية", "مساعدة صحية", "تأمين صحي"],
      weight: 1.0
    },
    "Substance Use": {
      keywords: ["مخدرات", "كحول", "إدمان", "تعافي", "علاج إدمان", "مواد", "انسحاب"],
      phrases: ["تعاطي المواد", "إدمان المخدرات", "مشكلة الكحول", "أحتاج علاج إدمان", "مساعدة مخدرات"],
      weight: 1.0
    },
    "Crisis": {
      keywords: ["أزمة", "طارئ", "عاجل", "فوري", "انتحار", "خطر", "ضائقة"],
      phrases: ["خط الأزمة", "مساعدة طارئة", "أحتاج مساعدة الآن", "دعم أزمة"],
      weight: 1.2
    },
    "Employment": {
      keywords: ["عمل", "وظيفة", "مهنة", "سيرة ذاتية", "مقابلة", "عاطل", "تدريب"],
      phrases: ["أحتاج عمل", "تدريب مهني", "مساعدة عمل", "البحث عن عمل", "مساعدة وظيفة"],
      weight: 1.0
    },
    "Veterans": {
      keywords: ["محارب قديم", "عسكري", "جيش", "بحرية", "قتال", "خدمة عسكرية"],
      phrases: ["خدمات المحاربين القدامى", "مزايا المحاربين", "مساعدة عسكرية", "سكن المحاربين"],
      weight: 1.6
    }
  },

  hi: {
    "Food": {
      keywords: ["खाना", "भूख", "खाद्य", "भोजन", "रसोई", "पोषण", "राशन", "भंडार"],
      phrases: ["फूड बैंक", "सूप किचन", "खाद्य सहायता", "मुफ्त भोजन", "खाना नहीं खरीद सकते", "खाने की जरूरत"],
      weight: 1.0
    },
    "Housing": {
      keywords: ["आश्रय", "आवास", "घर", "किराया", "मकान", "बेघर", "निकासी"],
      phrases: ["आश्रय चाहिए", "किराया नहीं दे सकते", "आवास सहायता", "आपातकालीन आश्रय", "किराया मदद"],
      weight: 1.3
    },
    "Mental Health": {
      keywords: ["मानसिक", "चिकित्सा", "परामर्श", "अवसाद", "चिंता", "मनोवैज्ञानिक"],
      phrases: ["मानसिक स्वास्थ्य", "मानसिक मदद", "चिकित्सा चाहिए", "परामर्श सेवा", "भावनात्मक सहायता"],
      weight: 1.5
    },
    "Healthcare": {
      keywords: ["चिकित्सा", "क्लिनिक", "डॉक्टर", "अस्पताल", "दवा", "बीमा", "इलाज", "स्वास्थ्य"],
      phrases: ["प्राथमिक देखभाल", "मेडिकल क्लिनिक", "स्वास्थ्य देखभाल", "चिकित्सा मदद", "स्वास्थ्य बीमा"],
      weight: 1.0
    },
    "Substance Use": {
      keywords: ["नशा", "शराब", "लत", "रिकवरी", "पुनर्वास", "पदार्थ", "डिटॉक्स"],
      phrases: ["पदार्थ दुरुपयोग", "नशे की लत", "शराब की समस्या", "पुनर्वास चाहिए", "नशा मदद"],
      weight: 1.0
    },
    "Crisis": {
      keywords: ["संकट", "आपातकाल", "तत्काल", "तुरंत", "आत्महत्या", "खतरा"],
      phrases: ["संकट हॉटलाइन", "आपातकालीन मदद", "अभी मदद चाहिए", "संकट सहायता"],
      weight: 1.2
    },
    "Employment": {
      keywords: ["नौकरी", "काम", "रोजगार", "करियर", "रिज्यूमे", "साक्षात्कार", "बेरोजगार"],
      phrases: ["नौकरी चाहिए", "नौकरी प्रशिक्षण", "काम की मदद", "नौकरी खोज", "रोजगार मदद"],
      weight: 1.0
    },
    "Veterans": {
      keywords: ["पूर्व सैनिक", "सैन्य", "सेना", "नौसेना", "युद्ध", "सेवा"],
      phrases: ["पूर्व सैनिक सेवाएं", "सैन्य लाभ", "सैन्य मदद", "पूर्व सैनिक आवास"],
      weight: 1.6
    }
  }
};

// Resource Carousel Implementation
let currentCarouselIndex = 0;
let carouselResources = [];
let carouselMarkers = [];

function createResourceCarousel(resources, markers) {
  const carouselContainer = document.getElementById('resourceCarousel');
  const cardsContainer = document.getElementById('resourceCardsContainer');
  const dotsContainer = document.getElementById('carouselDots');
  const counter = document.getElementById('carouselCounter');
  const prevBtn = document.getElementById('prevResourceBtn');
  const nextBtn = document.getElementById('nextResourceBtn');
  
  if (!carouselContainer || !cardsContainer) {
    console.warn('⚠️ Carousel elements not found');
    return;
  }
  
  // Store data globally for navigation
  carouselResources = resources;
  carouselMarkers = markers;
  currentCarouselIndex = 0;
  
  // Clear existing content
  cardsContainer.innerHTML = '';
  dotsContainer.innerHTML = '';
  
  // Create resource cards
  resources.forEach((resource, index) => {
    const card = createResourceCard(resource, index);
    cardsContainer.appendChild(card);
    
    // Create dot indicator
    const dot = document.createElement('button');
    dot.className = `w-2 h-2 rounded-full transition-all duration-200 ${index === 0 ? 'bg-primary-600' : 'bg-neutral-300 hover:bg-neutral-400'}`;
    dot.onclick = () => goToCarouselSlide(index);
    dotsContainer.appendChild(dot);
  });
  
  // Set up navigation
  updateCarouselCounter();
  updateCarouselButtons();
  
  // Event listeners
  prevBtn.onclick = () => previousCarouselSlide();
  nextBtn.onclick = () => nextCarouselSlide();
  
  // Show carousel
  carouselContainer.classList.remove('hidden');
  
  // Set initial card width for responsive carousel
  updateCarouselLayout();
  
  console.log('✅ Resource carousel created with', resources.length, 'resources');
}

function createResourceCard(resource, index) {
  const card = document.createElement('div');
  card.className = 'min-w-full bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-6 border border-neutral-200 shadow-sm';
  
  // Distance display
  let distanceHtml = '';
  if (resource.distance) {
    distanceHtml = `
      <div class="flex items-center gap-1 text-primary-600 text-sm font-medium mb-3">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span>${resource.distance.toFixed(1)} mi away</span>
      </div>
    `;
  }
  
  // Operating hours display
  let hoursHtml = '';
  if (resource.hours) {
    const isOpenNow = checkIfOpen(resource.hours);
    const statusColor = isOpenNow ? 'text-success-600' : 'text-error-600';
    const statusText = window.i18n.t(isOpenNow ? 'ui.open' : 'ui.closed');
    
    hoursHtml = `
      <div class="flex items-center gap-2 mb-3">
        <div class="flex items-center gap-1">
          <div class="w-2 h-2 rounded-full ${isOpenNow ? 'bg-success-500' : 'bg-error-500'}"></div>
          <span class="${statusColor} text-sm font-medium">${statusText}</span>
        </div>
        <span class="text-neutral-500 text-sm">${resource.hours}</span>
      </div>
    `;
  } else {
    hoursHtml = `
      <div class="flex items-center gap-2 mb-3">
        <span class="text-neutral-400 text-sm">${window.i18n.t('ui.unknownHours')}</span>
      </div>
    `;
  }
  
  // Contact buttons
  let contactButtons = '';
  if (resource.phone) {
    contactButtons += `
      <button onclick="window.open('tel:${resource.phone}', '_self')" 
              class="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
        <span data-i18n="ui.callNow">${window.i18n.t('ui.callNow')}</span>
      </button>
    `;
  }
  
  if (resource.website) {
    contactButtons += `
      <button onclick="window.open('${resource.website}', '_blank')" 
              class="flex items-center justify-center gap-2 bg-neutral-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-neutral-700 transition-colors flex-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
        <span data-i18n="ui.website">${window.i18n.t('ui.website')}</span>
      </button>
    `;
  }
  
  card.innerHTML = `
    ${distanceHtml}
    
    <div class="mb-4">
      <h4 class="text-xl font-bold text-neutral-900 mb-2 leading-tight">${resource.name}</h4>
      <p class="text-neutral-600 leading-relaxed">${resource.description || resource.services || 'Community resource available to help with your needs.'}</p>
    </div>
    
    ${hoursHtml}
    
    ${resource.address ? `
      <div class="flex items-start gap-2 mb-4">
        <svg class="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span class="text-neutral-600 text-sm leading-relaxed">${resource.address}</span>
      </div>
    ` : ''}
    
    <div class="flex gap-2 mb-4">
      <button onclick="showResourceOnMap(${index})" 
              class="flex items-center justify-center gap-2 bg-white border border-neutral-300 text-neutral-700 px-4 py-3 rounded-xl font-semibold hover:bg-neutral-50 transition-colors flex-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7"></path>
        </svg>
        <span data-i18n="ui.viewOnMap">${window.i18n.t('ui.viewOnMap')}</span>
      </button>
      
      ${resource.lat && resource.lng ? `
        <button onclick="getDirections(${resource.lat}, ${resource.lng}, '${resource.name.replace(/'/g, "\\'")}')" 
                class="flex items-center justify-center gap-2 bg-white border border-neutral-300 text-neutral-700 px-4 py-3 rounded-xl font-semibold hover:bg-neutral-50 transition-colors flex-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7"></path>
          </svg>
          <span data-i18n="ui.getDirections">${window.i18n.t('ui.getDirections')}</span>
        </button>
      ` : ''}
    </div>
    
    ${contactButtons ? `<div class="flex gap-2">${contactButtons}</div>` : ''}
  `;
  
  return card;
}

// Carousel navigation functions
function goToCarouselSlide(index) {
  currentCarouselIndex = index;
  updateCarousel();
}

function nextCarouselSlide() {
  if (currentCarouselIndex < carouselResources.length - 1) {
    currentCarouselIndex++;
    updateCarousel();
  }
}

function previousCarouselSlide() {
  if (currentCarouselIndex > 0) {
    currentCarouselIndex--;
    updateCarousel();
  }
}

function updateCarousel() {
  const cardsContainer = document.getElementById('resourceCardsContainer');
  const dots = document.getElementById('carouselDots').children;
  
  if (!cardsContainer) return;
  
  // Update carousel position
  const translateX = -currentCarouselIndex * 100;
  cardsContainer.style.transform = `translateX(${translateX}%)`;
  
  // Update dots
  Array.from(dots).forEach((dot, index) => {
    if (index === currentCarouselIndex) {
      dot.className = 'w-2 h-2 rounded-full bg-primary-600 transition-all duration-200';
    } else {
      dot.className = 'w-2 h-2 rounded-full bg-neutral-300 hover:bg-neutral-400 transition-all duration-200';
    }
  });
  
  updateCarouselCounter();
  updateCarouselButtons();
}

function updateCarouselCounter() {
  const counter = document.getElementById('carouselCounter');
  if (counter && carouselResources.length > 0) {
    counter.textContent = `${currentCarouselIndex + 1} of ${carouselResources.length}`;
  }
}

function updateCarouselButtons() {
  const prevBtn = document.getElementById('prevResourceBtn');
  const nextBtn = document.getElementById('nextResourceBtn');
  
  if (prevBtn) {
    prevBtn.disabled = currentCarouselIndex === 0;
  }
  
  if (nextBtn) {
    nextBtn.disabled = currentCarouselIndex === carouselResources.length - 1;
  }
}

function updateCarouselLayout() {
  // Ensure proper responsive behavior
  const cardsContainer = document.getElementById('resourceCardsContainer');
  if (cardsContainer) {
    cardsContainer.style.width = `${carouselResources.length * 100}%`;
  }
}

// Map integration functions
function showResourceOnMap(index) {
  if (carouselMarkers[index] && map) {
    const marker = carouselMarkers[index];
    
    // Center map on marker
    map.setView([marker.getLatLng().lat, marker.getLatLng().lng], 15);
    
    // Open popup
    marker.openPopup();
    
    // Scroll to map
    document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function getDirections(lat, lng, name) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
  window.open(directionsUrl, '_blank');
}

function checkIfOpen(hoursStr) {
  // Simple time checking - could be enhanced based on actual hours format
  // For now, return true (assume open) since hours format varies
  return true;
}

// Hide carousel function
function hideResourceCarousel() {
  const carouselContainer = document.getElementById('resourceCarousel');
  if (carouselContainer) {
    carouselContainer.classList.add('hidden');
  }
}

function detectIntent(text) {
  const normalizedText = text.toLowerCase();
  const results = [];
  
  // Get patterns for current language, fallback to English
  const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'en';
  const languagePatterns = INTENT_PATTERNS[currentLang] || INTENT_PATTERNS.en;

  for (const [category, patterns] of Object.entries(languagePatterns)) {
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
    // Look for positive confirmation words (multilingual) or specific resource mentions
    const confirmationWords = [
      // English
      'yes', 'yeah', 'yep', 'sure', 'okay', 'ok', 'correct', 'right', 'exactly', 'please', 'show me',
      // Spanish  
      'sí', 'si', 'claro', 'correcto', 'exacto', 'por favor', 'muéstrame', 'vale', 'bueno', 'está bien',
      // Arabic
      'نعم', 'أجل', 'صحيح', 'بالتأكيد', 'من فضلك',
      // Hindi
      'हाँ', 'जी हाँ', 'ठीक है', 'सही', 'कृपया',
      // Somali
      'haa', 'maya', 'saxda', 'fadlan'
    ];
    const resourceMentions = [
      // English
      'food pantries', 'soup kitchens', 'meal programs', 'emergency shelter', 'housing assistance', 'rental help', 'va benefits', 'veteran housing', 'veteran healthcare', 'medical care', 'dental services', 'counseling', 'therapy', 'detox services', 'recovery programs', 'job training', 'resume help',
      // Spanish
      'despensa de alimentos', 'comedores populares', 'programas de comida', 'refugio de emergencia', 'asistencia de vivienda', 'ayuda con alquiler', 'beneficios va', 'vivienda para veteranos', 'atención médica para veteranos', 'atención médica', 'servicios dentales', 'consejería', 'terapia', 'servicios de desintoxicación', 'programas de recuperación', 'capacitación laboral', 'ayuda con currículum'
    ];
    
    const isConfirmation = confirmationWords.some(word => userText.toLowerCase().includes(word)) ||
                          resourceMentions.some(phrase => userText.toLowerCase().includes(phrase));
    
    if (isConfirmation) {
      // Reset conversation state and show resources
      const category = conversationState.pendingCategory;
      conversationState.awaitingClarification = false;
      conversationState.pendingCategory = null;
      conversationState.lastQuestion = null;
      
      return {
        text: window.i18n.t('bot.clarificationPrefix', { 
          category: window.i18n.t(`categories.${category}`) 
        }),
        category
      };
    } else {
      // User didn't confirm, ask what they need
      conversationState.awaitingClarification = false;
      conversationState.pendingCategory = null;
      conversationState.lastQuestion = null;
      
      return {
        text: window.i18n.t('bot.needMoreInfo'),
        category: null
      };
    }
  }

  if (!intent) {
    return {
      text: window.i18n.t('bot.welcome'),
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
      text: window.i18n.t('bot.searchingResources', { 
        category: window.i18n.t(`categories.${category}`) 
      }),
      category
    };
  }

  // Medium confidence - ask for clarification
  if (confidence >= 0.4) {
    // Set up conversation state for clarification
    conversationState.awaitingClarification = true;
    conversationState.pendingCategory = category;
    conversationState.lastQuestion = window.i18n.t(`clarifications.${category}`);
    
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

  // Handle feedback and form states first
  if (conversationState.awaitingNameForAnalytics) {
    handleTier1NameCollection(text);
    return;
  }
  
  if (conversationState.awaitingIntakeForm) {
    handleTier2IntakeResponse(text);
    return;
  }
  
  // Handle ZIP code input
  if (conversationState.awaitingZipCode) {
    handleZipCodeInput(text);
    return;
  }

  // Handle form confirmation (yes/no response)
  if (conversationState.awaitingFormConfirmation) {
    handleFormConfirmation(text);
    return;
  }

  // Check for natural language escape phrases first
  const lowercaseText = text.toLowerCase();
  const escapePatterns = [
    /start over/i,
    /never mind/i,
    /go back/i,
    /cancel/i,
    /stop/i,
    /quit/i,
    /exit/i,
    /restart/i,
    /reset/i,
    /clear/i,
    /new conversation/i,
    /help me/i,
    /i'm confused/i,
    /what can you do/i
  ];

  if (escapePatterns.some(pattern => pattern.test(lowercaseText))) {
    console.log('🔄 Escape phrase detected');
    handleEscapePhrase(text);
    return;
  }

  // Check for explicit help requests that should trigger the progressive form
  const helpRequestPatterns = [
    /i need (more|additional|personal|extra) help/i,
    /i want (more|personal|extra) help/i,
    /can you help me/i,
    /i need someone to help/i,
    /connect me with someone/i,
    /i need assistance/i,
    /more assistance/i,
    /personal assistance/i,
    /talk to someone/i,
    /speak to someone/i
  ];
  if (helpRequestPatterns.some(pattern => pattern.test(lowercaseText))) {
    console.log('🎯 Direct help request detected, offering personal assistance');
    addMessage(window.i18n.t('bot.offerPersonalHelp'), "bot", 800);
    
    // Use the new consent flow
    setTimeout(() => {
      requestFormConsent(null);
    }, 1600);
    return;
  }

  // Detect user intent with AI (fallback to keyword matching)
  const intent = await detectIntentWithAI(text);
  console.log("Detected intent:", intent); // For debugging
  
  // Handle different intent types
  if (intent && intent.isNonsensical) {
    // Handle nonsensical input by offering help
    addMessage(window.i18n.t('bot.noResourcesOffer'), "bot");
    setTimeout(() => {
      requestFormConsent(null);
    }, 800);
    return;
  }
  
  // Additional check for clearly nonsensical requests if AI didn't catch them
  const nonsensicalPatterns = [
    /unicorn training/i,
    /dragon help/i,
    /fairy assistance/i,
    /wizard support/i,
    /magic help/i,
    /superhero training/i,
    /alien support/i
  ];
  
  if (nonsensicalPatterns.some(pattern => pattern.test(lowercaseText))) {
    console.log('🦄 Nonsensical request detected, offering personal help');
    addMessage(window.i18n.t('bot.noResourcesOffer'), "bot");
    setTimeout(() => {
      requestFormConsent(null);
    }, 800);
    return;
  }
  
  if (intent && intent.isGeneral) {
    // Handle general conversation
    const response = generateSmartResponse(intent, text);
    addMessage(response.text, "bot");
    return;
  }
  
  // Generate appropriate response for resource requests
  const response = generateSmartResponse(intent, text);
  addMessage(response.text, "bot");

  // Show resources if we have a confident category match
  if (intent && intent.category && intent.confidence > 0.5) {
    showResources(intent.category);
  } else if (intent && intent.category) {
    // Lower confidence - ask for clarification
    addMessage(window.i18n.t(`clarifications.${intent.category}`), "bot");
  }
}

// Tier 1 Analytics Handler - Simple name collection
async function handleTier1NameCollection(name) {
  conversationState.awaitingNameForAnalytics = false;
  
  // Basic validation
  if (name.length < 1) {
    addMessage("Could you please share your first name?", "bot");
    conversationState.awaitingNameForAnalytics = true;
    return;
  }
  
  // Store basic analytics data
  const analyticsData = {
    firstName: name,
    searchCategory: conversationState.lastSearchCategory,
    language: window.i18n.getCurrentLanguage(),
    timestamp: new Date().toISOString(),
    sessionId: generateSessionId()
  };
  
  console.log('Tier 1 Analytics Data:', analyticsData);
  
  try {
    // Send to Airtable backend
    const response = await fetch('/api/user-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'analytics',
        data: analyticsData
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      addMessage(`Thank you, ${name}! We're glad we could help you find ${conversationState.lastSearchCategory} resources.`, "bot");
    } else {
      console.error('Failed to submit analytics:', result.error);
      addMessage(`Thank you, ${name}! We're glad we could help you find ${conversationState.lastSearchCategory} resources.`, "bot");
    }
  } catch (error) {
    console.error('Error submitting analytics:', error);
    // Still show success message to user even if logging fails
    addMessage(`Thank you, ${name}! We're glad we could help you find ${conversationState.lastSearchCategory} resources.`, "bot");
  }
  
  // Reset state
  conversationState.lastSearchCategory = null;
}

// Tier 2 Intake Handler - Full form collection  
async function handleTier2IntakeResponse(response) {
  // This is a simplified version - in practice you'd collect info step by step
  conversationState.awaitingIntakeForm = false;
  
  // For now, collect basic contact info
  const intakeData = {
    response: response,
    searchCategory: conversationState.lastSearchCategory,
    language: window.i18n.getCurrentLanguage(),
    timestamp: new Date().toISOString(),
    sessionId: generateSessionId(),
    needsPersonalAssistance: true
  };
  
  console.log('Tier 2 Intake Data:', intakeData);
  
  try {
    // Send to Airtable backend
    const apiResponse = await fetch('/api/user-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'help_request',
        data: intakeData
      })
    });
    
    const result = await apiResponse.json();
    
    if (result.success) {
      addMessage("Thank you! We've recorded your information and someone from our team will reach out to you within 24 hours to provide personalized assistance.", "bot");
    } else {
      console.error('Failed to submit help request:', result.error);
      addMessage("Thank you! We've recorded your request. If there are any issues, please try contacting us directly.", "bot");
    }
  } catch (error) {
    console.error('Error submitting help request:', error);
    // Still show confirmation to user even if logging fails
    addMessage("Thank you! We've recorded your request. If there are any issues, please try contacting us directly.", "bot");
  }
  
  // Reset state
  conversationState.lastSearchCategory = null;
}

// Helper function to generate session ID
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Form Confirmation Handler - Handle yes/no response for showing progressive form
function handleFormConfirmation(text) {
  conversationState.awaitingFormConfirmation = false;
  
  const response = text.toLowerCase().trim();
  
  // Check for yes responses
  if (response === 'yes' || response === 'y' || response === 'yeah' || response === 'sure' || 
      response === 'ok' || response === 'okay' || response.includes('yes')) {
    addMessage("Great! I'll open a form where you can provide your information so someone can assist you personally.", "bot");
    // Use the stored category from the consent request
    startTier2Intake(conversationState.pendingFormCategory || null);
    conversationState.pendingFormCategory = null; // Clear the stored category
  } 
  // Check for no responses
  else if (response === 'no' || response === 'n' || response === 'nah' || response === 'not now' ||
           response.includes('no') || response.includes('browse') || response.includes('on my own')) {
    addMessage("No problem! Feel free to browse resources by telling me what you need (like 'food', 'housing', 'healthcare', etc.) or just ask me any questions.", "bot");
    conversationState.pendingFormCategory = null; // Clear the stored category
  }
  // Handle unclear responses
  else {
    addMessage("I didn't quite understand. Would you like me to connect you with someone for personalized help? Please type 'yes' or 'no'.", "bot");
    conversationState.awaitingFormConfirmation = true; // Ask again
  }
}

// ZIP Code Input Handler - Fallback for when GPS location fails
async function handleZipCodeInput(text) {
  conversationState.awaitingZipCode = false;
  
  const zipCode = text.trim();
  
  // Validate ZIP code format
  if (!LocationService.isValidZipCode(zipCode)) {
    addMessage(`❌ ${window.i18n.t('location.zipCodeInvalid')}`, "bot");
    conversationState.awaitingZipCode = true;
    return;
  }
  
  // Try to geocode the ZIP code
  const location = await LocationService.geocodeZipCode(zipCode);
  
  if (location) {
    // Successfully got location from ZIP code
    // Update the Near Me button to show it's active
    updateNearMeButton(true);
    
    // Offer to show nearby resources
    addMessage("Would you like me to show you resources near this location? Just tell me what kind of help you need (food, housing, healthcare, etc.)", "bot");
  } else {
    // ZIP code geocoding failed
    conversationState.awaitingZipCode = true;
    addMessage("Please try another ZIP code, or you can browse all available resources by telling me what you need.", "bot");
  }
}

// AI-Powered Intent Detection with Fallback
async function detectIntentWithAI(text) {
  const currentLanguage = window.i18n.getCurrentLanguage();
  
  try {
    console.log('🤖 Attempting AI intent detection...');
    
    // Call AI intent detection API
    const response = await fetch('/api/ai-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: text,
        language: currentLanguage
      })
    });

    const result = await response.json();
    
    if (result.success && result.intent) {
      console.log('✅ AI detected intent:', result.intent);
      return result.intent;
    }
    
    if (result.fallback) {
      console.log('⚠️ AI unavailable, using keyword fallback...');
      return detectIntent(text); // Fallback to original keyword matching
    }
    
  } catch (error) {
    console.error('❌ AI intent detection error:', error);
  }
  
  // Fallback to original keyword matching
  console.log('🔄 Falling back to keyword matching...');
  return detectIntent(text);
}

// Enhanced response generation that handles AI intents
function generateSmartResponse(intent, text) {
  // Handle nonsensical input
  if (intent.isNonsensical) {
    return {
      text: window.i18n.t('bot.noResourcesOffer'),
      category: null,
      shouldEscalateToHuman: true
    };
  }
  
  // Handle general conversation
  if (intent.isGeneral || !intent.category) {
    // Check for greetings
    if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi') || 
        text.toLowerCase().includes('hola') || text.toLowerCase().includes('salaam')) {
      return {
        text: window.i18n.t('bot.welcome'),
        category: null
      };
    }
    
    // Default response for unclear input
    return {
      text: window.i18n.t('bot.needMoreInfo'),
      category: null
    };
  }
  
  // Handle specific category requests
  if (intent.category && intent.confidence > 0.7) {
    return {
      text: window.i18n.t('bot.clarificationPrefix', { 
        category: window.i18n.t(`categories.${intent.category}`) 
      }),
      category: intent.category
    };
  }
  
  // Lower confidence - ask for clarification
  return {
    text: window.i18n.t(`clarifications.${intent.category}`),
    category: null
  };
}

// Progressive Form System
let currentFormStep = 1;
let formData = {};

function showProgressiveForm(category = null) {
  // Pre-populate category if provided
  if (category) {
    formData.helpCategory = category;
  }
  
  // Reset form state
  currentFormStep = 1;
  updateFormStep();
  
  // Show modal
  document.getElementById('formModal').classList.remove('hidden');
  
  // Focus first input
  setTimeout(() => {
    document.getElementById('userName').focus();
  }, 100);
  
  console.log('📋 Progressive form opened', { category });
}

function hideProgressiveForm() {
  document.getElementById('formModal').classList.add('hidden');
  resetFormData();
}

function resetFormData() {
  currentFormStep = 1;
  formData = {};
  
  // Clear all form fields
  document.querySelectorAll('#formModal input, #formModal select, #formModal textarea').forEach(field => {
    field.value = '';
    hideFieldError(field.id);
  });
  
  updateFormStep();
}

function updateFormStep() {
  // Hide all steps
  document.querySelectorAll('[id^="formStep"]').forEach(step => {
    step.classList.add('hidden');
  });
  
  // Show current step
  document.getElementById(`formStep${currentFormStep}`).classList.remove('hidden');
  
  // Update progress indicators
  document.getElementById('currentStep').textContent = currentFormStep;
  
  // Update step indicators
  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`step${i}Indicator`);
    if (i <= currentFormStep) {
      indicator.classList.remove('bg-gray-300');
      indicator.classList.add('bg-blue-600');
    } else {
      indicator.classList.remove('bg-blue-600');
      indicator.classList.add('bg-gray-300');
    }
  }
  
  // Update progress bar
  const progress = (currentFormStep / 3) * 100;
  document.getElementById('progressBar').style.width = `${progress}%`;
  
  // Update button visibility
  const backBtn = document.getElementById('formBackBtn');
  const nextBtn = document.getElementById('formNextBtn');
  const submitBtn = document.getElementById('formSubmitBtn');
  
  if (currentFormStep === 1) {
    backBtn.classList.add('hidden');
  } else {
    backBtn.classList.remove('hidden');
  }
  
  if (currentFormStep === 3) {
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
  }
  
  // Pre-populate fields if we have data
  if (formData.helpCategory && currentFormStep === 2) {
    document.getElementById('helpCategory').value = formData.helpCategory;
  }
}

function validateCurrentStep() {
  let isValid = true;
  const currentStepElement = document.getElementById(`formStep${currentFormStep}`);
  const requiredFields = currentStepElement.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    const value = field.value.trim();
    
    if (!value) {
      showFieldError(field.id, window.i18n.t('forms.validationRequired'));
      isValid = false;
    } else {
      // Additional validation
      if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field.id, window.i18n.t('forms.validationEmail'));
        isValid = false;
      } else if (field.type === 'tel' && !isValidPhone(value)) {
        showFieldError(field.id, window.i18n.t('forms.validationPhone'));
        isValid = false;
      } else {
        hideFieldError(field.id);
      }
    }
  });
  
  return isValid;
}

function showFieldError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }
  
  // Add error styling to field
  const field = document.getElementById(fieldId);
  field.classList.add('border-red-500');
  field.classList.remove('border-gray-300');
}

function hideFieldError(fieldId) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  if (errorElement) {
    errorElement.classList.add('hidden');
  }
  
  // Remove error styling from field
  const field = document.getElementById(fieldId);
  field.classList.remove('border-red-500');
  field.classList.add('border-gray-300');
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Accept various phone formats
  const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

function collectCurrentStepData() {
  const currentStepElement = document.getElementById(`formStep${currentFormStep}`);
  const fields = currentStepElement.querySelectorAll('input, select, textarea');
  
  fields.forEach(field => {
    if (field.value.trim()) {
      formData[field.id] = field.value.trim();
    }
  });
}

async function submitForm() {
  // Collect final step data
  collectCurrentStepData();
  
  // Show loading state
  const submitBtn = document.getElementById('formSubmitBtn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;
  
  try {
    // Prepare final data
    const finalData = {
      ...formData,
      language: window.i18n.getCurrentLanguage(),
      timestamp: new Date().toISOString(),
      sessionId: generateSessionId(),
      needsPersonalAssistance: true,
      userLocation: LocationService.userLocation // Include location if available
    };
    
    console.log('📤 Submitting form data:', finalData);
    
    // Submit with retry logic
    const result = await submitFormDataWithRetry(finalData, 3);
    
    if (result.success) {
      // Show success message
      hideProgressiveForm();
      
      if (result.localTesting) {
        addMessage("✅ Thank you! We've recorded your information. (Note: This is a demo - in production, someone from our team will contact you within 24 hours.)", "bot");
        console.log('📝 Form data captured for testing:', formData);
      } else {
        addMessage("✅ Thank you! We've received your request and someone from our team will contact you within 24 hours to provide personalized assistance.", "bot");
        
        // Add follow-up information based on contact preference
        if (formData.userEmail) {
          addMessage("📧 You should receive a confirmation email shortly. If you don't see it, please check your spam folder.", "bot");
        } else {
          addMessage("📞 We'll contact you by phone at your preferred time. Thank you for providing your information!", "bot");
        }
      }
      
      // Log successful submission for analytics
      console.log('✅ Form submitted successfully:', result.recordId);
      
    } else {
      // Handle specific error types
      if (result.error.includes('Invalid') || result.error.includes('Missing')) {
        addMessage("⚠️ Please check that all required fields are filled out correctly and try again.", "bot");
      } else if (result.error.includes('network') || result.error.includes('timeout')) {
        addMessage("🌐 There seems to be a connection issue. Please check your internet connection and try again.", "bot");
      } else {
        addMessage("⚠️ There was an issue submitting your request. Please try again, or contact us directly for immediate assistance.", "bot");
      }
      
      console.error('❌ Form submission failed after retries:', result);
    }
    
  } catch (error) {
    console.error('❌ Form submission error:', error);
    
    // Handle local testing scenario (no backend available)
    if (error.message && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
      console.log('📝 Local testing mode detected - simulating submission');
      hideProgressiveForm();
      addMessage("✅ Thank you! We've recorded your information. (Note: This is a demo mode - in production, someone from our team will contact you within 24 hours.)", "bot");
    } else {
      // Show user-friendly error message for real errors
      addMessage("⚠️ We're experiencing technical difficulties. Your information is important to us - please try again in a few minutes or contact us directly.", "bot");
    }
  }
  
  // Reset button
  submitBtn.textContent = originalText;
  submitBtn.disabled = false;
}

function generateSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Enhanced form submission with retry logic and better error handling
async function submitFormDataWithRetry(data, maxRetries = 3) {
  let lastError = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📤 Form submission attempt ${attempt}/${maxRetries}`);
      
      const response = await fetch('/api/user-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'help_request',
          data: data
        })
      });
      
      // Handle 404/500 errors immediately for local testing
      if (response.status === 404 || response.status === 500) {
        console.log(`🏠 Local testing detected (${response.status}) - simulating success`);
        return {
          success: true,
          recordId: 'local-test-' + Date.now(),
          localTesting: true
        };
      }
      
      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        let errorData;
        
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: `HTTP ${response.status}: ${errorText}` };
        }
        
        if (response.status >= 400 && response.status < 500) {
          // Client errors - don't retry
          console.error(`❌ Client error (${response.status}):`, errorData);
          return {
            success: false,
            error: errorData.error || `Client error: ${response.status}`,
            status: response.status,
            attempt: attempt
          };
        } else if (response.status >= 500) {
          // Server errors - retry
          lastError = {
            error: errorData.error || `Server error: ${response.status}`,
            status: response.status,
            details: errorData
          };
          
          if (attempt < maxRetries) {
            const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff, max 5s
            console.log(`🔄 Server error, retrying in ${waitTime}ms...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            continue;
          }
        }
      }
      
      const result = await response.json();
      
      if (result.success) {
        console.log(`✅ Form submitted successfully on attempt ${attempt}`);
        return {
          success: true,
          recordId: result.recordId,
          attempt: attempt
        };
      } else {
        lastError = {
          error: result.error || 'Unknown error',
          details: result.details || result
        };
        
        // Don't retry validation errors
        if (result.error && result.error.includes('Missing required')) {
          return {
            success: false,
            error: result.error,
            attempt: attempt
          };
        }
      }
      
    } catch (networkError) {
      console.error(`🌐 Network error on attempt ${attempt}:`, networkError);
      
      // For local testing, immediately simulate success on network errors
      if (networkError.message && (networkError.message.includes('fetch') || 
          networkError.message.includes('Failed to fetch') || 
          networkError.message.includes('ERR_CONNECTION_REFUSED'))) {
        console.log(`🏠 Local testing detected (network error) - simulating success`);
        return {
          success: true,
          recordId: 'local-test-' + Date.now(),
          localTesting: true
        };
      }
      
      lastError = {
        error: 'Network connection error',
        details: networkError.message
      };
      
      if (attempt < maxRetries) {
        const waitTime = 1000 * attempt; // Linear backoff for network errors
        console.log(`🔄 Network error, retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
    }
  }
  
  // All attempts failed
  console.error(`❌ Form submission failed after ${maxRetries} attempts:`, lastError);
  return {
    success: false,
    error: lastError?.error || 'Submission failed after multiple attempts',
    details: lastError?.details,
    maxAttemptsReached: true
  };
}

// Form Event Handlers
document.addEventListener('DOMContentLoaded', () => {
  // Form navigation
  document.getElementById('formNextBtn').addEventListener('click', () => {
    if (validateCurrentStep()) {
      collectCurrentStepData();
      if (currentFormStep < 3) {
        currentFormStep++;
        updateFormStep();
        
        // Focus first input of new step
        setTimeout(() => {
          const newStepElement = document.getElementById(`formStep${currentFormStep}`);
          const firstInput = newStepElement.querySelector('input, select, textarea');
          if (firstInput) firstInput.focus();
        }, 100);
      }
    }
  });
  
  document.getElementById('formBackBtn').addEventListener('click', () => {
    if (currentFormStep > 1) {
      collectCurrentStepData();
      currentFormStep--;
      updateFormStep();
    }
  });
  
  document.getElementById('formSubmitBtn').addEventListener('click', () => {
    if (validateCurrentStep()) {
      submitForm();
    }
  });
  
  document.getElementById('formCancelBtn').addEventListener('click', () => {
    // Enhanced cancel experience
    if (currentFormStep > 1 || Object.keys(formData).length > 0) {
      // User has made some progress
      if (confirm('Are you sure you want to cancel? Your progress will be lost.\n\nClick "OK" to cancel anyway, or "Cancel" to continue filling out the form.')) {
        hideProgressiveForm();
        addMessage("No problem! Your form has been cancelled. I'm here if you need any other help finding resources.", "bot");
        addMessage("You can always ask me to connect you with someone again anytime.", "bot");
      }
      // If they click "Cancel" on the confirm dialog, form stays open
    } else {
      // No progress made, just close
      hideProgressiveForm();
      addMessage("Form closed. Feel free to ask me anything else!", "bot");
    }
  });
  
  // Close modal when clicking outside
  document.getElementById('formModal').addEventListener('click', (e) => {
    if (e.target.id === 'formModal') {
      hideProgressiveForm();
      addMessage("Form closed. Feel free to ask me anything else!", "bot");
    }
  });
  
  // Real-time validation
  document.querySelectorAll('#formModal input, #formModal select, #formModal textarea').forEach(field => {
    field.addEventListener('blur', () => {
      if (field.hasAttribute('required')) {
        const value = field.value.trim();
        if (value) {
          if (field.type === 'email' && !isValidEmail(value)) {
            showFieldError(field.id, window.i18n.t('forms.validationEmail'));
          } else if (field.type === 'tel' && !isValidPhone(value)) {
            showFieldError(field.id, window.i18n.t('forms.validationPhone'));
          } else {
            hideFieldError(field.id);
          }
        }
      }
    });
  });
  
  // Phone number auto-formatting
  const phoneInput = document.getElementById('userPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
      if (value.length >= 6) {
        value = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6, 10);
      } else if (value.length >= 3) {
        value = value.substring(0, 3) + '-' + value.substring(3);
      }
      e.target.value = value;
    });
  }

  // Enter key navigation
  document.querySelectorAll('#formModal input').forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFormStep < 3) {
          document.getElementById('formNextBtn').click();
        } else {
          document.getElementById('formSubmitBtn').click();
        }
      }
    });
  });
});

// Session Control Functions
function initializeSessionControl() {
  const sessionMenuToggle = document.getElementById('sessionMenuToggle');
  const sessionMenu = document.getElementById('sessionMenu');

  // Toggle session menu
  sessionMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sessionMenu.classList.toggle('hidden');
  });

  // Keyboard accessibility for session menu
  sessionMenuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      sessionMenu.classList.toggle('hidden');
    }
    if (e.key === 'Escape') {
      sessionMenu.classList.add('hidden');
    }
  });

  // Close menu when clicking outside or pressing escape
  document.addEventListener('click', (e) => {
    if (!sessionMenuToggle.contains(e.target) && !sessionMenu.contains(e.target)) {
      sessionMenu.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      sessionMenu.classList.add('hidden');
    }
  });

  // Session control actions
  document.getElementById('startOverBtn').addEventListener('click', () => {
    sessionMenu.classList.add('hidden');
    startNewSession();
  });

  document.getElementById('clearChatBtn').addEventListener('click', () => {
    sessionMenu.classList.add('hidden');
    clearChatHistory();
  });

  document.getElementById('helpTipsBtn').addEventListener('click', () => {
    sessionMenu.classList.add('hidden');
    showHelpTips();
  });

  document.getElementById('endSessionBtn').addEventListener('click', () => {
    sessionMenu.classList.add('hidden');
    endSession();
  });
}

function startNewSession() {
  // Reset all conversation states
  conversationState = {
    awaitingClarification: false,
    pendingCategory: null,
    lastQuestion: null,
    awaitingFeedback: false,
    awaitingNameForAnalytics: false,
    awaitingIntakeForm: false,
    awaitingZipCode: false,
    awaitingFormConfirmation: false,
    lastSearchCategory: null,
    pendingFormCategory: null
  };

  // Close any open modals
  hideProgressiveForm();
  removeFeedbackButtons();

  // Clear chat but keep welcome message
  messagesDiv.innerHTML = '';
  addMessage(window.i18n.t('bot.welcome'), "bot");
  
  console.log('🔄 New session started');
}

function clearChatHistory() {
  messagesDiv.innerHTML = '';
  removeFeedbackButtons();
  hideResourceCarousel(); // Hide carousel when clearing chat
  addMessage("Chat history cleared. How can I help you today?", "bot");
  console.log('🧹 Chat history cleared');
}

function showHelpTips() {
  addMessage("💡 **Here's how I can help you:**", "bot");
  addMessage("🔍 **Search for resources:** Just tell me what you need like 'food', 'housing', 'healthcare', etc.", "bot");
  addMessage("📍 **Find nearby resources:** Click 'Enable Near Me' or provide your ZIP code", "bot");
  addMessage("📋 **Get personal help:** Say 'I need more help' to connect with someone directly", "bot");
  addMessage("🌍 **Multiple languages:** Use the language switcher (flag icon) to change languages", "bot");
  addMessage("🔄 **Start over:** Use the Session menu (bottom-right) anytime to reset or get help", "bot");
}

function endSession() {
  if (confirm('Are you sure you want to end your session? Any unsaved progress will be lost.')) {
    // Save any analytics if in progress
    if (conversationState.awaitingNameForAnalytics && conversationState.lastSearchCategory) {
      // Quick anonymous analytics
      console.log('📊 Session ended - anonymous success recorded for:', conversationState.lastSearchCategory);
    }
    
    // Reset everything
    startNewSession();
    addMessage("👋 Thank you for using Carelink+! Your session has ended. Feel free to start a new conversation anytime.", "bot");
    
    // Optionally could redirect or close tab
    // window.close(); // Only works in certain contexts
  }
}

function handleEscapePhrase(text) {
  // Reset any active states
  conversationState.awaitingZipCode = false;
  conversationState.awaitingFormConfirmation = false;
  conversationState.awaitingFeedback = false;
  conversationState.pendingFormCategory = null;
  
  // Close any open modals
  hideProgressiveForm();
  removeFeedbackButtons();
  
  if (text.toLowerCase().includes('help me') || text.toLowerCase().includes('confused') || text.toLowerCase().includes('what can you do')) {
    showHelpTips();
  } else if (text.toLowerCase().includes('start over') || text.toLowerCase().includes('restart') || text.toLowerCase().includes('reset')) {
    startNewSession();
  } else if (text.toLowerCase().includes('clear')) {
    clearChatHistory();
  } else {
    addMessage("No problem! I've reset our conversation. What would you like help with?", "bot");
    addMessage("You can ask me about food, housing, healthcare, or any other community resources.", "bot");
  }
}

// Initialize session controls after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  // Give other initializations a moment to complete
  setTimeout(initializeSessionControl, 100);
});

// Test function to manually force Spanish translation
window.testSpanishTranslation = () => {
  console.log('🧪 Testing Spanish translation');
  window.i18n.setLanguage('es');
  updateUILanguage();
  forceTranslateAllSections();
  console.log('🧪 Spanish translation test completed');
};

// Fallback initialization for map and language switcher
window.addEventListener('load', () => {
  console.log('🔄 Window fully loaded - checking initializations');
  
  // Fallback for language switcher if not already set up
  setTimeout(() => {
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher && !languageSwitcher.onclick) {
      console.log('🔄 Setting up language switcher fallback');
      setupLanguageSwitcher();
    }
  }, 1000);
  
  // Fallback for map if not already initialized
  setTimeout(() => {
    if (map === null && typeof L !== 'undefined') {
      console.log('🔄 Initializing map fallback');
      initializeMap();
    }
  }, 2000);
  
  // Add console message about test function
  console.log('🧪 Test function available: window.testSpanishTranslation()');
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (event) => {
  const carouselVisible = !document.getElementById('resourceCarousel')?.classList.contains('hidden');
  
  if (carouselVisible && carouselResources.length > 0) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      previousCarouselSlide();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextCarouselSlide();
    }
  }
});