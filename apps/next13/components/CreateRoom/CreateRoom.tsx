"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function getSixDigitRandom() {
  return Math.random().toString().substring(2, 8);
}

export default function CreateRoom() {
  const [room, setRoom] = useState<string>();

  useEffect(() => {
    setRoom(getSixDigitRandom());
  }, []);

  return (
    <Link
      href={`/${room}`}
      className="text-lg bg-gradient-to-r from-red-400 via-pink-500 to-purple-500  hover:via-pink-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded focus:ring shadow-md"
      type="button"
    >
      Create a room
    </Link>
  );
}
