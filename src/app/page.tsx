'use client';
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { setProvider } from "@coral-xyz/anchor";
import { AnchorProvider } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { DEVNET } from "@/extras/lib/constants";

const sampleRaffles = [
  {
    title: "Falling Cherry Blossoms",
    category: "Art Therapy",
    image: "/avatar1.png",
    status: "Highest Bid",
    price: "25.50 SOL",
    avatars: ["/avatar1.png", "/avatar2.webp"],
  },
  {
    title: "The Gate of Madness",
    category: "Motion Design",
    image: "/avatar3.webp",
    status: "Fix Price",
    price: "0.005 SOL",
    avatars: ["/avatar1.png"],
  },
  {
    title: "Longneck Guro Classic",
    category: "Machine Learning",
    image: "/avatar2.webp",
    status: "Fix Price",
    price: "10.250 SOL",
    avatars: ["/avatar2.webp", "/avatar3.webp"],
  },
  {
    title: "Psychedelic Cell Party",
    category: "3d Architecture",
    image: "/avatar3.webp",
    status: "Highest Bid",
    price: "50.050 SOL",
    avatars: ["/avatar1.png", "/avatar2.webp", "/avatar3.webp"],
  },
  // Add more sample raffles as needed
];

export default function Home() {
  const { wallet, connected, publicKey } = useWallet();
  const connection = new Connection(DEVNET as string);
  const anchorWallet = useAnchorWallet();
  useEffect(() => {
    if (connected) {
      console.log("connected");
    }
    const anchorProvider = anchorWallet && new AnchorProvider(connection, anchorWallet, {});
    if (anchorProvider) {
      setProvider(anchorProvider);
    }
  }, [anchorWallet, connection])




  return (

    <main className="flex-1 p-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Active Raffles</h2>
        <div className="flex gap-4">
          <a href="/create-raffle" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg cursor-pointer font-semibold shadow transition">Create Raffle</a>
          <a onClick={() => { }} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg cursor-pointer font-semibold shadow transition">Mint Random NFT</a>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {sampleRaffles.map((raffle, idx) => (
          <div key={idx} className="bg-[#23263a] rounded-xl shadow-lg overflow-hidden flex flex-col">
            <img src={raffle.image} alt={raffle.title} className="h-40 w-full object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {raffle.avatars.map((avatar, i) => (
                    <img key={i} src={avatar} alt="avatar" className="w-6 h-6 rounded-full border-2 border-[#202235] -ml-2 first:ml-0" />
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{raffle.title}</h3>
                <p className="text-xs text-gray-400 mb-2">{raffle.category}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="mt-3 w-full">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>125/200 entries</span>
                  </div>
                  <div className="w-full h-2 bg-[#2d314b] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: '62.5%' }} // 125/200 = 62.5%
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center py-2 justify-center">
                <a href={`/mint/${""}`} className="w-full shadow-lg text-center bg-green-500 text-white p-1 rounded-lg mb-2">Join Raffle</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>

  );
}
