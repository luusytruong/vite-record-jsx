export const formatDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = newDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedTime} - ${formattedDate}`;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
