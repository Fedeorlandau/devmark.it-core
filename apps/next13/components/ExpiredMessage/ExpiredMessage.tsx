
function ExpiredMessage({ isExpired }: { isExpired: boolean }) {
  if (!isExpired) return <div></div>;

  return (
    <div className="flex mb-4">
      <p className="px-2 py-1 border bg-red-800 border-red-400 rounded-md text-white">
        Room expired. Please reload the page.
      </p>
    </div>
  );
}

export default ExpiredMessage;
