export function isPageValid(page, min, max) {
  if (page === 1) return true;
  if (isNaN(page)) return false;
  return page < min || page > Math.ceil(max / 10);
}
