import noImage from "../assets/no-image.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import Covercard from "../components/CoverCard";
import ShowMore from "../components/ShowMore";
import Warning from "../components/Warning";

const HomePage = () => {
  const [limit, setLimit] = useState(10);
  const [coverImg, setCoverImg] = useState(false);
  const [loadingData, setLoadingData] = useState(
    Array(10).fill({
      title: "Loading....",
      cover: noImage,
    }),
  );
  const [mangaData, setMangaData] = useState(
    Array(10).fill({
      title: "Loading....",
      cover: noImage,
    }),
  );

  async function getLastChapter(mangaId) {
    const lastCh = await axios.get(
      `https://api.mangadex.org/manga/${mangaId}/feed?order[volume]=desc&order[chapter]=desc`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    let ch = lastCh.data.data[0].attributes.chapter;

    return Number(ch);
  }

  async function getData() {
    const res = await axios.get(
      `https://api.mangadex.org/manga?limit=${limit}&includes[]=cover_art`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(res.data.data);

    let mangaDataList = await Promise.all(
      res.data.data.map(async (manga) => {
        let titleEn =
          manga.attributes.altTitles?.find((t) => t.en)?.en ||
          Object.values(manga.attributes.title)[0] ||
          "No Title Available";

        let description =
          manga.attributes.description.en ||
          Object.values(manga.attributes.description)[0] ||
          "No Description Available";

        let status = manga.attributes.status;

        let releasedYear = manga.attributes.year;

        let pronouns = "";
        manga.attributes.altTitles.map((title) => {
          let pronoun = Object.values(title);
          titleEn == pronoun[0]
            ? null
            : pronouns == ""
              ? (pronouns = pronoun[0])
              : (pronouns = `${pronouns} / ${pronoun[0]}`);
        });

        let mangacoverid = manga.relationships.find(
          (t) => t.type === "cover_art",
        ).attributes.fileName;

        let lastChapter = await getLastChapter(manga.id);

        let tags = "";

        let allTags = manga.attributes.tags.map((tag) => {
          let tagName = Object.values(tag.attributes.name);
          tags == "" ? (tags = tagName) : (tags = `${tags} , ${tagName[0]}`);
        });

        return {
          title: titleEn,
          cover: `https://uploads.mangadex.org/covers/${manga.id}/${mangacoverid}`,
          lastCh: lastChapter,
          desc: description,
          status: status,
          year: releasedYear,
          pronouns: pronouns,
          tags: tags,
          id: manga.id,
        };
      }),
    );
    setMangaData(mangaDataList);
  }

  useEffect(() => {
    getData();
  }, [limit]);

  function showMore() {
    setLimit(limit + 10);
    setMangaData(mangaData.concat(loadingData));
  }

  function warning() {
    coverImg ? setCoverImg(false) : setCoverImg(true);
  }

  return (
    <div>
      <Warning warning={warning} />
      <div className="flex flex-wrap justify-center gap-10">
        {" "}
        {mangaData.map((manga, idx) => {
          return (
            <div key={idx}>
              <Covercard
                cover={manga.cover}
                coverState={coverImg}
                title={manga.title}
                lastCh={manga.lastCh}
                desc={manga.desc}
                status={manga.status}
                year={manga.year}
                pronouns={manga.pronouns}
                tags={manga.tags}
                id={manga.id}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center my-6 gap-10">
        {mangaData.length > 99 || <ShowMore showMore={showMore} />}
      </div>
    </div>
  );
};

export default HomePage;
