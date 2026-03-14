import { useState, useMemo } from "react";
import { LISTINGS, CITIES, TYPES, STATUS, SDG_LABELS } from "./data/listings";
import { fmt, fmtShort, pct, susColor, susClass, susLabel } from "./utils/format";
import "./index.css";

// ─── Property Card (Grid) ───────────────────────────────────
function PropertyCard({ listing, onOpen, saved, onSave }) {
  const statusClass = `badge-${listing.status}`;
  const statusLabel = listing.status === "for-sale" ? "For Sale" : listing.status === "for-rent" ? "For Rent" : "Sold";

  return (
    <div className="property-card" onClick={() => onOpen(listing)}>
      <div className="card-image-placeholder">
        <span>{listing.emoji}</span>
        <span className={`card-badge ${statusClass}`}>{statusLabel}</span>
        <span className={`sus-badge ${susClass(listing.sustainabilityScore)}`}>
          🌱 {listing.sustainabilityScore}
        </span>
      </div>
      <div className="card-body">
        <div className="card-price">{fmtShort(listing.price)}</div>
        <div className="card-price-sub">
          {listing.status === "for-rent"
            ? `Est. ${fmtShort(listing.rentEstimate)}/mo`
            : `Est. rent ${fmtShort(listing.rentEstimate)}/mo`}
        </div>
        <div className="card-title-text">{listing.title}</div>
        <div className="card-location">📍 {listing.location}</div>
        <div className="card-specs">
          {listing.beds > 0 && <span className="card-spec"><span className="card-spec-icon">🛏</span>{listing.beds} beds</span>}
          <span className="card-spec"><span className="card-spec-icon">🚿</span>{listing.baths} baths</span>
          <span className="card-spec"><span className="card-spec-icon">📐</span>{listing.sqm}m²</span>
        </div>
      </div>
      <div className="card-footer">
        <div className="card-roi">
          <div className="card-roi-val">{pct(listing.roiEstimate)} ROI</div>
          <div className="card-roi-label">Est. Annual</div>
        </div>
        <div className="card-actions">
          <button
            className={`btn-icon${saved ? " saved" : ""}`}
            onClick={e => { e.stopPropagation(); onSave(listing.id); }}
            title={saved ? "Unsave" : "Save"}
          >
            {saved ? "★" : "☆"}
          </button>
          <button className="btn-detail" onClick={e => { e.stopPropagation(); onOpen(listing); }}>
            View →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Property Card (List) ───────────────────────────────────
function PropertyCardList({ listing, onOpen, saved, onSave }) {
  return (
    <div className="property-card-list" onClick={() => onOpen(listing)}>
      <div className="list-image">
        <span>{listing.emoji}</span>
        <span className={`sus-badge ${susClass(listing.sustainabilityScore)}`} style={{ top: 8, right: 8 }}>
          🌱 {listing.sustainabilityScore}
        </span>
      </div>
      <div className="list-body">
        <div className="list-main">
          <div className="list-price">{fmtShort(listing.price)}</div>
          <div className="list-title">{listing.title}</div>
          <div className="list-location">📍 {listing.location}</div>
          <div className="list-specs">
            {listing.beds > 0 && <span className="list-spec">🛏 {listing.beds}</span>}
            <span className="list-spec">🚿 {listing.baths}</span>
            <span className="list-spec">📐 {listing.sqm}m²</span>
            <span className="list-spec">📅 {listing.yearBuilt}</span>
          </div>
        </div>
        <div className="list-right">
          <div>
            <div className="list-roi-val">{pct(listing.roiEstimate)}</div>
            <div className="list-roi-label">Est. ROI</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className={`btn-icon${saved ? " saved" : ""}`}
              onClick={e => { e.stopPropagation(); onSave(listing.id); }}>
              {saved ? "★" : "☆"}
            </button>
            <button className="btn-detail" onClick={e => { e.stopPropagation(); onOpen(listing); }}>
              View →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Property Modal ─────────────────────────────────────────
function PropertyModal({ listing, onClose, saved, onSave }) {
  if (!listing) return null;
  const c = susColor(listing.sustainabilityScore);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-image">
          <span>{listing.emoji}</span>
          <span className={`card-badge badge-${listing.status}`} style={{ top: 14, left: 14 }}>
            {listing.status === "for-sale" ? "For Sale" : "For Rent"}
          </span>
        </div>

        <div className="modal-header" style={{ paddingTop: 0 }}>
          <div style={{ flex: 1 }}>
            <div className="modal-price">{fmt(listing.price)}</div>
            <div className="modal-name">{listing.title}</div>
            <div className="modal-location">📍 {listing.location}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Key Metrics */}
          <div className="modal-metrics">
            <div className="modal-metric">
              <div className="modal-metric-val" style={{ color: "#22c55e" }}>{pct(listing.roiEstimate)}</div>
              <div className="modal-metric-label">Est. ROI</div>
            </div>
            <div className="modal-metric">
              <div className="modal-metric-val" style={{ color: "#38bdf8" }}>{fmtShort(listing.rentEstimate)}</div>
              <div className="modal-metric-label">Monthly Rent</div>
            </div>
            <div className="modal-metric">
              <div className="modal-metric-val" style={{ color: c }}>{listing.sustainabilityScore}</div>
              <div className="modal-metric-label">Sus. Score</div>
            </div>
          </div>

          {/* Description */}
          <p className="modal-section-title">About</p>
          <p className="modal-desc">{listing.description}</p>

          {/* Specs */}
          <p className="modal-section-title">Property Details</p>
          <div className="modal-specs">
            {listing.beds > 0 && (
              <div className="modal-spec-row">
                <span className="modal-spec-key">🛏 Bedrooms</span>
                <span className="modal-spec-val">{listing.beds}</span>
              </div>
            )}
            <div className="modal-spec-row">
              <span className="modal-spec-key">🚿 Bathrooms</span>
              <span className="modal-spec-val">{listing.baths}</span>
            </div>
            <div className="modal-spec-row">
              <span className="modal-spec-key">📐 Size</span>
              <span className="modal-spec-val">{listing.sqm} m²</span>
            </div>
            <div className="modal-spec-row">
              <span className="modal-spec-key">🚗 Parking</span>
              <span className="modal-spec-val">{listing.parking} spaces</span>
            </div>
            <div className="modal-spec-row">
              <span className="modal-spec-key">📅 Year Built</span>
              <span className="modal-spec-val">{listing.yearBuilt}</span>
            </div>
            <div className="modal-spec-row">
              <span className="modal-spec-key">🏙 City</span>
              <span className="modal-spec-val">{listing.city}</span>
            </div>
          </div>

          {/* Features */}
          <p className="modal-section-title">Features</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
            {listing.features.map(f => (
              <span key={f} style={{
                padding: "5px 12px",
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.15)",
                borderRadius: 20,
                fontSize: 12,
                color: "#94a3b8"
              }}>{f}</span>
            ))}
          </div>

          {/* SDG */}
          <p className="modal-section-title">Sustainability — SDG Alignment</p>
          <div className="modal-sdg">
            {Object.entries(SDG_LABELS).map(([key, { label, icon }]) => {
              const score = listing.sdgScores[key];
              return (
                <div className="modal-sdg-row" key={key}>
                  <span style={{ fontSize: 14, minWidth: 20 }}>{icon}</span>
                  <span style={{ fontSize: 12, color: "#94a3b8", flex: 1 }}>{label}</span>
                  <div className="modal-sdg-bar-bg" style={{ maxWidth: 120 }}>
                    <div className="modal-sdg-bar-fill" style={{ width: `${score}%` }} />
                  </div>
                  <span className="modal-sdg-score">{score}</span>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="modal-cta">
            <button className="btn-primary">📞 Contact Agent</button>
            <button
              className="btn-secondary"
              onClick={() => onSave(listing.id)}
            >
              {saved ? "★ Saved" : "☆ Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────
export default function App() {
  const [page, setPage]         = useState("browse");   // browse | saved | compare
  const [search, setSearch]     = useState("");
  const [city, setCity]         = useState("All Cities");
  const [type, setType]         = useState("All Types");
  const [status, setStatus]     = useState("all");
  const [sort, setSort]         = useState("roi-desc");
  const [viewMode, setViewMode] = useState("grid");
  const [selected, setSelected] = useState(null);       // modal
  const [saved, setSaved]       = useState(new Set());
  const [compare, setCompare]   = useState([]);         // max 3 ids

  const toggleSave = (id) =>
    setSaved(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  // ── Filtering ──
  const filtered = useMemo(() => {
    let list = [...LISTINGS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q)
      );
    }

    if (city !== "All Cities") list = list.filter(l => l.city === city);
    if (type !== "All Types")  list = list.filter(l => l.type === type);
    if (status !== "all")      list = list.filter(l => l.status === status);

    switch (sort) {
      case "price-asc":   list.sort((a, b) => a.price - b.price);                          break;
      case "price-desc":  list.sort((a, b) => b.price - a.price);                          break;
      case "roi-desc":    list.sort((a, b) => b.roiEstimate - a.roiEstimate);              break;
      case "sus-desc":    list.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore); break;
      default: break;
    }

    return list;
  }, [search, city, type, status, sort]);

  const savedListings  = LISTINGS.filter(l => saved.has(l.id));
  const compareListings = LISTINGS.filter(l => compare.includes(l.id));

  const COMPARE_FIELDS = [
    { label: "Price",           render: l => fmtShort(l.price) },
    { label: "Est. Monthly Rent", render: l => fmtShort(l.rentEstimate) },
    { label: "Est. Annual ROI", render: l => pct(l.roiEstimate) },
    { label: "Rental Yield",    render: l => pct(l.rentalYield) },
    { label: "Sustainability",  render: l => `${l.sustainabilityScore}/100` },
    { label: "Type",            render: l => l.type },
    { label: "Location",        render: l => l.city },
    { label: "Beds / Baths",    render: l => `${l.beds} / ${l.baths}` },
    { label: "Size",            render: l => `${l.sqm} m²` },
    { label: "Year Built",      render: l => l.yearBuilt },
  ];

  return (
    <div className="app">
      {/* Top bar */}
      <div className="topbar">
        <div className="topbar-brand">
          <div className="topbar-logo">R8</div>
          <span className="topbar-name">RealNov8 <span>Listings</span></span>
        </div>
        <nav className="topbar-nav">
          {["browse", "saved", "compare"].map(p => (
            <button key={p} className={page === p ? "active" : ""} onClick={() => setPage(p)}>
              {p === "browse" ? "🏘 Browse" : p === "saved" ? `★ Saved (${saved.size})` : `⇄ Compare (${compare.length})`}
            </button>
          ))}
        </nav>
        <span className="topbar-tag">Project 2 of 5</span>
      </div>

      {/* ── Browse Page ── */}
      {page === "browse" && (
        <>
          <div className="hero">
            <div className="hero-eyebrow">RealNov8 Group — Smart Real Estate</div>
            <h1>Find Your Next <span>Investment</span></h1>
            <p className="hero-sub">
              Browse curated Nigerian properties with live ROI estimates, sustainability scores, and SDG impact data.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">{LISTINGS.length}<span>+</span></span>
                <span className="hero-stat-label">Properties</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">4<span> cities</span></span>
                <span className="hero-stat-label">Covered</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">9.8<span>%</span></span>
                <span className="hero-stat-label">Avg. ROI</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">SDG<span> aligned</span></span>
                <span className="hero-stat-label">All Listings</span>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="search-section">
            <div className="search-bar">
              <div className="search-input-wrap">
                <span className="search-icon">🔍</span>
                <input
                  className="search-input"
                  placeholder="Search by location, type, or name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button className="search-btn">Search</button>
            </div>
            <div className="filters">
              <span className="filter-label">Filter:</span>

              {/* City */}
              <select className="filter-select" value={city} onChange={e => setCity(e.target.value)}>
                {["All Cities", "Lagos", "Abuja", "Port Harcourt", "Enugu"].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              {/* Type */}
              <select className="filter-select" value={type} onChange={e => setType(e.target.value)}>
                {["All Types", "apartment", "duplex", "terrace", "flat", "bungalow", "villa", "commercial"].map(t => (
                  <option key={t} style={{ textTransform: "capitalize" }}>{t}</option>
                ))}
              </select>

              {/* Sort */}
              <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="roi-desc">Highest ROI</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="sus-desc">Sustainability</option>
              </select>

              {/* Status chips */}
              {STATUS.map(s => (
                <button
                  key={s}
                  className={`filter-chip${status === s ? " active" : ""}`}
                  onClick={() => setStatus(s)}
                >
                  {s === "all" ? "All" : s === "for-sale" ? "For Sale" : "For Rent"}
                </button>
              ))}
            </div>
          </div>

          {/* Results bar */}
          <div className="results-bar">
            <span className="results-count">
              Showing <strong>{filtered.length}</strong> of {LISTINGS.length} properties
            </span>
            <div className="view-toggle">
              <button className={`view-btn${viewMode === "grid" ? " active" : ""}`} onClick={() => setViewMode("grid")}>⊞</button>
              <button className={`view-btn${viewMode === "list" ? " active" : ""}`} onClick={() => setViewMode("list")}>☰</button>
            </div>
          </div>

          {/* Listings */}
          <div className="listings-container">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <div className="empty-title">No properties found</div>
                <div className="empty-sub">Try adjusting your filters or search terms</div>
              </div>
            ) : viewMode === "grid" ? (
              <div className="listings-grid">
                {filtered.map(l => (
                  <PropertyCard
                    key={l.id} listing={l}
                    onOpen={setSelected}
                    saved={saved.has(l.id)}
                    onSave={toggleSave}
                  />
                ))}
              </div>
            ) : (
              <div className="listings-list">
                {filtered.map(l => (
                  <PropertyCardList
                    key={l.id} listing={l}
                    onOpen={setSelected}
                    saved={saved.has(l.id)}
                    onSave={toggleSave}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Saved Page ── */}
      {page === "saved" && (
        <>
          <div className="page-header">
            <div className="page-title">★ Saved Properties</div>
            <div className="page-sub">{saved.size} properties saved to your shortlist</div>
          </div>
          {savedListings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">☆</div>
              <div className="empty-title">Nothing saved yet</div>
              <div className="empty-sub">Browse listings and click ☆ to save properties here</div>
            </div>
          ) : (
            <div className="listings-container">
              <div className="listings-grid">
                {savedListings.map(l => (
                  <PropertyCard
                    key={l.id} listing={l}
                    onOpen={setSelected}
                    saved={true}
                    onSave={toggleSave}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Compare Page ── */}
      {page === "compare" && (
        <>
          <div className="page-header">
            <div className="page-title">⇄ Compare Properties</div>
            <div className="page-sub">
              {compare.length === 0
                ? "Save properties first, then add them here to compare side-by-side"
                : `Comparing ${compare.length} ${compare.length === 1 ? "property" : "properties"}`
              }
            </div>

            {/* Compare picker */}
            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              {LISTINGS.map(l => (
                <button
                  key={l.id}
                  className={`filter-chip${compare.includes(l.id) ? " active" : ""}`}
                  onClick={() => {
                    setCompare(prev =>
                      prev.includes(l.id)
                        ? prev.filter(i => i !== l.id)
                        : prev.length < 3 ? [...prev, l.id] : prev
                    );
                  }}
                >
                  {l.emoji} {l.title.slice(0, 18)}
                </button>
              ))}
            </div>
          </div>

          {compareListings.length < 2 ? (
            <div className="empty-state">
              <div className="empty-icon">⇄</div>
              <div className="empty-title">Select at least 2 properties above</div>
              <div className="empty-sub">You can compare up to 3 at a time</div>
            </div>
          ) : (
            <div className="compare-table">
              <div className="compare-grid" style={{
                gridTemplateColumns: `180px repeat(${compareListings.length}, 1fr)`
              }}>
                {/* Header row */}
                <div className="compare-row header" style={{
                  gridColumn: "1 / -1",
                  display: "grid",
                  gridTemplateColumns: `180px repeat(${compareListings.length}, 1fr)`
                }}>
                  <div className="compare-cell header-cell">Metric</div>
                  {compareListings.map(l => (
                    <div key={l.id} className="compare-cell header-cell">{l.emoji} {l.title}</div>
                  ))}
                </div>

                {/* Data rows */}
                {COMPARE_FIELDS.map(({ label, render }) => (
                  <div key={label} className="compare-row" style={{
                    gridColumn: "1 / -1",
                    display: "grid",
                    gridTemplateColumns: `180px repeat(${compareListings.length}, 1fr)`
                  }}>
                    <div className="compare-cell label">{label}</div>
                    {compareListings.map(l => (
                      <div key={l.id} className="compare-cell value">{render(l)}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {selected && (
        <PropertyModal
          listing={selected}
          onClose={() => setSelected(null)}
          saved={saved.has(selected.id)}
          onSave={toggleSave}
        />
      )}

      <footer className="footer">
        RealNov8 Group — Smart Real Estate, Sustainable Cities &nbsp;·&nbsp; Project 2 of 5
      </footer>
    </div>
  );
}
