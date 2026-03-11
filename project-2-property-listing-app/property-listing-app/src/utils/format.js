// ─── Formatters ────────────────────────────────────────────
export const fmt = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency", currency: "NGN", maximumFractionDigits: 0,
  }).format(n);

export const fmtShort = (n) => {
  if (n >= 1_000_000_000) return `₦${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000)     return `₦${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)         return `₦${(n / 1_000).toFixed(0)}K`;
  return `₦${n}`;
};

export const pct = (n) => `${n.toFixed(1)}%`;

// ─── Sustainability helpers ─────────────────────────────────
export const susColor = (score) => {
  if (score >= 75) return "#22c55e";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
};

export const susClass = (score) => {
  if (score >= 75) return "sus-high";
  if (score >= 50) return "sus-mid";
  return "sus-low";
};

export const susLabel = (score) => {
  if (score >= 75) return "High";
  if (score >= 50) return "Mid";
  return "Low";
};

// ─── ROI quick-calc ─────────────────────────────────────────
export const calcROI = (price, monthlyRent) => {
  const annualRent = monthlyRent * 12;
  const annualExpenses = annualRent * 0.15; // 15% expense estimate
  const net = annualRent - annualExpenses;
  return (net / price) * 100;
};
