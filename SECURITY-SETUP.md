# 🔒 Secure Google Sheets API Setup

## Security Overview
This project uses a secure configuration system to protect your Google API key from being exposed in version control.

## Setup Instructions

### 1. Get Your Google API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable the **Google Sheets API**
4. Create an **API Key** in Credentials
5. **Restrict your API key**:
   - Application restrictions: HTTP referrers (`localhost/*`, your domain)
   - API restrictions: Google Sheets API only

### 2. Configure Your API Key Securely
1. Copy `config.example.js` to `config.js`
2. Replace `YOUR_API_KEY_HERE` with your actual API key
3. **NEVER commit config.js to git** (it's in .gitignore)

### 3. File Structure
```
├── config.example.js    ✅ Safe to commit (no real keys)
├── config.js           ❌ DO NOT COMMIT (contains real API key)
├── .gitignore          ✅ Protects config.js from being committed
└── main.js             ✅ Uses secure config system
```

## Security Features
- ✅ API key stored in separate config file
- ✅ Config file excluded from git via .gitignore
- ✅ API key restrictions (domain + API scope)
- ✅ Automatic fallback if key not configured
- ✅ Warning messages in console for missing keys

## Deployment
When deploying to production:
1. Set up environment variables or secure config on your hosting platform
2. Update domain restrictions in Google Cloud Console
3. Consider using a backend proxy to hide API keys entirely

## Team Setup
For team members:
1. Get their own API key (never share keys!)
2. Copy `config.example.js` to `config.js`
3. Add their API key to their local `config.js`
4. The `config.js` file will be ignored by git automatically