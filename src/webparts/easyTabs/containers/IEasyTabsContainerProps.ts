import {IContext} from '../EasyTabsWebPart';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IEasyTabsContainerProps {
  description: string;
  siteContext:IContext;
  context:IContext;
  getContext:(context:IContext) => {};
  getLists: (siteUrl:string,spHttpClient:SPHttpClient) => {};
}
