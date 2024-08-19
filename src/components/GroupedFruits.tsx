import { useEffect, useState } from "react";
import { IFruit } from "../types";
import SingleFruit from "./SingleFruit";

export default function GroupedFruits({
  key_name,
  selectedFruit,
  groupedFruit,
  reset = 0,
  checkFruit,
  checkGroupedFruits,
}: {
  key_name: string;
  selectedFruit: IFruit[];
  groupedFruit: IFruit[];
  reset: number;
  checkFruit: (fruit: IFruit) => void;
  checkGroupedFruits: (fruits: IFruit[]) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (reset > 0 && open) {
      setOpen(false);
    }
  }, [reset]);

  return (
    <div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          // checkFruit(fruit);
          setOpen((prev) => !prev);
        }}
        className="p-2 rounded-md flex items-center hover:bg-gray-100 h-[30px] mb-[5px] cursor-pointer"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            checkGroupedFruits(groupedFruit);
          }}
          className="w-[20px] h-[20px] cursor-pointer hover:bg-mainHover  flex justify-center items-center border-black border-[1px] bg-main px-[5px] py-[2px] text-[11px] mr-[5px] rounded-md"
        >
          +
        </div>

        <div className="flex items-center mt-[2px]">
          {key_name}

          <svg
            className={
              `rotate-0 ml-[10px]` +
              (open ? " !-rotate-180 transition duration-200 " : "")
            }
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke={!open ? "#212529" : "#ffc303"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {open && (
        <div className="border-black border-[2px] ml-[20px] mr-[10px] text-[12px] p-1 rounded-md">
          {groupedFruit.map((each, index) => (
            <div className={`${index !== 0 ? "mt-[5px]" : ""}`}>
              <SingleFruit
                inside
                fruit={each}
                checkFruit={checkFruit}
                selectedFruit={selectedFruit}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
