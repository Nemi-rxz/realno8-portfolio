const KNOWN_CITIES = ["Lagos", "Abuja", "Port Harcourt", "Enugu"];
const KNOWN_TYPES = [
  "apartment",
  "villa",
  "terrace",
  "duplex",
  "commercial",
  "penthouse",
  "bungalow",
  "office",
];

export const defaultFilters = {
  city: null,
  maxPrice: null,
  bedrooms: null,
  type: null,
  status: null,
  sortBy: null,
  sustainableOnly: false,
};

const shouldResetFilters = (text) =>
  /\b(clear|reset|show all|all listings|all properties|everything|anywhere|across nigeria|nationwide)\b/i.test(
    text
  );

const parseAmount = (value, unit = "") => {
  const amount = Number.parseFloat(value.replace(/,/g, ""));
  if (Number.isNaN(amount)) {
    return null;
  }

  if (/b/i.test(unit)) {
    return amount * 1_000_000_000;
  }

  if (/m/i.test(unit)) {
    return amount * 1_000_000;
  }

  if (/k/i.test(unit)) {
    return amount * 1_000;
  }

  return amount;
};

const detectMaxPrice = (text) => {
  const budgetMatch = text.match(
    /\b(?:under|below|less than|max(?:imum)?|budget(?: of)?|within)\s*(?:ngn|naira|₦)?\s*([\d,.]+)\s*([kmb])?\b/i
  );

  if (budgetMatch) {
    return parseAmount(budgetMatch[1], budgetMatch[2]);
  }

  const shorthandMatch = text.match(/(?:ngn|naira|₦)\s*([\d,.]+)\s*([kmb])\b/i);
  if (shorthandMatch) {
    return parseAmount(shorthandMatch[1], shorthandMatch[2]);
  }

  return null;
};

const detectBedrooms = (text) => {
  const exactMatch = text.match(/\b(\d+)\s*[- ]?(?:bed|beds|bedroom|bedrooms)\b/i);
  if (exactMatch) {
    return Number.parseInt(exactMatch[1], 10);
  }

  return null;
};

const detectCity = (text) =>
  KNOWN_CITIES.find((city) => text.toLowerCase().includes(city.toLowerCase())) ?? null;

const detectType = (text) => {
  const normalized = text.toLowerCase();
  const found = KNOWN_TYPES.find((type) => normalized.includes(type));
  if (!found) {
    return null;
  }

  if (found === "office") {
    return "Commercial";
  }

  return found.charAt(0).toUpperCase() + found.slice(1);
};

const detectStatus = (text) => {
  if (/\bfor rent|rent|rental\b/i.test(text)) {
    return "For Rent";
  }

  if (/\bfor sale|buy|sale\b/i.test(text)) {
    return "For Sale";
  }

  return null;
};

const detectSort = (text) => {
  if (/\b(best|highest|top).*(roi)|roi.*(best|highest|top)\b/i.test(text)) {
    return "roi_desc";
  }

  if (/\b(best|highest|top).*(sustainability|sustainable)|sustainability.*(best|highest|top)\b/i.test(text)) {
    return "sustainability_desc";
  }

  if (/\bcheapest|lowest price|lowest-cost|affordable\b/i.test(text)) {
    return "price_asc";
  }

  if (/\bmost expensive|highest price|luxury\b/i.test(text)) {
    return "price_desc";
  }

  return null;
};

export const parseChatFilters = (text) => {
  const reset = shouldResetFilters(text);

  return {
    reset,
    filters: {
      city: detectCity(text),
      maxPrice: detectMaxPrice(text),
      bedrooms: detectBedrooms(text),
      type: detectType(text),
      status: detectStatus(text),
      sortBy: detectSort(text),
      sustainableOnly: /\b(sustainable|sustainability|eco|green|sdg)\b/i.test(text)
        ? true
        : null,
    },
  };
};

export const mergeFilters = (previous, next, reset = false) => {
  if (reset) {
    return { ...defaultFilters };
  }

  const base =
    previous && typeof previous === "object" ? previous : defaultFilters;
  const merged = { ...base };

  Object.entries(next).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      merged[key] = value;
    }
  });

  return merged;
};

export const summarizeFilters = (filters) => {
  const parts = [];

  if (filters.city) parts.push(filters.city);
  if (filters.type) parts.push(filters.type);
  if (filters.bedrooms) parts.push(`${filters.bedrooms} bed`);
  if (filters.maxPrice) parts.push(`under NGN ${Math.round(filters.maxPrice / 1_000_000)}M`);
  if (filters.status) parts.push(filters.status);
  if (filters.sustainableOnly) parts.push("sustainable");
  if (filters.sortBy === "roi_desc") parts.push("sorted by ROI");
  if (filters.sortBy === "sustainability_desc") parts.push("sorted by sustainability");
  if (filters.sortBy === "price_asc") parts.push("sorted by lowest price");
  if (filters.sortBy === "price_desc") parts.push("sorted by highest price");

  return parts;
};
