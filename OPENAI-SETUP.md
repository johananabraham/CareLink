# OpenAI Integration Setup

This document explains how to set up OpenAI integration for intelligent intent detection, replacing the basic keyword matching system.

**Status**: API key configured, ready for testing!

## Benefits of AI Integration

✅ **Smarter Intent Detection**: Understands "unicorn training" is nonsensical, not employment  
✅ **Natural Conversation**: No more repetitive clarification questions  
✅ **Better User Experience**: Handles greetings, questions, and edge cases gracefully  
✅ **Multilingual Support**: Works with all 5 languages (EN, ES, SO, AR, HI)  
✅ **Graceful Fallback**: Falls back to keyword matching if AI is unavailable  

## Required Environment Variable

Add this to your Vercel environment configuration:

```bash
OPENAI_API_KEY=sk-your_openai_api_key_here
```

## How to Get OpenAI API Key

### Option 1: Free Tier (Recommended)
1. Go to https://platform.openai.com/api-keys
2. Create an account (if you don't have one)
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. **Free tier includes**: $5 free credits (enough for thousands of requests)

### Option 2: Pay-as-you-go
- After free credits, GPT-3.5-turbo costs ~$0.002 per 1K tokens
- For intent detection: ~10 tokens per request = $0.00002 per classification
- Very affordable for community resource apps

## Integration Details

### How It Works
1. **User sends message** → "I need food assistance"
2. **AI analyzes intent** → Classifies as "Food" category with 90% confidence  
3. **Smart response** → Shows food resources immediately, no clarification needed
4. **Fallback ready** → If AI fails, uses original keyword matching

### What AI Handles
- ✅ **Nonsensical input**: "unicorn training" → Direct to human help
- ✅ **Clear requests**: "I'm hungry" → Food resources immediately  
- ✅ **Greetings**: "hello" → Welcome message
- ✅ **Edge cases**: Ambiguous input → Appropriate clarification

## Vercel Deployment Setup

1. In Vercel dashboard → Project Settings → Environment Variables
2. Add: `OPENAI_API_KEY` = your secret key  
3. Redeploy your application
4. Test with previously problematic inputs like "unicorn training"

## Testing the AI Integration

### Test Cases to Try:

**✅ Should Work Better Now:**
- "unicorn training" → Offers human assistance (not employment)
- "I need food" → Shows food resources directly (no clarification)  
- "hello" → Welcome message
- "help with housing" → Shows housing resources immediately

**✅ Fallback Testing:**
- Remove OPENAI_API_KEY → Should fall back to keyword matching
- Test with network disconnected → Should gracefully handle errors

**✅ Multilingual Testing:**  
- Switch to Spanish: "necesito comida" → Should detect Food category
- Switch to Arabic: "أحتاج طعام" → Should work (AI handles multiple languages)

## Cost Estimation

For a community resource app:
- **Typical usage**: 100 intent detections per day
- **Cost**: ~$0.002 per day ($0.60 per month)
- **Free tier**: Covers ~2,500 requests (25 days of usage)

## Fallback System

The system has three layers:
1. **OpenAI GPT-3.5** (primary) - Intelligent intent detection
2. **Keyword Matching** (fallback) - Original system if AI fails
3. **Human Escalation** (final) - Tier 2 intake for unclear requests

## Monitoring & Debugging

Check browser console for:
- `🤖 Attempting AI intent detection...`
- `✅ AI detected intent:` (success)  
- `⚠️ AI unavailable, using keyword fallback...` (expected without API key)
- `❌ AI intent detection error:` (errors to investigate)

## Security Notes

- ✅ OpenAI API key is only used server-side (secure)
- ✅ User messages are sent to OpenAI for intent classification only
- ✅ No personal information stored by OpenAI
- ✅ Falls back gracefully if API is unavailable
- ✅ All data flows remain the same (still goes to Airtable)

## Troubleshooting

**"AI unavailable" in console:**
- Check OPENAI_API_KEY is set in Vercel environment variables
- Verify API key starts with `sk-` and is valid
- Redeploy after adding environment variables

**Unexpected responses:**
- Check console logs for AI classification output
- AI responses are logged: `AI Intent Detection - Input: "..." → Output: "..."`

**Cost concerns:**
- Free tier is generous for testing and low usage
- Monitor usage at https://platform.openai.com/usage
- Each classification uses ~10-20 tokens (very cheap)