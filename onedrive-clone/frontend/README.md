# ShareHub - Frontend

A modern, feature-rich file storage application built with React and Tailwind CSS.

## Features

- 🔐 User authentication (login/register)
- 📁 File and folder management
- ⬆️ File upload with progress tracking
- ⬇️ File download
- ⭐ Favorites system
- 🗑️ Trash/recycle bin with restore functionality
- 🔍 Search files and folders
- 📊 Storage usage tracking
- 🎨 Modern, responsive UI with Tailwind CSS
- 🚀 Fast development with Vite

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **date-fns** - Date formatting

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend server running on `http://localhost:8080`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Project Structure

```
src/
├── api/              # API client functions
│   ├── axios.js      # Axios instance with interceptors
│   ├── auth.js       # Authentication API
│   ├── files.js      # Files API
│   └── folders.js    # Folders API
├── components/       # React components
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── FilesView.jsx
│   ├── FavoritesView.jsx
│   └── TrashView.jsx
├── context/          # React context providers
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── pages/            # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── App.jsx           # Main app component
├── main.jsx          # Application entry point
└── index.css         # Global styles
```

## API Integration

The frontend communicates with the backend API through a proxy configuration in `vite.config.js`. All requests to `/api/*` are proxied to `http://localhost:8080`.

## Features Overview

### Authentication
- JWT-based authentication
- Token stored in localStorage
- Automatic token refresh on API calls
- Protected routes

### File Management
- Upload files with drag-and-drop support
- Create folders and subfolders
- Navigate folder hierarchy
- Download files
- Move files to trash
- Restore files from trash
- Permanently delete files

### User Experience
- Real-time storage usage display
- Responsive design for all screen sizes
- Loading states and error handling
- Confirmation dialogs for destructive actions
- Toast notifications for user feedback

## Environment Variables

No environment variables are required for development. The API proxy is configured in `vite.config.ts`.

## License

MIT
