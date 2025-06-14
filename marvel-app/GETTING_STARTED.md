# 🚀 Getting Started - Marvel Characters Explorer

## Quick Demo Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Application
```bash
npm run dev
```

### 3. Open Your Browser
Navigate to: `http://localhost:5173`

## 🎯 What You'll See

### Home Page (/)
- Beautiful landing page with Marvel-themed design
- Features overview and statistics
- Call-to-action buttons

### Characters Page (/characters)
- Grid of Marvel character cards (Spider-Man, Captain America, Iron Man)
- Search functionality (try searching for "spider")
- Sort options (name, modified date)
- Responsive design

### Character Details (/characters/:id)
- Click any character card to view detailed information
- Character stats (comics, series, stories, events)
- Hero-style layout with gradients
- Back navigation

## 🔧 Demo vs Live Data

### Demo Mode (Default - No Setup Required)
- ✅ Works immediately with sample data
- ✅ Three featured characters (Spider-Man, Captain America, Iron Man)
- ✅ All features functional
- ✅ Perfect for testing and development

### Live Marvel API (Optional)
To use real Marvel API data:

1. **Get Marvel API Keys** (Free)
   - Visit: https://developer.marvel.com/
   - Sign up and create an account
   - Get your public and private keys

2. **Update Configuration**
   ```typescript
   // src/services/marvelApi.ts
   private readonly publicKey = 'your_marvel_public_key'
   private readonly privateKey = 'your_marvel_private_key'
   ```

3. **Enable Live Data**
   ```typescript
   // src/stores/marvel.ts
   const useDemoData = ref(false) // Change to false
   ```

## 🎨 Features to Test

### ✅ Search Functionality
1. Go to `/characters`
2. Type "spider" in the search box
3. See real-time filtering

### ✅ Character Details
1. Click on any character card
2. View detailed character information
3. See stats and featured content
4. Use back button to return

### ✅ Responsive Design
1. Resize your browser window
2. Test on mobile/tablet sizes
3. Notice adaptive layouts

### ✅ Navigation
1. Use the navigation bar
2. Test routing between pages
3. Notice active states

## 🐛 Troubleshooting

### Port Already in Use
```bash
# If port 5173 is busy, Vite will automatically use the next available port
# Check the terminal output for the actual URL
```

### Tailwind Styles Not Loading
```bash
# Restart the dev server
npm run dev
```

### TypeScript Errors
```bash
# The ESLint config warning can be ignored
# All TypeScript types are properly configured
```

## 🎯 Next Steps

1. **Explore the Code**
   - Check `src/` folder structure
   - Review component implementations
   - Understand Pinia store usage

2. **Customize**
   - Modify colors in `tailwind.config.js`
   - Add new character properties
   - Extend search functionality

3. **Deploy**
   ```bash
   npm run build
   npm run preview
   ```

## 💡 Pro Tips

- **Search**: Try partial matches like "cap" for Captain America
- **Sorting**: Use the dropdown to sort by different criteria
- **Mobile**: Test the responsive design on mobile devices
- **Performance**: Notice the smooth animations and loading states

---

**Ready to explore?** Run `npm run dev` and visit `http://localhost:5173` 🚀 