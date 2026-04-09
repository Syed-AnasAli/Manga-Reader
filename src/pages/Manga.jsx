import { useLocation, useNavigate } from "react-router";
import MangaCard from "../components/MangaCard";
import Warning from "../components/Warning";
import { useState, useEffect } from "react";
import axios from "axios";

const mangaDescription = () => {
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  let { state } = useLocation();

  const apiCall = async () => {
    const res = await axios.get(
      `https://api.mangadex.org/manga/${state.id}/feed?translatedLanguage[]=en&order[volume]=desc&order[chapter]=desc`,
    );
    console.log(res);

    let ch = res.data.data.map((ch) => {
      let num = ch.attributes.chapter;
      let ln = ch.attributes.translatedLanguage;
      let id = ch.id;
      return {
        num: num,
        ln: ln,
        id: id,
      };
    });

    setChapters(ch);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    apiCall();
  }, []);

  const [coverImg, setCoverImg] = useState(state.coverState);
  let status = state.status;
  status = status.charAt(0).toUpperCase() + status.slice(1);

  function warning() {
    coverImg ? setCoverImg(false) : setCoverImg(true);
  }

  return (
    <div className="flex flex-col flex-1">
      <Warning warning={warning} />
      <MangaCard
        cover={state.cover}
        coverState={coverImg}
        title={state.title}
        lastCh={state.lastCh}
        status={status}
        year={state.year}
        pronouns={state.pronouns}
        tags={state.tags}
      />
      <div className="mx-20 mb-10">
        <h5 className="text-3xl font-bold">Summary:</h5>
        <p className="text-lg font-semibold pt-2">{state.desc}</p>
      </div>
      <div className="mx-10 mb-10 flex flex-col">
        <h5 className="text-3xl font-bold ml-10">Chapters:</h5>
        <div>
          <div className="flex flex-wrap gap-5 pt-5 flex-1 items-center mx-auto pl-10">
            {chapters.map((chapter, idx) => {
              return (
                <div
                  onClick={() => {
                    navigate(
                      `/manga/${state.title.replaceAll(" ", "-").toLowerCase()}/chapter-${chapter.num}`,
                      {
                        state: {
                          id: chapter.id,
                          title: state.title,
                          num: chapter.num,
                        },
                      },
                    );
                  }}
                  key={idx}
                  className="cursor-pointer active:scale-95"
                >
                  <div className="border-2 box-border text-center whitespace-nowrap w-40 rounded px-4 py-2">
                    Chapter {chapter.num} - {chapter.ln}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default mangaDescription;
