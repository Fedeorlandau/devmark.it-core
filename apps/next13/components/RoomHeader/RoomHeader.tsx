import React from "react";
import Button from "@/components/ui/Button";

interface RoomHeaderProps {
  name?: string;
}

function RoomHeader({ name }: RoomHeaderProps) {

    const share = () => {
        navigator.clipboard.writeText(window.location.href);
      };

      
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <h1 className="text-md text-black dark:text-white leading-tight inline-block">
          Welcome {name} to your room.
        </h1>
        <Button
          className="p-0 leading-none mt-2 md:mt-0 md:ml-1 inline-block underline decoration-purple-500 decoration-2 text-black dark:text-white font-bold underline-offset-2"
          onClick={() => share()}
        >
          Copy url to clipboard
        </Button>
      </div>
      <h2 className="my-4 text-xl md:text-3xl text-black dark:text-white font-bold leading-tight">
        Select your estimate
      </h2>
    </>
  );
}

export default RoomHeader;
