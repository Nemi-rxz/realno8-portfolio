export const filterListings = (listings, filters) => {
  let result = [...listings];

  if (filters.city) {
    result = result.filter((listing) => listing.city.toLowerCase() === filters.city.toLowerCase());
  }

  if (filters.type) {
    result = result.filter((listing) => listing.type.toLowerCase() === filters.type.toLowerCase());
  }

  if (filters.status) {
    result = result.filter((listing) => listing.status === filters.status);
  }

  if (filters.bedrooms) {
    result = result.filter((listing) => listing.bedrooms === filters.bedrooms);
  }

  if (filters.maxPrice) {
    result = result.filter((listing) => listing.price <= filters.maxPrice);
  }

  if (filters.sustainableOnly) {
    result = result.filter((listing) => listing.sustainabilityScore >= 80);
  }

  if (filters.sortBy === "roi_desc") {
    result.sort((a, b) => b.roi - a.roi);
  } else if (filters.sortBy === "sustainability_desc") {
    result.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);
  } else if (filters.sortBy === "price_asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === "price_desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
};
