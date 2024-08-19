import { BarLoader } from "react-spinners";

export default function Loader() {
  return (
    <div
      style={{ backgroundColor: "#b8b8b839", zIndex: "9999" }}
      className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center z-[100]"
    >
      <div className="animate-originalShowing absolute !drop-shadow-xl flex items-center flex-col -mt-10 bg-white">
        <div id="fancyBorder" className=" p-[2px]">
          <div className="top-[0px] left-[0px] bg-white !pt-2 p-6">
            <div className="flex justify-center w-full mt-[15px]">
              <img
                alt="logo2"
                className="w-[120px] h-[40px] mb-2"
                src={"/assets/images/MainLogo.png"}
              />
            </div>
            <BarLoader color="#141414" width={180} height={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
