# Marvel Characters Explorer

A modern Single Page Application (SPA) built with Vue 3, TypeScript, and Pinia for browsing and exploring Marvel characters. This application provides a seamless experience for discovering your favorite Marvel superheroes and villains.

## ✨ Features

### 🦸‍♂️ Browse Marvel Characters
- View a comprehensive list of Marvel characters
- Beautiful card-based layout with character images
- Responsive design that works on all devices

### 🔍 Search and Filter
- **Smart Search**: Find characters by name with real-time search
- **Advanced Filtering**: Sort characters by name or last modified date
- **Pagination**: Navigate through large datasets efficiently

### 📋 Character Details
- **Detailed Profiles**: Comprehensive character information
- **Statistics**: View comics, series, stories, and events counts
- **Featured Content**: Browse associated comics and series
- **External Links**: Access official Marvel resources

### 🎨 Modern UI/UX
- Clean, modern design with Marvel-themed color scheme
- Smooth animations and hover effects
- Loading states and error handling
- Mobile-responsive interface

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP requests
- **Vite** - Build tool

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marvel-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Marvel API Setup (Optional)

The application includes demo data for immediate testing. To use live Marvel API data:

1. **Get your Marvel API keys**
   - Visit [Marvel Developer Portal](https://developer.marvel.com/)
   - Create an account and get your public and private keys

2. **Update the API service**
   ```typescript
   // src/services/marvelApi.ts
   private readonly publicKey = 'your_public_key_here'
   private readonly privateKey = 'your_private_key_here'
   ```

3. **Enable live data**
   ```typescript
   // src/stores/marvel.ts
   const useDemoData = ref(false) // Change to false
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   └── CharacterCard.vue
├── views/              # Page components
│   ├── HomeView.vue
│   ├── CharactersView.vue
│   └── CharacterDetailView.vue
├── stores/             # Pinia stores
│   └── marvel.ts
├── services/           # API services
│   └── marvelApi.ts
├── types/              # TypeScript type definitions
│   └── marvel.ts
├── router/             # Vue Router configuration
│   └── index.ts
├── assets/             # Static assets
│   └── main.css
└── App.vue             # Root component
```

## 🎯 Usage

### Browsing Characters
1. Navigate to the Characters page
2. Browse through the character cards
3. Use the search bar to find specific characters
4. Apply sorting options to organize results

### Searching
- Type in the search box to find characters by name
- Search results update in real-time
- Clear search to return to all characters

### Viewing Details
1. Click on any character card
2. View detailed information including:
   - Character description
   - Statistics (comics, series, stories, events)
   - Featured comics and series
   - External links to Marvel resources

### Navigation
- Use the navigation bar to switch between pages
- Back button in detail view returns to character list
- Responsive design adapts to different screen sizes

## 🔨 Build Commands

```bash
# Development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize:

- **Colors**: Update the color scheme in `tailwind.config.js`
- **Components**: Modify component styles in individual `.vue` files
- **Global styles**: Edit `src/assets/main.css`

### Data Source
- **Demo Mode**: Uses predefined character data
- **Live API**: Connects to Marvel's official API
- **Custom Data**: Extend the API service for other data sources

## 🐛 Troubleshooting

### Common Issues

1. **Tailwind styles not working**
   - Ensure Tailwind is properly configured
   - Check that the CSS imports are correct

2. **API requests failing**
   - Verify your Marvel API keys are correct
   - Check network connectivity
   - Ensure CORS is properly configured

3. **Build errors**
   - Run `npm run type-check` to identify TypeScript issues
   - Ensure all dependencies are installed

## 📝 License

This project is for educational purposes. Marvel content is © Marvel Entertainment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🙏 Acknowledgments

- Marvel for providing the amazing character data
- Vue.js team for the excellent framework
- Tailwind CSS for the utility-first approach
- All contributors to the open-source packages used

---

**Note**: This application is not affiliated with Marvel Entertainment. It's a demonstration project showcasing modern web development techniques.
