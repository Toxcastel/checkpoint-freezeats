export const textLength = (str) => {
  const shortPhrase = str.slice(0, 25);
  if(str.length > 25) return shortPhrase + "...";
  return shortPhrase
};
