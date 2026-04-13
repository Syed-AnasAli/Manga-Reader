import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";
import ChapterButtons from "../components/ChapterButtons";

const Chapter = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const [chData, setChData] = useState([]);
  const [allChData, setAllChData] = useState([]);

  async function getAllChData() {
    const ch = await axios.get(
      `/api/mangadex/manga/${state.mId}/feed?order[volume]=desc&order[chapter]=desc`,
    );
    setAllChData(ch.data.data);
  }

  function nextPrev(num) {
    let currentIdx = allChData.findIndex((t) => t.id == state.id);
    let newIdx = currentIdx + num;
    let chId = allChData[newIdx]?.id || null;
    let chNum = allChData[newIdx]?.attributes.chapter || null;

    if (!chId) return;

    navigate(
      `/manga/${state.title.replaceAll(" ", "-").toLowerCase()}/chapter-${chNum}`,
      {
        state: {
          mId: state.mId,
          title: state.title,
          id: chId,
          num: chNum,
        },
      },
    );
  }

  const getChData = async () => {
    let res = await axios.get(
      `/api/mangadex/at-home/server/${state.id}`,
    );

    let chapters = res.data.chapter.data.map((ch) => {
      let chImg = `https://uploads.mangadex.org/data/${res.data.chapter.hash}/${ch}`;
      return { chImg };
    });
    setChData(chapters);
  };

  useEffect(() => {
    setChData([]);
    getChData();
  }, [state.id]);

  useEffect(() => {
    getAllChData();
  }, [state.mId]);

  const currentIdx = allChData.findIndex((t) => t.id == state.id);

  return (
    <div className="flex justify-center items-center flex-col gap-10 p-10 text-xl font-semibold">
      <div className="self-start flex-1">
        {"Home / Manga / " + state.title + " / Chapter " + state.num}
      </div>
      <ChapterButtons
        nav={nextPrev}
        idx={currentIdx}
        total={allChData.length}
      />
      <div>
        {chData.map((ch, idx) => {
          return (
            <div className="w-[80vw] md:w-[40vw]" key={idx}>
              <img src={ch.chImg} alt="" />
            </div>
          );
        })}
      </div>
      <ChapterButtons
        nav={nextPrev}
        idx={currentIdx}
        total={allChData.length}
      />
    </div>
  );
};

export default Chapter;
