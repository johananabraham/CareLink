// Serverless function to fetch Google Sheets data (bypasses CORS)
export default async function handler(req, res) {
  // Enable CORS for your domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Fetch data from your published Google Sheet
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRA-GKdJIlSqsXamMWZThB8m-bnvD4_xBuLKyv1QSqn5VEkJGhLxKuciXF-OwabtVVluZ7cdk-ec1I1/pub?output=csv';
    
    console.log('Fetching data from Google Sheets...');
    const response = await fetch(sheetUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvData = await response.text();
    console.log('Successfully fetched CSV data, length:', csvData.length);
    
    // Return the CSV data
    res.status(200).json({
      success: true,
      data: csvData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}