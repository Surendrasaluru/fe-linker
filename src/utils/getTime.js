const getTime = (dateString) => {
  if (!dateString) return "Joined recently";

  // CLEANING: Remove any literal quotes that might be wrapping the string
  const cleanDate =
    typeof dateString === "string"
      ? dateString.replace(/['"]+/g, "")
      : dateString;

  const date = new Date(cleanDate);

  if (isNaN(date.getTime())) {
    return "New Member";
  }

  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) return "just now";

  // 2. If less than 24 hours ago (Show hours)
  if (diffInHours < 24) return `${diffInHours}h ago`;

  // 3. If between 24 and 48 hours (Show yesterday)
  if (diffInHours < 48) return "Yesterday";

  // 4. Otherwise show days
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
};
export default getTime;
