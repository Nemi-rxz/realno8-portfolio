# 🏘️ Project 2 — Property Listing App
### RealNov8 Group · Smart Real Estate, Sustainable Cities

---

## Overview
A property browsing and analysis web app for the Nigerian real estate market.  
Built as part of the **realnov8-portfolio** — a 5-tool digital ecosystem for sustainable, data-driven real estate.

**Intellectual foundation:** *Sustainable Cities in Africa* — the role of technology, data, and AI in shaping modern, SDG-aligned cities.

---

## Features
- 🔍 **Search & Filter** — by city, property type, status (sale/rent), and sort by ROI or sustainability
- ⊞ **Grid / List view toggle**
- 📊 **ROI & rental yield** — estimated on every card
- 🌱 **Sustainability score** — visible on every listing
- 🇺🇳 **SDG alignment** — SDG 6, 7, 11, 13 scores in each property detail modal
- ★ **Save / Shortlist** — save properties to a personal shortlist
- ⇄ **Side-by-side Compare** — compare up to 3 properties on key metrics

---

## Stack
| Tool | Version |
|---|---|
| React | 19 |
| Vite | 8 |
| CSS | Custom (no Tailwind — pure CSS variables) |

---

## Project Structure
```
src/
├── App.jsx          # All components + main app (single-file architecture)
├── index.css        # Full design system
├── main.jsx         # React entry
├── data/
│   └── listings.js  # Mock property data (Nigerian cities)
└── utils/
    └── format.js    # Shared formatters (fmt, fmtShort, pct, sus helpers)
```

---

## Getting Started
```bash
npm install
npm run dev
```

---

## Part of: realnov8-portfolio
| # | Project | Status |
|---|---|---|
| 1 | ROI Calculator | ✅ Complete |
| 2 | Property Listing App | 🔄 In Progress |
| 3 | Real Estate Chatbot | ⬜ Not started |
| 4 | n8n Automation System | ⬜ Not started |
| 5 | Smart City Dashboard | ⬜ Not started |

---

*RealNov8 Group — Smart Real Estate, Sustainable Cities*
