import { ArrowLeft, ArrowRight } from "lucide-react";

const ChapterButtons = (props) => {
  return (
    <div className="flex gap-10 ">
      <div
        onClick={() => {
          props.nav(-1);
        }}
        className="lg:text-md text-[15px] flex justify-center items-center border-2 border-black bg-amber-600 font-semibold lg:font-bold px-3 py-2 rounded-md active:scale-95 cursor-pointer"
      >
        <ArrowLeft strokeWidth={2.5} />
        Prev
      </div>
      <div
        onClick={() => {
          props.nav(1);
        }}
        className="lg:text-md text-[15px] flex justify-center items-center border-2 border-black bg-amber-600 font-semibold lg:font-bold px-3 py-2 rounded-md active:scale-95 cursor-pointer"
      >
        Next
        <ArrowRight strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default ChapterButtons;
