# Project Plan: Personal Finance Tracker

## Project Overview
Build a clean, modern single-page web application for tracking personal income, expenses, and budgets.

## Tech Stack
- Frontend: React + TypeScript + Tailwind CSS
- State Management: Zustand or Redux Toolkit
- Backend: Node.js + Express
- Database: SQLite (with Prisma ORM) or PostgreSQL
- Charts: Recharts or Chart.js

## Core Features
1. Dashboard with total balance, monthly income/expense summary, and spending chart
2. Add/Edit/Delete transactions (amount, category, date, description, type: income/expense)
3. Categories management (predefined + custom)
4. Monthly/Yearly budget setting and progress tracking
5. Transaction filtering and search
6. Dark/Light mode toggle
7. Export data as CSV

## Pages/Routes
- `/` → Dashboard
- `/transactions` → All transactions list
- `/budgets` → Budget management
- `/reports` → Charts and analytics

## Non-functional Requirements
- Fully responsive (mobile-first)
- Data persistence between sessions
- Clean, minimal UI inspired by Notion/Monarch
- Proper error handling and loading states

## Deliverables
- Complete working web app
- README with setup instructions
- Sample data for testing

## Bonus (if time allows)
- Recurring transactions
- Multi-currency support
- Goal saving tracker