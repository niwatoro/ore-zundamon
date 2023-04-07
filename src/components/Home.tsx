import React, { FC, useEffect, useState } from "react";
import { generateVoicevoxVoice } from "../api/generate-voicevox-voice";
import { recognizeScreenText } from "../api/recognize-screen-text";
import normal from "../images/normal.png";
import send from "../images/send.svg";

export const Home: FC = () => {
  const [inputText, setInputText] = useState("");
  const [zundamonText, setZundamonText] = useState("ぼくはずんだもんなのだ。");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSend = async () => {
    const response = await window.myAPI.fetchOpenAiApi(inputText);
    setZundamonText(response);

    const sentences = response.split(/、|。|！|？|！？|？！/);
    for (const sentence of sentences) {
      await generateVoicevoxVoice(sentence);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setInputText("");
  };

  useEffect(() => {
    recognizeScreenText().then((text) => {
      console.log(text);
    });
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden absolute">
      <div className="flex justify-end w-full h-full absolute -z-10">
        <img className="object-contain" src={normal} alt="zundamon" />
      </div>
      <div className="h-full flex flex-col justify-end w-full">
        <div id="zundamon-text" className="flex items-center h-12 bg-white rounded-md m-3 mb-2 p-2 border-2 border-gray-300">
          {zundamonText}
        </div>
        <div className="flex items-center h-12 bg-white rounded-md m-3 mt-0 p-2 border-2 border-gray-300 shadow-md">
          <input id="user-input" onChange={handleInput} value={inputText} className="w-full h-8 outline-none" />
          <button id="send-button" onClick={handleSend}>
            <img src={send} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
