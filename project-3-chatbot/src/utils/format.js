export const fmt = (n) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

export const fmtShort = (n) => {
  if (n >= 1_000_000_000) return `₦${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(0)}M`;
  return fmt(n);
};

export const pct = (n) => `${n}%`;

export const sdgLabel = (key) => ({
  sdg6: "SDG 6 — Clean Water",
  sdg7: "SDG 7 — Clean Energy",
  sdg11: "SDG 11 — Sustainable Cities",
  sdg13: "SDG 13 — Climate Action",
}[key] || key);

export const scoreColor = (score) => {
  if (score >= 85) return "var(--green)";
  if (score >= 65) return "var(--amber)";
  return "var(--red)";
};