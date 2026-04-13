import { ArrowLeft, ArrowRight } from "lucide-react";

const ChapterButtons = (props) => {
  return (
    <div className="flex gap-10">
      <button
        onClick={() => props.nav(1)}
        disabled={props.idx >= props.total - 1}
        className="lg:text-md text-[15px] flex justify-center items-center border-2 border-black bg-amber-600 font-semibold lg:font-bold px-3 py-2 rounded-md active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft strokeWidth={2.5} />
        Prev
      </button>
      <button
        onClick={() => props.nav(-1)}
        disabled={props.idx <= 0}
        className="lg:text-md text-[15px] flex justify-center items-center border-2 border-black bg-amber-600 font-semibold lg:font-bold px-3 py-2 rounded-md active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ArrowRight strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default ChapterButtons;
