# Project Plan: URL Shortener (like bit.ly)

## Project Overview
Build a full-featured URL shortening service with analytics.

## Tech Stack
- Backend: Node.js + Express or FastAPI (Python)
- Database: PostgreSQL
- Frontend: VITE/React-TypeScript + Tailwind
- Caching: Redis (optional)

## Core Features
1. Shorten long URLs → generate short code (e.g., yourdomain.com/abc123)
2. Custom short codes (if available)
3. Password protection for links
4. Expiration dates for links
5. Click analytics dashboard (total clicks, by date, by country, referrer)
6. QR code generation for each short link
7. Link history for logged-in users

## Technical Requirements
- Handle high traffic (efficient redirects)
- Prevent abuse (rate limiting)
- Clean, minimal UI for both landing and dashboard

## Deliverables
- Working shortener with public landing page + user dashboard
- Proper 301 redirects