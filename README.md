# Odin Platform

A clean, organized platform for company pages and product applications.

## Project Structure

```
odin/
├── company/              # Company pages and components
│   ├── pages/           # Company pages (dashboard, landing, etc.)
│   ├── components/      # Company-specific components
│   ├── assets/         # Company assets (logos, images)
│   ├── context/        # React contexts
│   ├── data/           # Company data and mock data
│   ├── lib/            # Company utilities and database
│   └── types/          # Company type definitions
│
├── products/            # Product applications
│   ├── valkyrie/       # Valkyrie file management system
│   └── other/          # Future products
│
├── shared/             # Shared components and utilities
│   ├── components/     # Reusable UI components
│   ├── utils/          # Shared utility functions
│   └── types/          # Shared type definitions
│
├── config/             # Configuration files
│   ├── docker/         # Docker configuration
│   ├── env/            # Environment files
│   └── *.json          # Various config files
│
├── scripts/            # Utility scripts
│   └── setup/          # Setup and installation scripts
│
├── assets/             # Static assets
│   └── images/         # Images and icons
│
├── docs/               # Documentation
│
├── data/               # Application data
├── database/           # Database schemas and migrations
└── src/                # Main Next.js application
    └── app/            # Next.js app router
```

## Development

### Main Application
```bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
```

### Valkyrie Product
```bash
npm run dev:valkyrie     # Start Valkyrie development
npm run build:valkyrie   # Build Valkyrie
npm run install:valkyrie # Install Valkyrie dependencies
```

## Key Features

- **Clean Organization**: Company pages, products, and shared code are clearly separated
- **Scalable Structure**: Easy to add new products without cluttering
- **Asset Management**: All assets centralized in appropriate folders
- **Path Aliases**: Clean imports using `@company/*`, `@products/*`, `@shared/*`
- **Configuration**: All config files organized in the `config/` folder

## Products

### Valkyrie
Advanced file management and security platform with:
- React frontend
- Python backend
- Docker deployment
- Database migrations
- Comprehensive testing

## Getting Started

1. Install dependencies: `npm install`
2. Start development: `npm run dev`
3. Access company pages: `http://localhost:3000/company`
4. Access products: `http://localhost:3000/products`
5. Launch Valkyrie: `http://localhost:3000/products/valkyrie`
