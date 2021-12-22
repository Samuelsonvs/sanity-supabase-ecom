export const dateResolver = (date: number) => {
  const createdDate = new Date(date).toLocaleString("en-EN", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return createdDate;
};
