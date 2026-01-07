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

  try {
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

// Submit Tier 1 Analytics Data
async function submitTier1Analytics(data, apiKey, baseId) {
  const url = `https://api.airtable.com/v0/${baseId}/Success_Analytics`;
  
  const record = {
    fields: {
      "First_Name": data.firstName || '',
      "Search_Category": data.searchCategory || '',
      "Language": data.language || 'en',
      "Session_ID": data.sessionId || '',
      "Timestamp": data.timestamp || new Date().toISOString(),
      "Date_Created": new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    }
  };

  console.log('Submitting Tier 1 Analytics:', record);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(record)
  });

  const result = await response.json();
  
  if (!response.ok) {
    console.error('Airtable API Error (Analytics):', result);
    return {
      success: false,
      error: 'Failed to submit analytics data',
      details: result.error
    };
  }

  return {
    success: true,
    message: 'Analytics data submitted successfully',
    recordId: result.id
  };
}

// Submit Tier 2 Help Request Data
async function submitTier2HelpRequest(data, apiKey, baseId) {
  const url = `https://api.airtable.com/v0/${baseId}/Help_Requests`;
  
  const record = {
    fields: {
      "Name": data.name || data.response || 'Anonymous',
      "Contact_Info": data.contactInfo || data.response || '',
      "Search_Category": data.searchCategory || '',
      "Language": data.language || 'en',
      "Detailed_Needs": data.detailedNeeds || data.response || '',
      "Session_ID": data.sessionId || '',
      "Status": "Pending",
      "Volunteer_Requested": data.volunteerRequested || false,
      "Timestamp": data.timestamp || new Date().toISOString(),
      "Date_Created": new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      "Urgency": data.urgency || "Normal",
      "Location": data.location || '',
      "Notes": `Original search: ${data.searchCategory}. User response: ${data.response || data.detailedNeeds || ''}`
    }
  };

  console.log('Submitting Tier 2 Help Request:', record);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(record)
  });

  const result = await response.json();
  
  if (!response.ok) {
    console.error('Airtable API Error (Help Request):', result);
    return {
      success: false,
      error: 'Failed to submit help request',
      details: result.error
    };
  }

  return {
    success: true,
    message: 'Help request submitted successfully',
    recordId: result.id
  };
}