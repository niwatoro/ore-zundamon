import { Configuration, OpenAIApi } from "openai";
import zundamonSystemPrompt from "../prompts/zundamon.txt";

export const fetchOpenAiApi: (prompt: string) => Promise<string> = async (prompt) => {
  const configuration = new Configuration({
    organization: "org-m9iIXGQgowXEEqsF6f8fH9pZ",
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: zundamonSystemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  return response.data.choices[0].message.content;
};
