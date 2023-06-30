import React from "react";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-16 h-16 border-4 border-red-400 border-solid rounded-full animate-spin"
      />
      <p className="text-black dark:text-white text-xl mt-4">Connecting to the room</p>
    </div>
  );
}

export default Loader;
