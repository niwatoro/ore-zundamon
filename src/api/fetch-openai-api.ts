export const fetchOpenAiApi: (prompt: string) => Promise<string> = async (prompt) => {
  const response = await fetch("https://www.niwatoro.com/", {
    method: "GET",
  });
  return response.text();
};
