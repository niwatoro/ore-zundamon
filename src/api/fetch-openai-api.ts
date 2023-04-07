import { Configuration, OpenAIApi } from "openai";
import zundamonSystemPrompt from "../prompts/zundamon.txt";

export interface OpenAiReponse {
  text: string;
  emotion: "joyful" | "fun" | "sad" | "angry";
}
export const fetchOpenAiApi: (prompt: string) => Promise<OpenAiReponse> = async (prompt) => {
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
  const rawText = response.data.choices[0].message.content;
  const emotion = rawText.match(/current_emotion: (\w+)/)?.[1] as "joyful" | "fun" | "sad" | "angry";
  const text = rawText.replace(`current_emotion: ${emotion}`, "");
  return { text: text, emotion: emotion };
};
