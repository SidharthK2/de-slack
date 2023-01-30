import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Chatbox from "./Chatbox";
import HuddleElem from "./HuddleElem";

import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import { abi, contractAddress } from "../constants/constants";

const Homepage = () => {
  const { account, isWeb3Enabled, enableWeb3 } = useMoralis();
  const [msg, setMsg] = useState("");
  const [roomList, setRoomList] = useState();
  const [sender, setSender] = useState();
  const [msgList, setMsgList] = useState([]);

  const { runContractFunction: makeNewRoom } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "makeNewRoom",
    params: { _roomName: "room1" },
  });

  const { runContractFunction: getRooms } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getRooms",
    params: {},
  });
  const { runContractFunction: sendMessage } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "sendMessage",
    params: {
      _content: msg,
      _roomName: "room1",
    },
  });
  const { runContractFunction: getMessages } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getMessages",
    params: {
      _roomName: "room1",
    },
  });
  useEffect(() => {
    console.log("from ue", msg);
    (async () => {
      await sendMessage();
    })();
  }, [msg]);
  //   useEffect(() => {
  //     makeNewRoom();
  //   }, [account]);

  useEffect(() => {
    (async () => {
      //   let temp = await getRooms();
      setRoomList("Room1");
      //   console.log(temp);
    })();
  }, []);
  //   useEffect(() => {
  //     const onNewMessage = async () => {
  //       const provider = new ethers.providers.JsonRpcProvider();
  //       const deChat = new ethers.Contract(contractAddress, abi, provider);
  //       deChat.on("NewMessage", (m) => {
  //         console.log("hi from el", m);
  //       });

  //       onNewMessage();
  //     };
  //   }, []);
  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-goerli.g.alchemy.com/v2/WeBMkHu-23q0rYh5RLyDvZVIs0pZ7FtR"
      );
      const deChat = new ethers.Contract(contractAddress, abi, provider);
      deChat.on("NewMessage", (sender, message, timestamp, roomName) => {
        let info = {
          sender: sender,
          message: message,
          timestamp: timestamp,
          roomName: roomName,
        };
        // console.log(JSON.stringify(info));
        setMsgList((msgList) => {
          return [...msgList, { sender: sender, message: message }];
        });
      });
    })();
  }, []);
  console.log("msgList:", msgList);

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />
      <HuddleElem />
      <div className="flex outline-dashed">
        <Sidebar roomList={roomList} />
        <Chatbox msg={msg} setMsg={setMsg} msgList={msgList} />
      </div>
    </div>
  );
};

export default Homepage;
