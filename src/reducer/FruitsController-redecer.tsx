import { IFruit } from "../types";

export enum FruitActionType {
  ADD_OR_REMOVE_ONE_ITEM,
  ADD_OR_REMOVE_GRUOP_ITEM,
  REMOVE_ALL_ITEM,
  ADD_ALL_ITEM,
}
export type Action =
  | {
      type: FruitActionType.ADD_OR_REMOVE_ONE_ITEM;
      fruit: IFruit;
    }
  | {
      type: FruitActionType.ADD_OR_REMOVE_GRUOP_ITEM;
      fruits: IFruit[];
    }
  | {
      type: FruitActionType.REMOVE_ALL_ITEM;
    }
  | {
      type: FruitActionType.ADD_ALL_ITEM;
      fruits: IFruit[];
    };

export default function selectedFruitReducer(
  selectedFruits: IFruit[],
  action: Action
) {
  switch (action.type) {
    case FruitActionType.ADD_OR_REMOVE_ONE_ITEM: {
      const { fruit } = action;
      let currentFruits = [...selectedFruits];
      if (currentFruits.find((each) => each.id === fruit.id)) {
        currentFruits = currentFruits.filter((each) => each.id !== fruit.id);
      } else {
        currentFruits.push(fruit);
      }
      return currentFruits;
    }

    case FruitActionType.ADD_OR_REMOVE_GRUOP_ITEM: {
      const { fruits } = action;
      let currentFruits = [...selectedFruits];
      fruits.forEach((singleFruit: IFruit) => {
        if (
          currentFruits.filter((each) => each.id === singleFruit.id).length ===
          0
        ) {
          currentFruits.push(singleFruit);
        }
      });
      return currentFruits;
    }

    case FruitActionType.REMOVE_ALL_ITEM: {
      return [];
    }

    case FruitActionType.ADD_ALL_ITEM: {
      const { fruits } = action;
      return fruits;
    }

    default: {
      throw Error(`Unknown error type, Please check action type`);
    }
  }
}
