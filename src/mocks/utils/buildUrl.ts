export const buildUrl = (endPoint: string): string => {
  const baseUrl = import.meta.env.VITE_API_PATH || 'http://localhost:3000';
  if (baseUrl.endsWith('/')) {
    return `${baseUrl.substring(0, baseUrl.length - 1)}${endPoint}`;
  }
  return `${baseUrl}${endPoint}`;
};
