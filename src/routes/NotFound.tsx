import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    } else if (count === 0) {
      navigate("/");
    }
  }, [count]);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="bg-[#f4f7f6] p-4 rounded-md flex items-center flex-col">
        <img
          alt="Logo"
          onClick={() => {
            navigate("/");
          }}
          className="w-[180px] h-[60px] cursor-pointer"
          src="/assets/images/MainLogo.png"
        ></img>
        <div className="flex items-center">
          <img
            alt="404 page img"
            onClick={() => {
              navigate("/");
            }}
            className="mt-[20px]"
            src="/assets/images/404page.png"
          ></img>
          <div
            id="YellowBG-fancyBorder"
            className="mt-[100px] w-[60px] h-[60px] rounded-md flex justify-center items-center bg-main text-[28px]"
          >
            {count}
          </div>
        </div>
        <div className="bg-main p-2 rounded-md mt-[20px] flex flex-col items-center">
          <div>The page you were looking for does not exist </div>
          <div className="text-[14px]">
            After <span className="text-red-600 font-semibold">5 seconds</span>{" "}
            you will be redirected to the main page{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
