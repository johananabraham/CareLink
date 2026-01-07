// Simple test function to verify Vercel deployment is working
export default async function handler(req, res) {
  console.log('🧪 AI Test function called!', req.method);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({ 
    success: true,
    message: 'AI test function working!',
    timestamp: new Date().toISOString()
  });
}