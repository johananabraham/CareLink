// Serverless function for Airtable user data collection
// Handles both Tier 1 (analytics) and Tier 2 (help requests) data

export default async function handler(req, res) {
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
  
  // CRITICAL DEBUG - This should show up!
  console.log('🚨 FUNCTION CALLED - API KEY EXISTS:', !!process.env.AIRTABLE_API_KEY);
  console.log('🚨 BASE ID:', process.env.AIRTABLE_BASE_ID);

  try {
    // DEBUG: Log everything we receive
    console.log('=== DEBUG START ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Environment check:', {
      hasApiKey: !!process.env.AIRTABLE_API_KEY,
      hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      apiKeyLength: process.env.AIRTABLE_API_KEY?.length,
      baseIdLength: process.env.AIRTABLE_BASE_ID?.length,
      apiKeyStart: process.env.AIRTABLE_API_KEY?.substring(0, 10),
      baseId: process.env.AIRTABLE_BASE_ID
    });
    console.log('=== DEBUG END ===');
    
    const { type, data } = req.body;

    if (!type || !data) {
      res.status(400).json({ 
        success: false, 
        error: 'Missing type or data in request body' 
      });
      return;
    }

    // Validate environment variables
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Missing Airtable configuration');
      res.status(500).json({ 
        success: false, 
        error: 'Server configuration error' 
      });
      return;
    }

    let result;
    
    if (type === 'analytics') {
      result = await submitTier1Analytics(data, AIRTABLE_API_KEY, AIRTABLE_BASE_ID);
    } else if (type === 'help_request') {
      result = await submitTier2HelpRequest(data, AIRTABLE_API_KEY, AIRTABLE_BASE_ID);
    } else {
      res.status(400).json({ 
        success: false, 
        error: 'Invalid type. Must be "analytics" or "help_request"' 
      });
      return;
    }

    res.status(200).json(result);

  } catch (error) {
    console.error('Error in user-data handler:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}

// Submit Tier 1 Analytics Data with enhanced error handling
async function submitTier1Analytics(data, apiKey, baseId) {
  const url = `https://api.airtable.com/v0/${baseId}/Success_Analytics`;
  
  // Validate required fields
  if (!data.firstName && !data.sessionId) {
    return {
      success: false,
      error: 'Missing required analytics data (firstName or sessionId)'
    };
  }
  
  const record = {
    fields: {
      "First_Name": sanitizeString(data.firstName) || '',
      "Search_Category": sanitizeString(data.searchCategory) || '',
      "Language": data.language || 'en',
      "Session_ID": sanitizeString(data.sessionId) || '',
      "Timestamp": data.timestamp || new Date().toISOString(),
      "Date_Created": new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    }
  };

  console.log('Submitting Tier 1 Analytics:', record);

  return await submitToAirtableWithRetry(url, record, apiKey, 'analytics');
}

// Submit Tier 2 Help Request Data with enhanced structure for progressive forms
async function submitTier2HelpRequest(data, apiKey, baseId) {
  const url = `https://api.airtable.com/v0/${baseId}/Help_Requests`;
  
  // Validate required fields for progressive forms
  const isProgressiveForm = data.userName && data.userPhone;
  
  if (isProgressiveForm) {
    // Validate progressive form data
    if (!data.userName || !data.userPhone || !data.helpCategory) {
      return {
        success: false,
        error: 'Missing required form fields (name, phone, or category)'
      };
    }
  } else if (!data.sessionId) {
    return {
      success: false,
      error: 'Missing required session data'
    };
  }
  
  // Build contact info string
  let contactInfo = '';
  if (isProgressiveForm) {
    contactInfo = `Phone: ${data.userPhone}`;
    if (data.userEmail) {
      contactInfo += ` | Email: ${data.userEmail}`;
    }
    if (data.bestContactTime && data.bestContactTime !== 'anytime') {
      contactInfo += ` | Best time: ${data.bestContactTime}`;
    }
  } else {
    contactInfo = data.contactInfo || data.response || '';
  }
  
  // Build location string
  let location = '';
  if (data.userAddress) {
    location = data.userAddress;
  } else if (data.userLocation && data.userLocation.zipCode) {
    location = `ZIP: ${data.userLocation.zipCode}`;
  } else if (data.userLocation && data.userLocation.lat) {
    location = `Lat: ${data.userLocation.lat.toFixed(4)}, Lng: ${data.userLocation.lng.toFixed(4)}`;
  } else {
    location = data.location || '';
  }
  
  // Build detailed notes
  let notes = '';
  if (isProgressiveForm) {
    notes = `Progressive Form Submission:\n`;
    notes += `Category: ${data.helpCategory}\n`;
    notes += `Description: ${data.helpDescription || 'Not provided'}\n`;
    if (data.additionalNotes) {
      notes += `Additional Notes: ${data.additionalNotes}\n`;
    }
    notes += `Language: ${data.language}\n`;
    notes += `Session ID: ${data.sessionId}`;
  } else {
    notes = `Chat Submission:\n`;
    notes += `Original search: ${data.searchCategory || 'Not specified'}\n`;
    notes += `User response: ${data.response || data.detailedNeeds || 'Not provided'}`;
  }
  
  const record = {
    fields: {
      "Name": sanitizeString(isProgressiveForm ? data.userName : (data.name || data.response || 'Anonymous')),
      "Contact_Info": sanitizeString(contactInfo),
      "Search_Category": sanitizeString(isProgressiveForm ? data.helpCategory : (data.searchCategory || '')),
      "Language": data.language || 'en',
      "Detailed_Needs": sanitizeString(isProgressiveForm ? data.helpDescription : (data.detailedNeeds || data.response || '')),
      "Session_ID": sanitizeString(data.sessionId) || '',
      "Status": "Pending",
      "Volunteer_Requested": data.needsPersonalAssistance || data.volunteerRequested || false,
      "Timestamp": data.timestamp || new Date().toISOString(),
      "Date_Created": new Date().toISOString().split('T')[0],
      "Urgency": data.urgencyLevel || data.urgency || "moderate",
      "Location": sanitizeString(location),
      "Notes": sanitizeString(notes),
      "Form_Type": isProgressiveForm ? "Progressive Form" : "Chat Intake"
    }
  };

  console.log('Submitting Tier 2 Help Request:', record);

  return await submitToAirtableWithRetry(url, record, apiKey, 'help_request');
}

// Enhanced Airtable submission with retry logic and rate limiting
async function submitToAirtableWithRetry(url, record, apiKey, type, maxRetries = 3) {
  let lastError = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries} for ${type} submission`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record)
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log(`✅ ${type} submitted successfully on attempt ${attempt}`);
        return {
          success: true,
          message: `${type} data submitted successfully`,
          recordId: result.id,
          attempt: attempt
        };
      }
      
      // Handle specific error types
      if (response.status === 429) {
        // Rate limited - wait and retry
        const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // Exponential backoff, max 10s
        console.log(`⏱️ Rate limited, waiting ${waitTime}ms before retry ${attempt + 1}`);
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, waitTime));
          lastError = { status: 429, message: 'Rate limited', details: result };
          continue;
        }
      } else if (response.status >= 400 && response.status < 500) {
        // Client error - don't retry
        console.error(`❌ Client error for ${type}:`, result);
        return {
          success: false,
          error: `Invalid ${type} data`,
          details: result.error,
          status: response.status
        };
      } else if (response.status >= 500) {
        // Server error - retry
        console.error(`🔄 Server error for ${type}, attempt ${attempt}:`, result);
        lastError = { status: response.status, message: 'Server error', details: result };
        
        if (attempt < maxRetries) {
          const waitTime = 1000 * attempt; // Linear backoff for server errors
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
      }
      
      lastError = { status: response.status, message: 'Unknown error', details: result };
      
    } catch (networkError) {
      console.error(`🌐 Network error for ${type}, attempt ${attempt}:`, networkError);
      lastError = { message: 'Network error', details: networkError.message };
      
      if (attempt < maxRetries) {
        const waitTime = 1000 * attempt;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
    }
  }
  
  // All retries exhausted
  console.error(`❌ All ${maxRetries} attempts failed for ${type}:`, lastError);
  return {
    success: false,
    error: `Failed to submit ${type} after ${maxRetries} attempts`,
    details: lastError
  };
}

// Sanitize string inputs to prevent injection and data issues
function sanitizeString(input) {
  if (typeof input !== 'string') {
    return String(input || '');
  }
  
  // Remove potentially problematic characters and trim
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
    .replace(/[<>]/g, '') // Remove HTML angle brackets  
    .substring(0, 1000) // Limit length to prevent data overflow
    .trim();
}