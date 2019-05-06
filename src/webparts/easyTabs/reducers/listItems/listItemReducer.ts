import { GET_LIST_ITEMS } from "../../actions/types";
const initialState = {};

export interface IAction {
  type: string;
  payload: {
    listName: string;
    listItems: any;
  };
}

export const listItemsReducer = (state = initialState, action: IAction) => {
  console.log(
    "%c MyApp:",
    "background:green;color:white",
    "reducer adding current context"
  );
  console.log("%c MyApp:", "background:green;color:white", action.payload);
  switch (action.type) {
    case GET_LIST_ITEMS:
      return {
        ...state,
        [action.payload.listName]: action.payload.listItems
      };
    default:
      return state;
  }
};
