import {IContext} from '../EasyTabsWebPart';

export interface IEasyTabsContainerProps {
  description: string;
  siteContext:IContext;
  context:IContext;
  getContext:(context:IContext) => {};
}
