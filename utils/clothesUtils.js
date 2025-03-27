export function createNewClothingItem({
  name,
  category,
  condition,
  notes,
  lastUsed,
  tags
}) {
  return {
    name,
    category: { main: category },
    condition,
    notes,
    lastUsed: lastUsed ? new Date(lastUsed) : null,
    tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    clearedAt: null
  };
}
