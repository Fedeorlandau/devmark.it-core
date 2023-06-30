import CreateAnonymousRoom from "@/components/CreateAnonymousRoom";
import CreateRoom from "@/components/CreateRoom";

function Homepage() {
  
  return (
    <div>
      <div className="flex flex-col w-full py-6 px-6 md:px-0 text-black dark:text-white">
        <h1 className="my-4 text-3xl md:text-5xl text-black dark:text-white font-bold leading-tight">
          Start estimating your next feature.
        </h1>
        <p className="leading-normal text-base md:text-xl mb-8 ">
          Create a room and share the link with your team.
        </p>

        <div className=" w-full rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <CreateRoom />
          </div>
        </div>

        <div className="mt-2">
          <CreateAnonymousRoom />
        </div>

        <div className="hidden my-4 md:my-8 bg-gradient-to-r font-bold from-red-400 via-pink-500 to-purple-500 h-0.5" />
        <div className="mt-2">
          <h2 className="my-4 text-xl text-black dark:text-white font-bold leading-tight ">
            How to support the project?
          </h2>
          <p className="leading-normal text-base mb-8 text-black dark:text-white">
            Simply{" "}
            <a
              href="https://www.buymeacoffee.com/fedeorlandau"
              target="_blank"
              className="underline decoration-purple-500 decoration-2 font-bold underline-offset-2"
            >
              buy me a coffee
            </a>
            .
          </p>
        </div>
      </div>

      <div className="w-full xl:w-2/5 p-12 overflow-hidden" />
    </div>
  );
}

export default Homepage;
