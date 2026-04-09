import React from "react";

const ShowMore = (props) => {
  return (
    <button
      onClick={props.showMore}
      className="bg-yellow-600 px-3 py-2 rounded-lg font-bold active:scale-95 cursor-pointer"
    >
      Show More
    </button>
  );
};

export default ShowMore;
