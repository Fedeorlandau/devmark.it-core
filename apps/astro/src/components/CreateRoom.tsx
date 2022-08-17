function getSixDigitRandom() {
  return Math.random().toString().substring(2, 8);
}

export default function CreateRoom() {
  return (
    <a
      class="text-lg bg-gradient-to-r from-red-400 via-pink-500 to-purple-500  hover:via-pink-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded focus:ring"
      type="button"
      href={`/${getSixDigitRandom()}`}
    >
      Create a room
    </a>
  );
}
