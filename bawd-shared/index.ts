export const handleize = (str: string) => {
  return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
};

export const categories: string[] = ["Arts & Entertainment", "Innovation & Technology", "Life", "Society", "Work & Industry"];

export const validateBoardName = (name: string) => {
  return /^[-\w\s]+$/.test(name);
};
