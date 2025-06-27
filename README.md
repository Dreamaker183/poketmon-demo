# PokeValue - Pokémon TCG Price Index

Welcome to PokeValue, a modern web application for tracking the market value of Pokémon Trading Card Game (TCG) cards. This application provides a comprehensive dashboard with market trends, detailed card information, and powerful search and filtering capabilities.

![PokeValue Screenshot](https://placehold.co/800x450.png?text=PokeValue+App+Screenshot)

## ✨ Features

- **Interactive Dashboard**: View the overall Pokémon TCG Market Index, including performance indicators and historical data charts.
- **Regional Market Data**: Track performance across different markets like US, Japan, and vintage cards.
- **Trending Cards & Top Gainers**: Quickly see which cards are currently popular or have the highest price increase.
- **Powerful Search & Filtering**:
    - Search for cards by name, set, or number from anywhere in the app.
    - Filter the main data table by rarity and set.
- **Detailed Card View**: Click on any card to see an in-depth analysis, including:
    - Graded prices (PSA, BGS, CGC, etc.).
    - A detailed price trend chart (candlestick style).
    - Recent trade records from various platforms.
- **Browse Sets**: Explore a comprehensive list of all Pokémon TCG sets, grouped by era.
- **Responsive Design**: A clean, modern UI that works beautifully on desktop and mobile devices.
- **Light & Dark Mode**: Switch between light and dark themes to suit your preference.

## 🚀 Tech Stack

This project is built with a modern, production-ready tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Charting**: [Recharts](https://recharts.org/)
- **AI (Future-ready)**: [Genkit](https://firebase.google.com/docs/genkit) for potential generative AI features.

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd pokevalue
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```

### Running the Application

To start the development server, run:

```sh
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📁 Project Structure

- `src/app/`: Contains all the pages and layouts, following the Next.js App Router structure.
- `src/components/`: Houses all the reusable React components, including UI components from ShadCN and custom application components.
- `src/lib/`: Includes utility functions (`utils.ts`), TypeScript type definitions (`types.ts`), and sample data (`sample-data.ts`).
- `src/ai/`: Reserved for Genkit AI flows and configuration.
- `public/`: Static assets like images and fonts.
- `tailwind.config.ts`: Configuration file for Tailwind CSS.

---

This project was bootstrapped with Firebase Studio.
