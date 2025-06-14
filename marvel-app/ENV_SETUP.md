# Environment Variables Setup

## 🔐 Setting Up Marvel API Keys

To use live Marvel API data instead of demo data, you need to configure your environment variables.

### 1. Create Environment File

Create a `.env` file in the root of the `marvel-app` directory:

```bash
# In marvel-app/.env
VITE_MARVEL_PUBLIC_KEY=your_marvel_public_key_here
VITE_MARVEL_PRIVATE_KEY=your_marvel_private_key_here
VITE_USE_DEMO_DATA=false
```

### 2. Get Marvel API Keys (Free)

1. **Visit**: [Marvel Developer Portal](https://developer.marvel.com/)
2. **Sign up** for a free account
3. **Create an application** to get your keys
4. **Copy** your Public Key and Private Key

### 3. Configure Your Environment

Replace the placeholder values in your `.env` file:

```bash
# Your actual Marvel API keys
VITE_MARVEL_PUBLIC_KEY=8f4b7144892117f4a8aab41613d8b516
VITE_MARVEL_PRIVATE_KEY=bf45aff41dbde2c965508b650b02f340b49c12cf
VITE_USE_DEMO_DATA=false
```

### 4. Restart Development Server

```bash
npm run dev
```

## 🎛️ Environment Variables Explained

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_MARVEL_PUBLIC_KEY` | Your Marvel API public key | `''` |
| `VITE_MARVEL_PRIVATE_KEY` | Your Marvel API private key | `''` |
| `VITE_USE_DEMO_DATA` | Force demo mode even with valid keys | `true` |

## 🔄 Switching Between Demo and Live Data

### Demo Mode (Default)
- Uses 3 sample characters (Spider-Man, Captain America, Iron Man)
- No API calls made
- Works without internet connection
- Perfect for development and testing

### Live API Mode
- Fetches real Marvel character data
- Requires valid API keys
- Full character database access
- Real-time search and filtering

## 🔒 Security Notes

- ⚠️ **Never commit `.env` to version control**
- ✅ The `.env` file is already in `.gitignore`
- ✅ Use `VITE_` prefix for client-side environment variables
- ✅ Private key is only used for API authentication hash generation

## 🐛 Troubleshooting

### "API keys not configured" message
- Check that your `.env` file exists in `marvel-app/` directory
- Verify your keys are copied correctly (no extra spaces)
- Restart the development server after changes

### API requests failing
- Verify your Marvel API keys are active
- Check your internet connection
- Marvel API has rate limits (3000 calls/day for free accounts)

### Still seeing demo data
- Make sure `VITE_USE_DEMO_DATA=false` in your `.env` file
- Clear browser cache and refresh
- Check browser console for any error messages

## 🚀 Ready to Use Live Data!

Once configured, your app will automatically:
- ✅ Use real Marvel API data
- ✅ Show thousands of characters
- ✅ Enable full search functionality
- ✅ Display real character statistics 