import { ConnectButton } from "web3uikit";

export default function Landingpage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col items-center">
          <h1 className="text-5xl font-bold">DeSlack</h1>
          <p className="py-6">
            A decentralized, permissionless decentralized slack-like messaging
            platform, with audio and video conferencing using huddle01 SDK.
          </p>
          <ConnectButton moralisAuth={false} />
        </div>
      </div>
    </div>
  );
}
