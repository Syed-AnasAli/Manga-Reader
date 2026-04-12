import { useNavigate } from "react-router";
import noImage from "../assets/no-image.jpg";

const CoverCard = (props) => {
  let navigate = useNavigate();

  const showMangaPage = () => {
    navigate(`/manga/${props.title.replaceAll(" ", "-").toLowerCase()}`, {
      state: {
        cover: props.cover,
        coverState: props.coverState,
        title: props.title,
        lastCh: props.lastCh,
        desc: props.desc,
        status: props.status,
        year: props.year,
        pronouns: props.pronouns,
        tags: props.tags,
        id: props.id,
      },
    });
  };

  const showChapter = (chNum, chID) => {
    navigate(
      `/manga/${props.title.replaceAll(" ", "-").toLowerCase()}/chapter-${chNum}`,
      {
        state: {
          mId: props.id,
          id: chID,
          title: props.title,
          num: chNum,
        },
      },
    );
  };

  return (
    <div className="flex gap-2 flex-col p-5">
      <div
        onClick={showMangaPage}
        className="w-[256px] h-91 rounded-lg overflow-hidden bg-none border-2"
      >
        <img
          src={props.coverState ? props.cover : noImage}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className=" w-[256px] text-2xl font-bold line-clamp-2">
        {props.title}
      </div>
      {props.lastCh > 0 && (
        <button
          onClick={() => {
            showChapter(props.lastCh, props.lastChID);
          }}
          className="h-7 w-30 bg-gray-300 rounded-2xl flex items-center justify-center active:scale-95 cursor-pointer"
        >
          Chapter {parseFloat(props.lastCh.toFixed(2))}
        </button>
      )}
      {props.last2Ch > 0 && (
        <button
          onClick={() => {
            showChapter(props.last2Ch, props.last2ChID);
          }}
          className="h-7 w-30 bg-gray-300 rounded-2xl flex items-center justify-center active:scale-95 cursor-pointer"
        >
          Chapter {parseFloat(props.last2Ch.toFixed(2))}
        </button>
      )}
    </div>
  );
};

export default CoverCard;
