# MGA Quote Demo - PLAN.md

## 1. Project Overview
Create a lightweight, frontend-only demo website for Managing General Agents (MGAs) to quickly create Commercial Property and Commercial General Liability (CGL) insurance quotes.

**Purpose**: This is a simple test/demo site ONLY. It exists to validate functionality of a separate browser extension that will read the active account/submission from the DMS and auto-fill carrier quoting/rating pages. Keep effort minimal.

## 2. Scope & Constraints (Strict MVP)
- 100% client-side (Vite + React + TypeScript)
- No backend, no API, no database, no authentication, no security
- All data stored in localStorage only
- Hardcoded rates and simple calculations
- Three pages only: Login, Dashboard, Create/Edit Quote

## 3. Tech Stack
- Vite + React 18 + TypeScript
- Tailwind CSS (for clean, professional UI)
- jsPDF (or equivalent) for PDF generation
- React Router for navigation
- Simple state (useState + localStorage; no heavy libraries needed)

## 4. Pages & Features

### Login Page (`/login`)
- Simple demo form (email + password)
- Accept ANY email with password `demo123`
- "Login" button navigates straight to Dashboard

### Dashboard (`/`)
- Header with placeholder logo/title
- Prominent "New Quote" button
- Table of saved quotes (loaded from localStorage)
  - Columns: Quote ID, Type (Property/GL/Package), Insured Name, Total Premium, Created Date
- Click any row to edit that quote

### Create/Edit Quote Page
- Top selector/tabs:
  - Property Only
  - GL Only
  - Package (Property + GL)
- Form fields (grouped cleanly):
  - Insured Details (name, address, city, state, ZIP)
  - Location / Building Info
  - Building Values
  - Liability Limits
  - Prior Claims
  - Coverage Options (basic checkboxes)
- Real-time preview panel (right side or bottom) showing premium breakdown + total
- Buttons:
  - Save Draft (to localStorage)
  - Generate & Download PDF Quote
  - Cancel / Back to Dashboard

## 5. Rating Logic
- Keep extremely simple and hardcoded (basic formulas or flat rates per coverage type)
- Recalculate and update preview live on every form change

## 6. PDF Output
- Clean, professional one-page quote PDF showing all inputs, coverage summary, and total premium

## 7. Data-Sharing Convention for Browser Extension (Critical)
- Whenever the user is on the quote form, automatically save the current quote data to:
  `localStorage.setItem('mga-active-submission', JSON.stringify(currentQuoteData))`
- Define a clear TypeScript interface for the quote object so the extension can reliably read it later.

## 8. Out of Scope
- Real auth, security, encryption, or multi-user support
- Backend or API calls
- Mobile responsiveness (desktop-first is fine)
- Complex rules engine or external integrations

## 9. Success Criteria
An MGA (or tester) can log in, create/edit a quote, see live totals, save it, export a PDF, and have the data sitting in localStorage ready for the extension to consume.
