# Odin Valkyrie Frontend

A modern React-based file management interface for the Odin Valkyrie backend system.

## Features

- **File Management**: Upload, download, and organize files
- **Project Organization**: Group files by projects
- **Search & Discovery**: Full-text search and advanced filtering
- **User Authentication**: API key-based authentication
- **Role-based Access**: Different permissions for different user roles
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live file status and progress indicators

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Lucide React** - Icons
- **date-fns** - Date utilities

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Odin Valkyrie backend running on port 6789

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment configuration:
```bash
cp env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The frontend connects to the Valkyrie backend API with the following endpoints:

- `GET /health` - Health check
- `POST /api/ingest` - File upload
- `GET /api/download/{doc_id}` - File download
- `GET /api/list` - List files
- `GET /api/search/text` - Text search
- `GET /api/search/entity` - Entity search
- `GET /api/search/connected` - Connected documents search

## Authentication

The application uses API key-based authentication. Users need to provide a valid API key to access the system.

Sample API keys (for development):
- CEO: `ceo-key-123`
- Editor: `alice-key-123`
- Intern: `intern-key-123`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FileList.jsx    # File grid/list display
│   ├── FileUpload.jsx  # File upload modal
│   ├── Header.jsx      # Top navigation
│   ├── Sidebar.jsx     # Left sidebar navigation
│   └── SearchBar.jsx   # Search and filtering
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication state
├── pages/              # Page components
│   ├── FileExplorer.jsx # Main file management page
│   └── LoginPage.jsx   # Authentication page
├── services/           # API and external services
│   └── api.js         # API client configuration
├── types/              # Type definitions
│   └── index.js       # Constants and enums
└── utils/              # Utility functions
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint for code quality and consistency. Run `npm run lint` to check for issues.

## Deployment

The frontend is designed to be served alongside the Valkyrie backend. The build process creates static files that can be served by any web server.

For Docker deployment, the frontend can be built and served by nginx or included in the backend container.

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Ensure all linting passes

## License

This project is part of the Odin Valkyrie file management system.
