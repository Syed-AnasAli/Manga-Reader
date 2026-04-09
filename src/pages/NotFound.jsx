import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex py-20 flex-wrap flex-col gap-10 items-center">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-xl w-170 text-center">
        Sorry, we couldn't find this page. But don't worry, you can find plenty
        of other things on our homepage.
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="bg-yellow-600 px-3 py-2 rounded-lg font-bold active:scale-95 cursor-pointer"
      >
        Back To Home
      </button>
    </div>
  );
};

export default NotFound;
