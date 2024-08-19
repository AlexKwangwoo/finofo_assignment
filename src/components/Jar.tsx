import { useEffect, useState } from "react";
import { IFruit } from "../types";

export default function Jar({
  selectedFruit,
  checkFruit,
}: {
  selectedFruit: IFruit[];
  checkFruit: (fruit: IFruit) => void;
}) {
  const [totalCal, setTotalCal] = useState<number>(0);
  useEffect(() => {
    let tempCal = 0;
    selectedFruit.forEach((each) => {
      tempCal += each.nutritions.calories;
    });
    setTotalCal(tempCal);
  }, [selectedFruit]);

  return (
    <div className="relative  bg-white h-full flex justify-center items-center">
      <img
        id="noDrag"
        alt="list"
        src="/assets/images/Jar.png"
        className="w-[420px] h-[600px] mt-[50px]"
      ></img>
      <div
        id={selectedFruit?.length > 0 ? "YellowBG-fancyBorder" : ""}
        className="journal-scroll bg-gray-200 pl-[10px] py-[5px] overflow-y-auto z-10 absolute w-[290px] h-[360px] mt-[130px] rounded-md"
      >
        {selectedFruit &&
          selectedFruit.map((each) => (
            <div className="flex items-center">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  checkFruit(each);
                }}
                className="mb-[1px] mt-[-1px] font-bold w-[15px] h-[15px] text-[13px] cursor-pointer hover:bg-mainHover  flex justify-center items-center border-black border-[1px] bg-main px-[5px] py-[2px] mr-[5px] rounded-[5px]"
              >
                -
              </div>
              {each.name}
              <span className="text-darkPink text-[11px] ml-[4px]">
                {" "}
                - ({each.nutritions.calories})
              </span>
            </div>
          ))}
      </div>

      <div className="bg-gray-200 px-[10px] py-[5px] z-10 absolute mt-[550px] rounded-md ">
        Total Cal: {totalCal}
      </div>
    </div>
  );
}
