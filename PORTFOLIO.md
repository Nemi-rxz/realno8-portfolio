# RealNov8 Group — Portfolio Bible
### Smart Real Estate · Sustainable Cities · SDG-Aligned Technology

> **Intellectual Foundation:** *Sustainable Cities in Africa* — the role of technology,
> data, IoT, and AI in shaping modern, equitable, and sustainable African cities.
> Every tool in this portfolio is built in service of that vision.

---

## 🗺️ The 5-Tool Ecosystem

| # | Project | Status | Live URL | Stack | Last Updated |
|---|---|---|---|---|---|
| 1 | ROI Calculator | ✅ Complete | [Live](https://realnov8-roi-calculator-qhld.vercel.app/) | React 19 · Vite 8 | — |
| 2 | Property Listing App | 🔄 In Progress | — | React 19 · Vite 8 | — |
| 3 | Real Estate Chatbot | ⬜ Not Started | — | React 19 · Vite 8 | — |
| 4 | n8n Automation System | ⬜ Not Started | — | n8n · Webhooks | — |
| 5 | Smart City Dashboard | ⬜ Not Started | — | React 19 · Recharts | — |

> Update the **Status** and **Last Updated** columns every time you work on a project.
> Update **Live URL** the moment you deploy to Vercel.

---

## 🏗️ Shared Architecture

Every project follows this folder structure:

```
project-X-name/
├── src/
│   ├── App.jsx          # Root component
│   ├── index.css        # Full design system
│   ├── main.jsx         # React entry point
│   ├── components/      # Reusable UI pieces
│   ├── pages/           # Route-level views (if multi-page)
│   ├── hooks/           # Custom React logic
│   ├── utils/
│   │   └── format.js    # fmt(), fmtShort(), pct(), sus helpers
│   └── data/            # Static or mock data (swap for API later)
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### Rules that never break:
- Data and UI are always separated (data/ vs components/)
- Shared formatters live in utils/format.js — never duplicated
- Every project has its own README.md
- Every project is deployed to Vercel before being shown to a client

---

## 🎨 Design System (Shared Across All 5 Tools)

### Color Tokens
```css
--bg:        #080e1a   /* Page background */
--surface:   #0f172a   /* Cards */
--surface2:  #1e293b   /* Nested elements */
--border:    #1e2d45   /* Subtle borders */
--text:      #f1f5f9   /* Primary text */
--muted:     #64748b   /* Secondary text */
--accent:    #38bdf8   /* Sky blue — brand color */
--green:     #22c55e   /* Positive / high sustainability */
--amber:     #f59e0b   /* Warning / mid sustainability */
--red:       #ef4444   /* Negative / low sustainability */
--purple:    #a78bfa   /* Accent highlight */
```

### Typography
- **Display / Headings:** Syne (800 weight) — bold, architectural
- **Body / UI:** DM Sans — clean, readable

### Branding Rules
- Eyebrow text always: `RealNov8 Group`
- Footer always: `RealNov8 Group — Smart Real Estate, Sustainable Cities`
- Project badge always: `Project X of 5`
- Logo mark: `R8` in a rounded square with accent→purple gradient

---

## 🌍 SDG Framework (Applied to Every Tool)

Every tool maps to the UN Sustainable Development Goals from *Sustainable Cities in Africa*:

| SDG | Goal | How We Apply It |
|---|---|---|
| SDG 6 | Clean Water Access | Water/resource score in listings & dashboard |
| SDG 7 | Affordable Clean Energy | Solar/energy features weighted in sustainability score |
| SDG 11 | Sustainable Cities & Communities | Core metric across all tools |
| SDG 13 | Climate Action | Carbon/environmental impact indicators |

**Rule:** Every tool must display at least one SDG-related metric or score.

---

## 📦 Project Details

---

### Project 1 — ROI Calculator ✅
**Purpose:** Help investors analyze property ROI, rental yield, and sustainability before buying.

**Key Features:**
- Property input sliders (price, rent, expenses, mortgage, duration)
- Annual ROI, rental yield, cash flow, payback period
- 5-year projection charts (line + bar via Recharts)
- Sustainability score by location type (urban/suburban/rural)
- SDG alignment bars (SDG 6, 7, 11, 13)
- PDF export with jsPDF

**Stack:** React 19 · Vite 8 · Recharts · jsPDF
**Deploy:** Vercel
**Folder:** `project-1-roi-calculator/`

**How to run locally:**
```bash
cd project-1-roi-calculator
npm install
npm run dev
```

---

### Project 2 — Property Listing App 🔄
**Purpose:** Browse, filter, save, and compare Nigerian real estate listings with ROI and sustainability data baked in.

**Key Features:**
- Search by location, type, or name
- Filter by city, type, status (sale/rent)
- Sort by ROI or sustainability score
- Grid / List view toggle
- Property detail modal with SDG scores
- Save / shortlist system
- Side-by-side property comparison (up to 3)

**Stack:** React 19 · Vite 8 · Pure CSS
**Deploy:** Vercel (pending)
**Folder:** `project-2-property-listing-app/`

**How to run locally:**
```bash
cd project-2-property-listing-app
npm install
npm run dev
```

**What's next for this project:**
- [ ] Connect to a real backend (Supabase recommended)
- [ ] Add a map view (Leaflet.js)
- [ ] Add pagination for large listing sets
- [ ] Add "Request a tour" form

---

### Project 3 — Real Estate Chatbot ⬜
**Purpose:** An AI assistant that answers property questions, helps users explore listings, and provides sustainability insights.

**Planned Features:**
- Conversational UI (chat interface)
- Connects to listing data to answer questions like "show me 3-bed apartments under ₦50M in Lagos"
- SDG education mode — explains sustainability scores
- Powered by Claude API (Anthropic)

**Stack:** React 19 · Vite 8 · Anthropic API
**Folder:** `project-3-real-estate-chatbot/`

---

### Project 4 — n8n Automation System ⬜
**Purpose:** Automate real estate operations — lead capture, client notifications, data syncing, and reporting.

**Planned Workflows:**
- Lead capture form → auto email notification → CRM entry
- New listing alert → send to subscriber list
- Weekly ROI report → auto-generate and email
- Property inquiry → assign to agent + notify client

**Stack:** n8n · Webhooks · Email (SMTP/SendGrid) · Google Sheets or Airtable
**Folder:** `project-4-n8n-automation/`

---

### Project 5 — Smart City Dashboard ⬜
**Purpose:** Visualize real estate market data, urban development metrics, and sustainability indicators across Nigerian cities.

**Planned Features:**
- City-level sustainability scores
- Property price trends by zone
- Infrastructure index (water, power, roads)
- SDG progress indicators
- Interactive charts (Recharts + D3)

**Stack:** React 19 · Vite 8 · Recharts · D3.js
**Folder:** `project-5-smart-city-dashboard/`

---

## 🚀 Deployment Workflow

Every project follows this exact deployment process:

```bash
# 1. Finish the feature locally
npm run dev   # test it

# 2. Build for production
npm run build # check for errors

# 3. Commit to GitHub
git add .
git commit -m "feat: describe what you built"
git push

# 4. Deploy to Vercel
# Go to vercel.com → Import project → Select folder → Deploy
# OR use Vercel CLI: vercel --prod

# 5. Update this file
# Add the live URL to the table at the top
```

---

## 👤 Client Handoff Checklist

Before showing any tool to a client or investor, confirm:

- [ ] Code is on GitHub (pushed and up to date)
- [ ] Project has a complete README.md
- [ ] App is live on Vercel (not just running locally)
- [ ] All features work on mobile
- [ ] No console errors in the browser
- [ ] PORTFOLIO.md is updated with latest status
- [ ] You can explain every major decision in plain English

---

## 📖 How I Build (Personal Process)

1. **Understand the problem** — what does this tool solve? For whom?
2. **Map to the thesis** — how does it serve sustainable cities?
3. **Define the data** — what goes in `data/` and `utils/`?
4. **Build the UI** — components, pages, layout
5. **Wire it up** — connect data to UI
6. **Test edge cases** — empty states, mobile view, bad input
7. **Deploy** — Vercel
8. **Document** — update README + this file

---

## 🔗 Links

- GitHub: https://github.com/Nemi-rxz/realno8-portfolio
- ROI Calculator (Live): https://realnov8-roi-calculator-qhld.vercel.app/
- Book: *Sustainable Cities in Africa* — Technology and Innovation

---

*RealNov8 Group — Smart Real Estate, Sustainable Cities*
*Last updated: 2026*
