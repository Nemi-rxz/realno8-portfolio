import { useState } from "react";
import listings from "../data/listings";
import { fmtShort, pct, scoreColor } from "../utils/format";

export default function ListingsPanel({ cityFilter }) {
  const [selected, setSelected] = useState(null);

  const filtered = cityFilter
    ? listings.filter((l) => l.city.toLowerCase() === cityFilter.toLowerCase())
    : listings;

  return (
    <div className="listings-panel">
      <div className="listings-header">
        <div>
          <div className="listings-title">Properties</div>
          <div className="listings-sub">{filtered.length} listing{filtered.length !== 1 ? "s" : ""}{cityFilter ? ` in ${cityFilter}` : " across Nigeria"}</div>
        </div>
        {cityFilter && (
          <button className="clear-filter" onClick={() => {}}>✕ {cityFilter}</button>
        )}
      </div>

      <div className="listings-grid">
        {filtered.map((l) => (
          <div key={l.id} className="listing-card" onClick={() => setSelected(l)}>
            <div className="card-image">
              <div className="card-img-placeholder">
                <span>{l.type[0]}</span>
              </div>
              <div className="card-status">{l.status}</div>
            </div>
            <div className="card-body">
              <div className="card-name">{l.name}</div>
              <div className="card-location">📍 {l.area}, {l.city}</div>
              <div className="card-price">{fmtShort(l.price)}</div>
              <div className="card-meta">
                {l.bedrooms > 0 && <span>{l.bedrooms} bed</span>}
                <span>{l.sqm} sqm</span>
                <span className="card-roi">ROI {pct(l.roi)}</span>
              </div>
              <div className="card-sus">
                <span>Sustainability</span>
                <div className="sus-bar">
                  <div className="sus-fill" style={{ width: `${l.sustainabilityScore}%`, background: scoreColor(l.sustainabilityScore) }} />
                </div>
                <span style={{ color: scoreColor(l.sustainabilityScore) }}>{l.sustainabilityScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <div className="modal-header">
              <div className="modal-title">{selected.name}</div>
              <div className="modal-location">📍 {selected.area}, {selected.city}</div>
            </div>
            <div className="modal-price">{fmtShort(selected.price)}</div>
            <div className="modal-desc">{selected.description}</div>
            <div className="modal-stats">
              <div className="stat"><div className="stat-val">{selected.roi}%</div><div className="stat-lbl">ROI</div></div>
              <div className="stat"><div className="stat-val">{selected.bedrooms || "—"}</div><div className="stat-lbl">Beds</div></div>
              <div className="stat"><div className="stat-val">{selected.bathrooms}</div><div className="stat-lbl">Baths</div></div>
              <div className="stat"><div className="stat-val">{selected.sqm}</div><div className="stat-lbl">sqm</div></div>
            </div>
            <div className="modal-section">Features</div>
            <div className="modal-features">
              {selected.features.map((f) => <span key={f} className="feature-tag">{f}</span>)}
            </div>
            <div className="modal-section">SDG Sustainability Scores</div>
            {Object.entries(selected.sdg).map(([key, val]) => (
              <div key={key} className="sdg-row">
                <span className="sdg-label">{{ sdg6: "SDG 6 · Clean Water", sdg7: "SDG 7 · Clean Energy", sdg11: "SDG 11 · Sustainable Cities", sdg13: "SDG 13 · Climate Action" }[key]}</span>
                <div className="sdg-bar"><div className="sdg-fill" style={{ width: `${val}%`, background: scoreColor(val) }} /></div>
                <span className="sdg-val" style={{ color: scoreColor(val) }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}