import { useState } from "react";
import { useMoralis } from "react-moralis";

import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerVideoAudioElem from "./PeerVideoAudioElem";
import MeVideoElem from "./MeVideoElem";

function HuddleElem() {
  const huddleClient = getHuddleClient("6a4ed64487d905f120f725499c5bbd58361aba66062826f5e88add3c2755f5c7");
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
  const roomState = useHuddleStore((state) => state.roomState);
  const [VideoOrAudio, setToggle] = useState();
  const { account } = useMoralis();


  const handleJoin = async (roomid, address, VidAud_param) => {
    try {
      await huddleClient.join(roomid, {
        address: address,
        wallet: "metamask",
        ens: "axit.eth",
      });

      setToggle(Boolean(VidAud_param));
      console.log(`LOg data ${VideoOrAudio} `, VidAud_param);
      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };

  const handleLeave = async () => {
    try {

      await huddleClient.close();
      console.log("left");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <HuddleClientProvider value={huddleClient}>
      <div>
          <div className="flex justify-end">
            <button className="btn" onClick={handleJoin.bind(this, "room1", account.toString(), 0)}>
              <MicIcon />
            </button>
            <button className="btn" onClick={handleJoin.bind(this, "room1", account.toString(), 1)}>
              <VideocamIcon />
            </button>
            <button className="btn" onClick={handleLeave}>
              <CancelPresentationIcon />
            </button>
          </div>
          <MeVideoElem turnVideoOn={VideoOrAudio}/>
          {lobbyPeers[0] && <h2>Lobby Peers</h2>}
          <div>
            {lobbyPeers.map((peer) => (
              <div>{peer.peerId}</div>
            ))}
          </div>

          {peersKeys[0] && <h2>Peers</h2>}

          <div className="peers-grid">
            {peersKeys.map((key) => (
              <PeerVideoAudioElem key={`peerId-${key}`} peerIdAtIndex={key} turnVideoOn={VideoOrAudio}/>
            ))}
          </div>
        </div>
    </HuddleClientProvider>
  );
}

export default HuddleElem;
