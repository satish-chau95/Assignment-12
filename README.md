# Assignment-12
# Bug Tracker

A modern bug tracking application built with Next.js 13, TypeScript, and Tailwind CSS.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher recommended)
- npm (comes with Node.js)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd bug-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI primitives for accessible components
  - Custom shadcn/ui components
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Date Handling**: date-fns
- **Charts**: Recharts
- **Theme**: Dark/Light mode support via next-themes

## Project Structure

- `/app` - Next.js 13 app directory containing routes and layouts
- `/components` - Reusable UI components
  - `/ui` - Base UI components built with Radix UI
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and shared logic

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- Modern UI with customizable components
- Responsive design
- Accessible components using Radix UI primitives
- Dark/Light theme support
- Form validation
- Data visualization with Recharts
- Toast notifications
- Modular component architecture

## Development Notes

- The project uses the Next.js App Router for routing
- TypeScript is used throughout for type safety
- Tailwind CSS is configured with custom animations and utilities
- Components are built with accessibility in mind using Radix UI primitives

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

[Add your license here]

