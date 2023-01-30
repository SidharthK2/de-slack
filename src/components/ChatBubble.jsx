import React from "react";
import { useMoralis } from "react-moralis";

const ChatBubble = ({ sender, msg }) => {
  const { account } = useMoralis();
  //   function computeStyle() {
  //     let style;
  //     if (account.toString() == sender.toString()) {
  //       style = { marginLeft: 20 };
  //     }

  //   }
  console.log(account);
  if (account.toString().toUpperCase() == sender.toString().toUpperCase()) {
    return (
      <>
        <div className="chat chat-start">
          <div className="chat-header text-xs opacity-50">{`${sender.slice(
            0,
            6
          )}...`}</div>
          <div className="chat-bubble">{msg}</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="chat chat-end">
          <div className="chat-header text-xs opacity-50">{`${sender?.slice(
            0,
            6
          )}...`}</div>
          <div className="chat-bubble">{msg}</div>
        </div>
      </>
    );
  }
};

export default ChatBubble;
