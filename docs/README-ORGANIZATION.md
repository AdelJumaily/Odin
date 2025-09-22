# Odin Project Organization

This project has been reorganized into a cleaner structure for better maintainability and separation of concerns.

## New Structure

```
odin/
├── company/                    # Company-related pages and components
│   ├── pages/                 # Company pages (landing, about, contact, etc.)
│   ├── components/            # Company-specific components
│   ├── assets/               # Company assets (logos, images, etc.)
│   ├── context/              # Company context providers
│   ├── data/                 # Company data and mock data
│   ├── lib/                  # Company utilities and database
│   └── types/                # Company type definitions
│
├── products/                  # Product-specific applications
│   ├── valkyrie/             # Valkyrie file management product
│   │   ├── frontend/         # React frontend
│   │   ├── backend/          # Python backend
│   │   ├── configs/          # Configuration files
│   │   ├── data/             # Product data
│   │   ├── migrations/       # Database migrations
│   │   ├── scripts/          # Deployment and utility scripts
│   │   ├── tests/            # Test files
│   │   └── *.md              # Product documentation
│   └── other/                # Future products
│
├── shared/                   # Shared components and utilities
│   ├── components/           # Reusable UI components
│   │   └── ui/              # Base UI components
│   ├── utils/               # Shared utility functions
│   └── types/               # Shared type definitions
│
└── src/                     # Main Next.js application
    └── app/                 # Next.js app router
        ├── company/         # Company routes
        ├── products/        # Product routes
        └── globals.css      # Global styles
```

## Key Benefits

1. **Clear Separation**: Company pages, products, and shared code are clearly separated
2. **Scalability**: Easy to add new products without cluttering the main structure
3. **Maintainability**: Each product can be developed and maintained independently
4. **Asset Organization**: All assets are centralized in appropriate folders
5. **Shared Resources**: Common components and utilities are easily accessible

## Development Commands

- `npm run dev` - Start the main Next.js application
- `npm run dev:valkyrie` - Start Valkyrie development server
- `npm run build:valkyrie` - Build Valkyrie for production
- `npm run install:valkyrie` - Install Valkyrie dependencies

## Import Paths

The project uses path aliases for cleaner imports:

- `@company/*` - Company-related files
- `@products/*` - Product-specific files  
- `@shared/*` - Shared utilities and components
- `@/*` - Main application files

## Migration Notes

- All original files have been preserved in their new locations
- Import paths have been updated to use the new aliases
- The main Next.js app now serves as a router to different sections
- Each product can be developed independently while sharing common resources
