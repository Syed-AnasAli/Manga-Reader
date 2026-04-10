const Warning = (props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="border-2 w-fit font-semibold border-red-700 text-center gap-2 flex flex-col items-center justify-center m-10 p-2 rounded-lg bg-red-400">
        <p>
          Certain manga covers may include sensitive or inappropriate content.
          Please click the button below if you would like to proceed.
        </p>
        <div>
          <button
            className="bg-amber-600 px-1.5 py-1.5 rounded-md border-2 border-black text-xs font-semibold active:scale-95 cursor-pointer"
            onClick={props.warning}
          >
            Toggle Manga Covers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warning;
