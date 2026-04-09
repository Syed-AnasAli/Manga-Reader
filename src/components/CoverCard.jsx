import { useNavigate } from "react-router";
import noImage from "../assets/no-image.jpg";

const CoverCard = (props) => {
  let navigate = useNavigate();

  const showMangaPage = () => {
    navigate("/manga", {
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
        <button className="h-7 w-30 bg-gray-300 rounded-2xl flex items-center justify-center">
          Chapter {parseFloat(props.lastCh.toFixed(2))}
        </button>
      )}
      {props.lastCh - 1 > 0 && (
        <button className="h-7 w-30 bg-gray-300 rounded-2xl flex items-center justify-center">
          Chapter{parseFloat((props.lastCh - 1).toFixed(2))}
        </button>
      )}
    </div>
  );
};

export default CoverCard;
