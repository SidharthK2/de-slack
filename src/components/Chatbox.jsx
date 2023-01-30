import React from "react";
import ChatBubble from "./ChatBubble";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const Chatbox = ({ msg, setMsg, msgList }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements.message.value);
    setMsg(e.target.elements.message.value);
    e.target.elements.message.value = "";
  };
  const chatEl = msgList.map((el) => {
    return <ChatBubble sender={el.sender} msg={el.message} />;
  });

  return (
    <div className="outline-dashed p-2 flex flex-col w-screen h-screen items-stretch">
      <div className="chats flex-grow">{chatEl}</div>
      <div className="textarea flex items-center gap-2">
        <form onSubmit={handleSubmit}>
          <div>
            <input id="message" type="text" />
          </div>
          <button type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
