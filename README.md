# Satellite Tracking Dashboard

A modern Vue 3 + TypeScript application for tracking and managing satellite data. This dashboard allows users to view, filter, and select satellites from a comprehensive database.

## 🚀 Features

- **Real-time Satellite Data**: View up-to-date satellite information
- **Advanced Filtering**: Filter satellites by various attributes
- **Responsive Design**: Works on desktop and mobile devices
- **Modern Tech Stack**: Built with Vue 3, TypeScript, Vuetify, and Pinia
- **Type Safety**: Full TypeScript support for better developer experience

## 📦 Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or yarn 1.22+
- Git

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/digantra-assignment-ts.git](https://github.com/yourusername/digantra-assignment-ts.git)
   cd digantra-assignment-ts

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install

3. Set environment variables:
   ```bash
   cp .env.example .env
   # Edit .env file and add your API base URL

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev

5. Build for production:
   ```bash
   npm run build
   # or
   yarn build

6. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   # or
   yarn deploy

🏗️ Project Structure
    src/
    ├── assets/          # Static assets
    ├── components/      # Reusable Vue components
    ├── composables/     # Vue composition functions
    ├── layouts/         # Layout components
    ├── plugins/         # Vue plugins
    ├── router/          # Vue Router configuration
    ├── services/        # API services
    ├── stores/          # Pinia stores
    ├── styles/          # Global styles
    ├── types/           # TypeScript type definitions
    └── views/           # Page components