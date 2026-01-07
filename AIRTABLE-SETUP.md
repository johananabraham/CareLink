# Airtable Integration Setup

This document explains how to set up Airtable integration for the two-tier user data collection system.

## Required Environment Variables

Add these variables to your Vercel environment configuration or `.env.local` file:

```bash
AIRTABLE_API_KEY=your_personal_access_token_here
AIRTABLE_BASE_ID=your_base_id_here
```

## How to Get Airtable Credentials

### 1. Personal Access Token (API Key)
1. Go to https://airtable.com/developers/web/api/introduction
2. Click "Create token" or go to https://airtable.com/create/tokens
3. Create a new personal access token with these scopes:
   - `data.records:read`
   - `data.records:write`
4. Select your base in the "Resources" section
5. Copy the generated token

### 2. Base ID
1. Go to your Airtable base
2. Click "Help" → "API documentation" (or go to https://airtable.com/developers/web/api/introduction)
3. The Base ID will be shown in the URL and documentation (starts with "app...")

## Required Airtable Base Structure

Create a new Airtable base with these two tables:

### Table 1: Success_Analytics
This table tracks users who found helpful resources (Tier 1).

**Fields:**
- `First_Name` (Single line text)
- `Search_Category` (Single line text) 
- `Language` (Single line text)
- `Session_ID` (Single line text)
- `Timestamp` (Date and time)
- `Date_Created` (Date)

### Table 2: Help_Requests  
This table tracks users who need human assistance (Tier 2).

**Fields:**
- `Name` (Single line text)
- `Contact_Info` (Long text)
- `Search_Category` (Single line text)
- `Language` (Single line text)
- `Detailed_Needs` (Long text)
- `Session_ID` (Single line text)
- `Status` (Single select: Pending, Assigned, Closed)
- `Volunteer_Requested` (Checkbox)
- `Timestamp` (Date and time)
- `Date_Created` (Date)
- `Urgency` (Single select: Low, Normal, High, Urgent)
- `Location` (Single line text)
- `Notes` (Long text)

## Vercel Deployment Setup

1. In your Vercel dashboard, go to your project settings
2. Navigate to "Environment Variables"
3. Add the two required variables:
   - `AIRTABLE_API_KEY` = your personal access token
   - `AIRTABLE_BASE_ID` = your base ID

## Data Flow

### Tier 1 (Success Analytics)
- User finds resources → clicks "Yes, this helped!" 
- System asks for first name
- Data saved to `Success_Analytics` table
- Used for tracking success metrics

### Tier 2 (Help Requests)
- User needs more help → clicks "I need more assistance" OR no resources found
- System collects detailed information
- Data saved to `Help_Requests` table
- Human team follows up within 24 hours

## Testing

1. Test Tier 1: Search for a resource, click "Yes, this helped!", provide a name
2. Test Tier 2: Search for something that returns no results, or click "I need more assistance"
3. Check your Airtable base to confirm data is being saved correctly
4. Check browser console for any API errors

## Security Notes

- Never commit API keys to Git
- Use Vercel environment variables for production
- The serverless function validates all inputs
- CORS is properly configured for your domain
- Personal access tokens are more secure than deprecated API keys

## Troubleshooting

**"Missing Airtable configuration" error:**
- Check that environment variables are set correctly in Vercel
- Redeploy after adding environment variables

**"Failed to submit" errors:**
- Verify table names match exactly: `Success_Analytics` and `Help_Requests`
- Check that all required fields exist in your Airtable base
- Verify API token has correct permissions for your base

**CORS errors:**
- The serverless function handles CORS automatically
- If issues persist, check Vercel function logs