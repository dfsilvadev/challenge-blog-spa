export const getColorFromCategory = (str: string): string => {
  switch (str.toLowerCase()) {
    case 'portuguese':
      return 'bg-yellow-500';
    case 'mathematics':
      return 'bg-blue-500';
    case 'history':
      return 'bg-red-400';
    case 'geography':
      return 'bg-green-500';
    case 'science':
      return 'bg-purple-500';
    case 'art':
      return 'bg-orange-500';
    case 'physical education':
      return 'bg-pink-500';
    default:
      return 'bg-gray-500';
  }
};

export const getGradientFromCategory = (str: string): string => {
  switch (str.toLowerCase()) {
    case 'portuguese':
      return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    case 'mathematics':
      return 'bg-gradient-to-r from-blue-500 to-blue-700';
    case 'history':
      return 'bg-gradient-to-r from-red-400 to-red-600';
    case 'geography':
      return 'bg-gradient-to-r from-green-500 to-emerald-600';
    case 'science':
      return 'bg-gradient-to-r from-purple-500 to-purple-700';
    case 'art':
      return 'bg-gradient-to-r from-orange-500 to-amber-600';
    case 'physical education':
      return 'bg-gradient-to-r from-pink-500 to-rose-600';
    default:
      return 'bg-gradient-to-r from-gray-500 to-gray-700';
  }
};
