export const adaptParamsToURLEncoded = (params: Record<string, any>): URLSearchParams => {
  const URLSearchParamsInstance = new URLSearchParams();
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (value) {
        URLSearchParamsInstance.append(key, value);
      }
    }
  }
  return URLSearchParamsInstance;
};
