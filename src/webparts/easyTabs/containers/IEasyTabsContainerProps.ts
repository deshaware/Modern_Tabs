import {IContext} from '../EasyTabsWebPart';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IEasyTabsContainerProps {
  siteContext:IContext;
  listDetails:any;
  onConfigChange: (callback:any) => {};
  context:IContext;
  getContext:(context:IContext) => {};
  getLists: (siteUrl:string,spHttpClient:SPHttpClient) => {};
}
