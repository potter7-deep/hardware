// Format price to Kenyan Shillings
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

// Format relative time
export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now - then) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return formatDate(date);
};

// Validate Kenyan phone number
export const validateKenyanPhone = (phone) => {
  const kenyanPhoneRegex = /^(\+254|254|0)?[1-9]\d{8}$/;
  return kenyanPhoneRegex.test(phone.replace(/\s/g, ''));
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Get category icon (emoji for simplicity)
export const getCategoryIcon = (category) => {
  const icons = {
    'Building Materials': '🏗️',
    'Power Tools': '🔧',
    'Hand Tools': '🔨',
    'Electrical': '💡',
    'Plumbing': '🚿',
    'Paint': '🎨'
  };
  return icons[category] || '📦';
};

