export const getClientHostName = () => {
  const localhost = `http://localhost:3000`;
  if (typeof window === "undefined") return localhost;
  if (process.env.NODE_ENV === "development") return localhost;
  return window?.location.hostname;
};
