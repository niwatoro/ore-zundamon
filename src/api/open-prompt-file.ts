import { readFileSync } from "original-fs";

export const openPromptFile: () => Promise<string> = async () => {
  const prompt = readFileSync(__dirname + "/../../src/prompts/zundamon.txt", "utf-8");
  return prompt;
};
