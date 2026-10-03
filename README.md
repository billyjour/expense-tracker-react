# Spendly — Expense Tracker

A clean, responsive personal finance dashboard built with **React** and **Vite**. Spendly lets you record income and expenses, browse and search your transactions, visualize spending by category, and review a full activity history — all stored locally in your browser.

## Live Demo

🔗 **[spendly-expense-tracker-04.vercel.app](https://spendly-expense-tracker-04.vercel.app/)**

## Features

- **Wallet overview** — see your current balance, total income, and total expenses at a glance, with a time-aware greeting (Morning / Afternoon / Evening / Night).
- **Add transactions** — enter a name, amount, category, type (income or expense), and date. Amounts are auto-formatted in Indonesian Rupiah style (e.g. `1.500.000`).
- **12 categories** — Food, Utilities, Transport, Shopping, Health, Education, Salary, Freelance, Business, Investment, Gift, and Other.
- **Recent transactions** — the five most recent entries are shown by default.
- **Search, sort & filter** — search by name, sort by newest, oldest, highest, or lowest amount, show only income or expenses, and filter by category.
- **View, edit & delete** — click any transaction to open a detail modal where you can edit or delete it. Balance, income, and expense totals update automatically.
- **Activity history** — every add, edit, and delete is logged with a timestamp. Edited entries show a before/after comparison with changed fields highlighted. Filter the log by *All*, *Added*, *Edited*, or *Deleted*.
- **Statistics** — interactive donut charts for *Expense by Category* and *Income by Category*, powered by Recharts.
- **Persistent data** — everything is saved to `localStorage`, so your data survives page reloads.
- **Responsive layout** — works on desktop and mobile screens.

## Tech Stack

| Area | Tools |
| --- | --- |
| UI library | [React 19](https://react.dev) |
| Build tool | [Vite 8](https://vite.dev) |
| Charts | [Recharts 3](https://recharts.org) |
| Icons | [Bootstrap Icons](https://icons.getbootstrap.com) |
| Optimization | [React Compiler](https://react.dev/learn/react-compiler) (via `babel-plugin-react-compiler`) |
| Linting | [Oxlint](https://oxc.rs) |
| Typography | Clash Display (variable font, bundled locally) |
| Deployment | [Vercel](https://vercel.com) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (a current LTS version is recommended)
- npm (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/billyjour/expense-tracker-react.git

# Move into the project folder
cd expense-tracker-react

# Install dependencies
npm install
```

### Run the development server

```bash
npm run dev
```

Then open the local URL printed in your terminal (usually `http://localhost:5173`).

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint on the project |

## Project Structure

```
expense-tracker/
├── public/                  # Static assets (favicon, icons)
├── src/
│   ├── assets/              # Images and SVGs
│   ├── fonts/               # Clash Display variable font
│   ├── AddTransaction.jsx   # Form for adding income/expense
│   ├── App.jsx              # App entry component
│   ├── ExpenseTracker.jsx   # Main component: state, persistence, layout
│   ├── History.jsx          # Activity log (added / edited / deleted)
│   ├── ListTransactions.jsx # Transaction list, sorting, filtering, edit/delete
│   ├── Modal.jsx            # Reusable modal (rendered via React portal)
│   ├── Navigation.jsx       # Sidebar navigation
│   ├── PersonalFinance.jsx  # Header and wallet summary cards
│   ├── Search.jsx           # Search, sort, and category filter controls
│   ├── Statistics.jsx       # Donut charts by category
│   ├── index.css            # Global styles
│   └── main.jsx             # React entry point
├── index.html
├── vite.config.js
└── package.json
```

## How It Works

- **State** lives in `ExpenseTracker.jsx` (balance, income, expense, transactions, and history) and is passed down to child components as props.
- **Persistence:** a `useEffect` hook writes the state to `localStorage` whenever it changes, and the initial state is read back from it on load.
- **Totals** are updated incrementally whenever a transaction is added, edited (including changing its type), or deleted.
- **Chart data** is derived from the transaction list by grouping amounts per category.

## Notes

- The default starting balance is **Rp 200.000** on first launch.
- Currency is formatted for Indonesian Rupiah (`id-ID`).
- All data is stored in your browser only. Clearing your browser's site data will reset the app.
