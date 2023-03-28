import React, { FC, useState } from "react";
import normal from "../images/normal.png";
import send from "../images/send.svg";

export const Home: FC = () => {
  const [inputText, setInputText] = useState("");
  const [text, setText] = useState("ぼくはずんだもんなのだ。");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSend = async () => {
    const response = await fetch(`http://localhost:50021/audio_query?text=${inputText}&speaker=1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setText("Finished!");
    setInputText("");
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="flex justify-end w-full h-full absolute -z-10">
        <img className="object-contain" src={normal} alt="zundamon" />
      </div>
      <div className="h-full flex flex-col justify-end w-full">
        <div className="flex items-center h-12 bg-white rounded-md m-3 mb-2 p-2 border-2 border-gray-300">{text}</div>
        <div className="flex items-center h-12 bg-white rounded-md m-3 mt-0 p-2 border-2 border-gray-300 shadow-md">
          <input onChange={handleInput} value={inputText} className="w-full h-8 outline-none" />
          <button onClick={handleSend}>
            <img src={send} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
