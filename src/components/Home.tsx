import React, { FC, useState } from "react";
import normal from "../images/normal.png";
import send from "../images/send.svg";

export const Home: FC = () => {
  const [text, setText] = useState("ぼくはずんだもんなのだ。");

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="flex justify-end w-full h-full absolute -z-10">
        <img className="object-contain" src={normal} alt="zundamon" />
      </div>
      <div className="h-full flex flex-col justify-end w-full">
        <div className="flex items-center h-12 bg-white rounded-md m-3 mb-2 p-2 border-2 border-gray-300">{text}</div>
        <div className="flex items-center h-12 bg-white rounded-md m-3 mt-0 p-2 border-2 border-gray-300 shadow-md">
          <input className="w-full h-8 outline-none" />
          <img src={send} />
        </div>
      </div>
    </div>
  );
};

export default Home;
