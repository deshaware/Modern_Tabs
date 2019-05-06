import { GET_LISTS } from "../types";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export default (siteURL: string, spHttpClient: SPHttpClient) => async (
  dispatch: any
) => {
  // debugger;
  console.log(
    "%c MyApp:",
    "background:green;color:white",
    "GET_LISTS called with url" + siteURL
  );
  const result: SPHttpClientResponse = await spHttpClient.fetch(
    siteURL +
      "/_api/Web/Lists?$filter=BaseTemplate eq 101 and Title ne 'Site Assets' and Title ne 'Style Library'",
    SPHttpClient.configurations.v1,
    {
      headers: {
        Accept: "application/json;odata=nometadata",
        "odata-version": ""
      }
    }
  );
  let data: Promise<any> = await result.json();

  console.log(
    "%c MyApp:",
    "background:green;color:white",
    "GET_LISTS result is" + result
  );
  console.log("%c MyApp:", "background:green;color:white", data);
  dispatch({ type: GET_LISTS, payload: data });
};
