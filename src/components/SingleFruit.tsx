import { IFruit } from "../types";

export default function SingleFruit({
  inside = false,
  fruit,
  selectedFruit,
  checkFruit,
}: {
  inside?: boolean;
  fruit: IFruit;
  selectedFruit: IFruit[];
  checkFruit: (fruit: IFruit) => void;
}) {
  return (
    <div
      onClick={() => {
        checkFruit(fruit);
      }}
      className="p-2 rounded-md flex items-center hover:bg-gray-100 h-[30px] !cursor-pointer"
    >
      <div className="w-full flex gap-2">
        <input
          className="cursor-pointer peer relative appearance-none shrink-0 w-4 h-4"
          type="checkbox"
          checked={selectedFruit.some((each) => each.id === fruit.id)}
        />
        <svg
          className={`absolute w-4 h-4 pointer-events-none stroke-black fill-none peer-checked:!fill-red-500 ${
            inside ? "" : "mt-1"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <label className="cursor-pointer" htmlFor={fruit.id + ""}>
          {fruit.name}
          <span className="text-darkPink text-[11px]">
            {" "}
            - ({fruit.nutritions.calories})
          </span>
        </label>
      </div>
    </div>
  );
}
