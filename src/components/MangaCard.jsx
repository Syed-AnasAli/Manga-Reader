import { useNavigate } from "react-router";
import noImage from "../assets/no-image.jpg";
import axios from "axios";

const MangaCard = (state) => {
  const navigate = useNavigate();

  async function navigation(bool) {
    const lastCh = await axios.get(
      `https://api.mangadex.org/manga/${state.id}/feed?order[volume]=desc&order[chapter]=desc`,
    );

    let chNum, chId, idx;

    if (bool == false) {
      chNum = lastCh.data.data[0]?.attributes?.chapter || 0;
      chId = lastCh.data.data[0].id;
    } else {
      idx = lastCh.data.data.length - 1;
      chNum = lastCh.data.data[idx]?.attributes?.chapter || 0;
      chId = lastCh.data.data[idx].id;
    }

    navigate(
      `/manga/${state?.title.replaceAll(" ", "-").toLowerCase()}/chapter-${chNum}`,
      {
        state: {
          id: chId,
          title: state?.title,
          num: chNum,
        },
      },
    );
  }

  return (
    <div>
      <div className=" mb-10 ml-10 mr-10 bg-amber-100 pt-10 pb-15">
        <div className="text-[40px] font-bold pl-43 mb-10 text-amber-600 ">
          {state?.title}
        </div>
        <div className=" px-12 flex gap-10">
          <div className="w-[256px] h-91 overflow-hidden rounded-lg shrink-0 border-2 bg-amber-200 ">
            <img
              src={state.coverState ? state.cover : noImage}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-between w-100% bg-amber-50 p-10 ">
            <div className="pb-10">
              <div className="flex">
                <h5 className="font-bold text-[22px] w-50 shrink-0">
                  Alternatives:
                </h5>
                <p className="text-[22px]">{state.pronouns}</p>
              </div>
              <div className="flex">
                <h5 className="font-bold text-[22px] w-50 shrink-0">
                  Released:
                </h5>
                <p className="text-[22px]">{state.year}</p>
              </div>
              <div className="flex">
                <h5 className="font-bold text-[22px] w-50 shrink-0">Status:</h5>
                <p className="text-[22px]">{state.status}</p>
              </div>
              <div className="flex">
                <h5 className="font-bold text-[22px] w-50 shrink-0">
                  Total Chapters:
                </h5>
                <p className="text-[22px]">{state.lastCh}</p>
              </div>
              <div className="flex">
                <h5 className="font-bold text-[22px] w-50 shrink-0">Tags:</h5>
                <p className="text-[22px]">{state.tags}</p>
              </div>
            </div>
            <div className=" flex gap-5">
              <div>
                <div
                  className="font-lg bg-amber-600 font-bold border-amber-950 border-2 px-2 py-2 rounded-md active:scale-95 cursor-pointer"
                  onClick={() => {
                    navigation(true);
                  }}
                >
                  Read First
                </div>
              </div>

              <div>
                <div
                  onClick={() => {
                    navigation(false);
                  }}
                  className="font-lg bg-amber-600 font-bold border-amber-950 border-2 px-2 py-2 rounded-md active:scale-95 cursor-pointer"
                >
                  Read Latest
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaCard;
