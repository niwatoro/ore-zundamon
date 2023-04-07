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
      {
        role: "assistant",
        content: '{"current_emotion":"',
      },
    ],
    top_p: 0.9,
  });
  try {
    const resJson = JSON.parse('{"current_emotion":"' + response.data.choices[0].message.content);
    console.log(resJson);
    return { emotion: resJson.current_emotion, text: resJson.zundamon_reply.replace(/「|」/g, "") };
  } catch (e) {
    return { text: response.data.choices[0].message.content, emotion: "fun" };
  }
};
