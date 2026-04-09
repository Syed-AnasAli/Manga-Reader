import { useEffect } from "react";
import { useLocation, Link } from "react-router";
import axios from "axios";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Chapter = () => {
  let { state } = useLocation();
  const [chData, setChData] = useState([]);

  const getChData = async () => {
    let res = await axios.get(
      `https://api.mangadex.org/at-home/server/${state.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(res);
    let chapters = res.data.chapter.data.map((ch) => {
      let chImg = `https://uploads.mangadex.org/data/${res.data.chapter.hash}/${ch}`;

      return {
        chImg: chImg,
      };
    });
    setChData(chapters);
  };

  useEffect(() => {
    getChData();
  }, []);
  console.log(state.id);

  return (
    <div className="flex justify-center items-center flex-col gap-10 p-10 text-xl font-semibold">
      <div className="self-start flex-1">
        {"Home / Manga /" + state.title + " / Chapter " + state.num}
      </div>

      <div className="flex gap-10 ">
        <Link className="text-md flex justify-center items-center border-2 border-black bg-amber-500 font-bold px-3 py-2 rounded-md">
          <ArrowLeft strokeWidth={2.5} />
          Prev
        </Link>
        <Link className="text-md flex justify-center items-center border-2 border-black bg-amber-500 font-bold px-3 py-2 rounded-md">
          Next
          <ArrowRight strokeWidth={2.5} />
        </Link>
      </div>

      <div>
        {chData.map((ch, idx) => {
          return (
            <div className="w-[40vw]" key={idx}>
              <img src={ch.chImg} alt="" />
            </div>
          );
        })}
      </div>

      <div className="flex gap-10">
        <Link className="text-md flex justify-center items-center border-2 border-black bg-amber-500 font-bold px-3 py-2 rounded-md">
          <ArrowLeft strokeWidth={2.5} />
          Prev
        </Link>
        <Link className="text-md flex justify-center items-center border-2 border-black bg-amber-500 font-bold px-3 py-2 rounded-md">
          Next
          <ArrowRight strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
};

export default Chapter;
