export const handleize = (str: string) => {
  return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
};
