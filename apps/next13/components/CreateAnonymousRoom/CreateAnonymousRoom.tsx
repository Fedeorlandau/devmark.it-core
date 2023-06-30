"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function getSixDigitRandom() {
  return Math.random().toString().substring(2, 8);
}

function CreateAnonymousRoom() {
  const [room, setRoom] = useState<string>();

  useEffect(() => {
    setRoom(getSixDigitRandom());
  }, []);

  return (
    <p>
      If you don't care about people's name{" "}
      <Link
        href={`/anon/${room}`}
        className="underline decoration-pink-500 decoration-2 font-bold underline-offset-2"
        type="button"
      >
        Create an anonymous room
      </Link>
    </p>
  );
}

export default CreateAnonymousRoom;
