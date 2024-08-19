import { useEffect, useReducer, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IFilterType, IFruit } from "../types";
import { getAllFruits } from "../api";
import SingleFruit from "../components/SingleFruit";
import clickOutside from "../hook/clickOutside";
import GroupedFruits from "../components/GroupedFruits";
import Loader from "../components/Loader";
import SkeletonBox from "../components/SkeletonBox";
import Jar from "../components/Jar";
import selectedFruitReducer, {
  Action,
  FruitActionType,
} from "../reducer/FruitsController-redecer";

export default function Home() {
  // Main Data
  const { isLoading, data } = useQuery<IFruit[] | []>(
    ["fruits"],
    getAllFruits,
    {
      onSuccess: (e) => {
        console.log("Data Loaded", e);
      },
      //Error handler
      onError: (e) => {
        console.log("Error ", e);
      },
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const [groupedData, setGroupedData] = useState<any>(null);
  const [selectedFruit, dispatch] = useReducer<
    (state: IFruit[] | [], actions: Action) => IFruit[] | []
  >(selectedFruitReducer, []);

  //Filter
  const wrapperRef = useRef(null);
  const [dropboxOpen, setDropBoxOpen] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<IFilterType>("none");
  const filterList: Array<IFilterType> = ["none", "family", "order", "genus"];

  //Others
  const tableRef = useRef<HTMLInputElement | null>(null);
  const [reset, setReset] = useState(0);

  clickOutside(wrapperRef, () => {
    setDropBoxOpen(false);
  });

  //Scroll to the start point, when filter is changed
  const executeScroll = () => {
    if (tableRef.current) {
      tableRef.current.scrollTo(0, 0);
    }
  };

  const handleFruit = (fruit: IFruit) => {
    dispatch({ type: FruitActionType.ADD_OR_REMOVE_ONE_ITEM, fruit });
  };

  const handleGroupFruit = (fruits: IFruit[]) => {
    dispatch({ type: FruitActionType.ADD_OR_REMOVE_GRUOP_ITEM, fruits });
  };

  const handleRemoveFruits = () => {
    dispatch({ type: FruitActionType.REMOVE_ALL_ITEM });
  };

  const handleAddFruits = (fruits: IFruit[]) => {
    dispatch({ type: FruitActionType.ADD_ALL_ITEM, fruits });
  };

  useEffect(() => {
    if (data) {
      if (currentFilter !== "none") {
        let main_array: any = {};
        data.forEach((each: IFruit) => {
          // has some value including spaces -> need to trim it
          let key_name = each[currentFilter].replaceAll(" ", "");

          if (main_array[key_name]) {
            let tempArray = [...main_array[key_name]];
            tempArray.push(each);
            main_array[key_name] = tempArray;
          } else {
            main_array[key_name] = [each];
          }
        });
        setGroupedData(main_array);
      } else {
        setGroupedData(null);
      }
    }
  }, [currentFilter, data]);

  return (
    <div className="flex h-full w-full justify-center bg-white">
      {isLoading && <Loader />}
      <div className="relative w-[450px] p-3 flex justify-center items-center bg-white mr-[50px]">
        <div className="absolute mt-[-365px] flex items-center">
          <div className="font-semibold">Group By</div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setDropBoxOpen(true);
            }}
            className="capitalize ml-[10px] cursor-pointer hover:bg-mainHover  flex justify-center items-center border-black border-[4px] bg-main px-[5px] py-[5px] w-[70px] text-[13px] rounded-md"
          >
            {currentFilter}
            {dropboxOpen && (
              <div
                ref={wrapperRef}
                className="top-[40px] z-20 drop-shadow-md  w-[200px] text-black animate-fastShowing font-medium text-[12px] cursor absolute right-[-27px] border-[2px] border-main rounded-lg p-2 flex flex-col justify-center bg-white"
              >
                {filterList?.map((each, index) => (
                  <div
                    className={`${index === 0 ? "" : "mt-2"} ${
                      currentFilter === each && "bg-gray-300"
                    }  p-2 hover:bg-gray-100 flex items-center rounded-md`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFruits();
                      executeScroll();
                      setCurrentFilter(each);
                      setReset((prev) => prev + 1);
                      setDropBoxOpen(false);
                    }}
                  >
                    <div className="font-semibold whitespace-nowrap capitalize">
                      {each}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <img
          id="noDrag"
          alt="list"
          src="/assets/images/ListIcon.png"
          className="w-[420px] h-[650px]"
        ></img>
        <div
          ref={tableRef}
          className="journal-scroll mt-[120px] pl-[10px] py-[5px] overflow-y-auto z-10 absolute w-[290px] h-[390px] bg-white rounded-md"
        >
          <SkeletonBox loading={isLoading} />
          {groupedData
            ? Object.keys(groupedData).map(
                (key_name: string, index: number) => (
                  <div className={`${index !== 0 ? "mt-[10px]" : ""}`}>
                    <GroupedFruits
                      key_name={key_name}
                      groupedFruit={groupedData[key_name]}
                      checkFruit={handleFruit}
                      checkGroupedFruits={handleGroupFruit}
                      selectedFruit={selectedFruit}
                      reset={reset}
                    />
                  </div>
                )
              )
            : data &&
              data.map((each, index) => (
                <div className={`${index !== 0 ? "mt-[10px]" : ""}`}>
                  <SingleFruit
                    fruit={each}
                    checkFruit={handleFruit}
                    selectedFruit={selectedFruit}
                  />
                </div>
              ))}
        </div>
        <div className="flex absolute mt-[582px]">
          <div
            onClick={() => {
              if (data) handleAddFruits(data);
            }}
            className="cursor-pointer hover:bg-mainHover  flex justify-center items-center border-black border-[4px] bg-main px-[5px] py-[10px] text-[13px] rounded-md"
          >
            Add All In The List
          </div>
          <div
            onClick={() => {
              if (data) handleRemoveFruits();
            }}
            className="ml-[20px] cursor-pointer hover:bg-mainHover  flex justify-center items-center border-black border-[4px] bg-main px-[5px] py-[10px] text-[13px] rounded-md"
          >
            Remove All
          </div>
        </div>
      </div>
      <div className="w-[450px]">
        <Jar selectedFruit={selectedFruit} checkFruit={handleFruit} />
      </div>
    </div>
  );
}
