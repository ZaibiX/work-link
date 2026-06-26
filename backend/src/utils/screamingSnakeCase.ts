export function toScreamingSnake(text: string): string {
  if (!text) return "";
  return text
    .trim()                  // Remove spaces from the beginning and end
    .replace(/\s+/g, "_")    // Replace one or more spaces with a single underscore
    .toUpperCase();          // Turn everything uppercase
}

export function fromScreamingSnake(text: string): string {
  if (!text) return "";
  
  const lowerCased = text
    .trim()
    .replace(/_/g, " ")      // Replace all underscores with spaces
    .toLowerCase();          // Turn everything lowercase ("this is a rabbit")
    
  // Capitalize the first letter for normal sentence formatting
  return lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
}