import { GET_LIST_ITEMS } from "../types";
import {
  SPHttpClient,
  SPHttpClientResponse,
  SPHttpClientConfiguration
} from "@microsoft/sp-http";

export interface IAction {
  type: string;
  payload: any;
}

export const getListItems = (
  siteURL: string,
  listGUID: string,
  spHttpClient: SPHttpClient
) => async (dispatch: any) => {
  console.log(
    "%c MyApp:",
    "background:pink;color:white",
    "Getting list items details for"
  );
  debugger;
  const result: SPHttpClientResponse = await spHttpClient.fetch(
    siteURL + `/_api/Web/Lists(guid'${listGUID})'`,
    SPHttpClient.configurations.v1,
    {
      headers: {
        Accept: "application/json;odata=verbose",
        "odata-version": ""
      }
    }
  );
  let data: Promise<any> = await result.json();
  console.log(
    "%c MyApp:",
    "background:green;color:white",
    "GET_LISTS_ITEMS result is" + result
  );
  console.log("%c MyApp:", "background:green;color:white", data);

  //dispatch
  dispatch({ type: GET_LIST_ITEMS, payload: { listGUID, data } });
};
