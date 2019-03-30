import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneDynamicField } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownProps,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdownOptionType
} from '@microsoft/sp-property-pane';

// import * as strings from 'EasyTabsWebPartStrings';
import EasyTabsContainer from './containers/EasyTabsContainer';
import { IEasyTabsContainerProps } from './containers/IEasyTabsContainerProps';

import { Store } from 'redux';
import { Provider } from 'react-redux';
import DefaultContainer from './containers/DefaultContainer';
import { createStore, IState } from './store';
import { applyProperties, updateProperty } from './reducers/webpart';
import SiteContainer from './containers/SiteContainer';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import {IUsage} from './containers/SiteContainer';

export interface IEasyTabsWebPartProps {
  context:IContext;
  webpartname: string;
  onConfigChange: () => {};
}
export interface IContext {
    spHttpClient:SPHttpClient;
    siteURL:string;
}
export interface ICustomProps{
  description: string;
  webpartname: number;
}


export default class EasyTabsWebPart extends BaseClientSideWebPart<IEasyTabsWebPartProps> {
  private store: Store<IState>;
  private currentContext:IContext;
  protected dropdownItems:IPropertyPaneDropdownOption[];

  public constructor() {
    super();
    this.store = createStore();
  }  

  public render(): void {
    // this.webPartProperties = {
    //   webpartname: this.properties.webpartname
    // }; 
    if(this.context){
      this.currentContext= {
        siteURL:this.context.pageContext.web.absoluteUrl,
        spHttpClient:this.context.spHttpClient
      }; 
    }
    const element = (
      <Provider store={this.store}>
        {/* <SiteContainer onPropertyPaneChange={this.webPartProperties} context={this.currentContext} usage="1" /> */}
        <EasyTabsContainer onConfigChange={(listDetails:any) => this.getListDetails(listDetails)} context={this.currentContext} />
      </Provider>
    );
    ReactDom.render(element, this.domElement);
  }

  protected getListDetails = (listDetails:any) => {
    this.dropdownItems = [];
    console.log('%c MyApp:' , 'background:yellow;color:red' , "get library name called back happened" );
    console.log('%c MyApp:' , 'background:yellow;color:red' , listDetails.value );
    // console.log('%c MyApp:' , 'background:yellow;color:red' , listDetails[0].Title );
    listDetails.value.map((v:any,index:number)=>{
      console.log('%c MyApp:' , 'background:yellow;color:red' , v.Title );
      this.dropdownItems.push({key:index,text:v.Title});
    });
    console.log('%c MyApp:' , 'background:yellow;color:red' , this.dropdownItems );
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    console.log('%c MyApp:' , 'background:green;color:white' , "getPropertyPaneConfiguration" );
    console.log('%c MyApp:' , 'background:green;color:white' , this.properties.webpartname );
    console.log('%c MyApp:' , 'background:green;color:white' , "test" );
    return {
      pages: [
        {
          header: {
            description: "Configure Tab details over here"
          },
          displayGroupsAsAccordion:true,
          groups: [
            {
              groupName: "Tab Configuration",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Tab 1 Name",
                  onGetErrorMessage:this.onGetErrorMessage()
                }),
                // PropertyPaneDynamicField('webpartname',
                // {
                //   label:"Document Library Name"
                // })
                PropertyPaneDropdown('webpartname',{
                  label: "Document Library",
                  options:this.dropdownItems,
                  
                })                            
              ],
            }
          ]
        }
      ]
    };
  }
  protected getLibraryNames(): IPropertyPaneDropdownOption[] {
    return ;
  }

  protected onGetErrorMessage():any{
    
  }
  
  //usual methods
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // protected onBeforeSerialize(): void{
  //   console.log('%c MyApp:' , 'background:yellow;color:red' , "onBeforeSerialize" );
  //   console.log('%c MyApp:' , 'background:yellow;color:red' , this.properties );
  // }

  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }
}
