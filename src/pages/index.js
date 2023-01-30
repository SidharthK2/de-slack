import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState } from "react";
import Homepage from "../components/Homepage";
import Landingpage from "../components/Landingpage";
import { useMoralis } from "react-moralis";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isWeb3Enabled } = useMoralis();

  return (
    <>
      <main>
        <div className="App">
          {!isWeb3Enabled && <Landingpage />}
          {isWeb3Enabled && <Homepage />}
        </div>
      </main>
    </>
  );
}
