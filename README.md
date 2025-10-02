# Mooch

A React Native mobile application for sharing and borrowing clothing items within groups, built with Expo and Firebase.

**Collaborated with:** Brennan Megregian and Kathryn Radziwonski

## Overview

Mooch is a social clothing sharing platform that allows users to share their wardrobe items with friends and borrow items from others. The app is designed for groups (like sororities, friend circles, etc.) to create a sustainable and cost-effective way to access different clothing items for various occasions.

## Features

### Core Functionality
- **User Authentication**: Secure login and account creation with Firebase Auth
- **Group Management**: Create and join different clothing sharing groups
- **Item Upload**: Upload clothing items with detailed metadata (brand, size, cleaning preferences, categories)
- **Browse & Filter**: Explore available items with category-based filtering (tops, bottoms, dresses, accessories, sets, shoes)
- **Item Requests**: Request to borrow items with date range selection
- **Direct Messaging**: Built-in chat system for coordinating item exchanges
- **Profile Management**: User profiles with personal information and uploaded items

### Technical Features
- **Image Upload**: Camera roll integration for item photos
- **Real-time Data**: Firebase Firestore for live updates
- **Cloud Storage**: Firebase Storage for image management
- **Responsive UI**: Material Design components with custom styling
- **Navigation**: Tab-based navigation with drawer menus for groups

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Navigation**: React Navigation v6
- **UI Components**: 
  - React Native Elements
  - Material-UI
  - React Native Paper
- **Image Handling**: Expo Image Picker
- **State Management**: React Hooks
- **Styling**: StyleSheet with custom color scheme

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mooch
   ```

2. **Install dependencies**
   ```bash
   cd src/mooch
   npm install
   # or
   yarn install
   ```

3. **Firebase Configuration**
   - The app is already configured with Firebase
   - Firebase config is located in `src/mooch/firebase/firebaseConfig.js`
   - Ensure your Firebase project has Firestore, Authentication, and Storage enabled

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run on device/simulator**
   - For iOS: `npm run ios` or press `i` in the Expo CLI
   - For Android: `npm run android` or press `a` in the Expo CLI
   - For web: `npm run web` or press `w` in the Expo CLI

## Project Structure

```
src/mooch/
├── App.js                 # Main app component with navigation
├── Screens/              # All screen components
│   ├── Landing.js        # Welcome/login screen
│   ├── Login.js          # User authentication
│   ├── CreateAccount.js  # Account creation
│   ├── Home.js           # Main tab navigation
│   ├── Explore.js        # Group selection drawer
│   ├── aphi.js           # Sample group (Alpha Phi)
│   ├── formals.js        # Formals group
│   ├── Upload.js         # Item upload functionality
│   ├── Profile.js        # User profile
│   ├── DMs.js            # Direct messages list
│   ├── DMing.js          # Individual chat
│   └── ...
├── firebase/
│   └── firebaseConfig.js # Firebase configuration
├── assets/               # App icons and splash screens
├── icons/                # UI icons and images
├── clothes_images/       # Sample clothing images
└── package.json          # Dependencies and scripts
```

## Key Components

### Navigation Structure
- **Stack Navigator**: Handles authentication flow and main navigation
- **Tab Navigator**: Bottom tabs for DMs, Explore, and Profile
- **Drawer Navigator**: Group selection within Explore

### Data Models
- **Users**: Authentication and profile information
- **Groups**: Clothing sharing groups (e.g., "Aphi", "Formals")
- **Posts**: Individual clothing items with metadata
- **Messages**: Direct messaging between users

### Item Metadata
Each clothing item includes:
- Image
- Brand
- Size
- Category tags (tops, bottoms, dresses, etc.)
- Cleaning preferences
- Owner information
- Availability dates

## Usage

1. **Sign Up/Login**: Create an account or log in with existing credentials
2. **Join Groups**: Access different clothing groups through the Explore tab
3. **Upload Items**: Add your clothing items with photos and details
4. **Browse Items**: Filter by category to find items you want to borrow
5. **Request Items**: Select date ranges for borrowing items
6. **Coordinate**: Use the messaging system to arrange pickups and returns

## Development

### Available Scripts
- `npm start`: Start the Expo development server
- `npm run ios`: Run on iOS simulator
- `npm run android`: Run on Android emulator
- `npm run web`: Run in web browser

### Code Style
- Uses functional components with React Hooks
- Custom styling with StyleSheet
- Consistent color scheme: `#e8def9` (light purple), `#f7f4fd` (background), `#5A5A5A` (text)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For questions or issues, please contact the development team.

---

**Note**: This app is designed for group-based clothing sharing and includes features specific to social organizations like sororities. The current implementation includes sample data and may require additional configuration for production use.
