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
