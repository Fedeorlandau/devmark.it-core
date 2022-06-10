<script>
  import Button from "@ui/Button.svelte";
  import Board from "@ui/Board/Board.svelte";

  let columnsData = [
    {
      id: "c1",
      name: "Open",
      columnColor: "text-red-400",
      borderColor: "border-red-400",
      items: [],
    },
    {
      id: "c2",
      name: "In progress",
      columnColor: "text-pink-500",
      borderColor: "border-pink-500",
      items: [],
    },
    {
      id: "c3",
      name: "Done",
      columnColor: "text-purple-500",
      borderColor: "border-purple-500",
      items: [],
    },
  ];
  function handleBoardUpdated(newColumnsData) {
    // if you wanted to update a database or a server, this is where you would do it
    columnsData = newColumnsData;
  }

  let share = () => {
    navigator.clipboard.writeText(window.location.href);
  };
</script>

<div class="flex items-center mb-4">
  <h1 class="text-md text-white font-bold leading-tight inline-block">
    Welcome to your board.
  </h1>
  <Button
    _class="p-0 leading-none ml-1 inline-block underline decoration-purple-500 decoration-2 text-white font-bold underline-offset-2"
    onclick={() => share()}
    tooltip="Copied">Share</Button
  >
</div>
<Board columns={columnsData} onFinalUpdate={handleBoardUpdated} />
