// Simple function to test environment variable access
export default async function handler(req, res) {
  console.log('🔍 Environment Variable Debug');
  
  const apiKey = process.env.OPENAI_API_KEY;
  
  res.status(200).json({
    hasApiKey: !!apiKey,
    keyLength: apiKey ? apiKey.length : 0,
    keyPrefix: apiKey ? apiKey.substring(0, 8) + '...' : 'none',
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('OPENAI'))
  });
}