import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneDynamicField, PropertyPaneAction, PropertyPaneCustomField } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownProps,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdownOptionType,
  IPropertyPaneData,
  PropertyPaneButtonType,
  PropertyPaneButton
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
import PropertyPane from '@microsoft/sp-property-pane/lib/propertyPane/PropertyPane';
import { Icon, IconType } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import {update,get} from '@microsoft/sp-lodash-subset';
export interface IEasyTabsWebPartProps {
  numberOfTabs: number;
  tabsDetails:[ITabDetails];
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

export interface ITabDetails{
  tabName?:string;
  libName?:string;
  tabIndex:string;
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
    // console.log('%c MyApp:' , 'background:yellow;color:red' , "get library name called back happened" );
    // console.log('%c MyApp:' , 'background:yellow;color:red' , listDetails.value );
    // // console.log('%c MyApp:' , 'background:yellow;color:red' , listDetails[0].Title );
    listDetails.value.map((v:any,index:number)=>{
      console.log('%c MyApp:' , 'background:yellow;color:red' , v.Title );
      this.dropdownItems.push({key:index,text:v.Title});
    });
    // console.log('%c MyApp:' , 'background:yellow;color:red' , this.dropdownItems );
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    console.log('%c MyApp:' , 'background:green;color:white' , "getPropertyPaneConfiguration number of tabs" );
    console.log('%c MyApp:' , 'background:green;color:white' , this.properties.numberOfTabs );
    console.log('%c MyApp:' , 'background:green;color:white' , this );
    return {
      pages: [
        {
          header: {
            description: "Configure Tab details over here"
          },
          displayGroupsAsAccordion:true,
          groups: [
            {
              groupName:"Tab Details",
              groupFields:[
                PropertyPaneDropdown('numberOfTabs',{
                label:"Select Number of Tabs",
                options:[{
                  key:0,text:"---Select---",
                },
                {
                  key:1,text:"One",
                },
                {
                  key:2,text:"Two",
                },
                {
                  key:3,text:"Three",
                }]
                }),
                PropertyPaneButton('Add',{
                  buttonType:PropertyPaneButtonType.Hero,
                  text:"Add",
                  onClick:this.onButtonClick.bind(this)
                })
              ]
            },
            //tab1
            {
              groupName: "Tab1 Configurations",
              isGroupNameHidden:(this.properties.numberOfTabs === 1) ? true : false ,
              isCollapsed:true,
              groupFields: [
                PropertyPaneTextField('tab1', {
                  label: "Tab 1 Name",
                  onGetErrorMessage:this.onGetErrorMessage.bind(this),
                }),
                PropertyPaneDropdown('lib1',{
                  label: "Document Library",
                  options:this.dropdownItems,                  
                }),
                PropertyPaneButton('Remove1',{
                  buttonType:PropertyPaneButtonType.Hero,
                  text:"Remove Tab",
                  onClick:this.onButtonClick.bind(this)
                })
              ],
            },
            //tab2
            {
              groupName: "Tab2 Configurations",
              isCollapsed:true,
              isGroupNameHidden:(this.properties.numberOfTabs === 2) ? true : false ,
              groupFields: [
                PropertyPaneTextField('tab2', {
                  label: "Tab 2 Name",
                  onGetErrorMessage:this.onGetErrorMessage.bind(this),
                }),
                PropertyPaneDropdown('lib2',{
                  label: "Document Library",
                  options:this.dropdownItems,                  
                }),
                PropertyPaneButton('Remove2',{
                  buttonType:PropertyPaneButtonType.Hero,
                  text:"Remove Tav",
                  onClick:this.onButtonClick.bind(this)
                })                      
              ],
            },
            //tab3
            {
              groupName: "Tab3 Configurations",
              isCollapsed:true,
              isGroupNameHidden:(this.properties.numberOfTabs === 3) ? true : false,
              groupFields: [
                PropertyPaneTextField('tab3', {
                  label: "Tab 3 Name",
                  onGetErrorMessage:this.onGetErrorMessage.bind(this),
                }),
                PropertyPaneDropdown('lib3',{
                  label: "Document Library",
                  options:this.dropdownItems,                  
                }),
                PropertyPaneButton('Remove3',{
                  buttonType:PropertyPaneButtonType.Hero,
                  text:"Remove Tav",
                  onClick:this.onButtonClick.bind(this)
                })                        
              ],
            }
          ]
        }
      ]
    };
  }

  //dynamic add fields
  protected dynamicProperties(){
    if(this.properties.numberOfTabs === 1){
      const object =  {
                groupName: `Tab$1 Configurations`,
                          isCollapsed:true,
                          groupFields: [
                            PropertyPaneTextField(`tab$1`, {
                              label: `Tab $1 Name`,
                              onGetErrorMessage:this.onGetErrorMessage.bind(this),
                            }),
                            PropertyPaneDropdown(`tab$1`,{
                              label: "Document Library",
                              options:this.dropdownItems,                  
                            }),                                                                            
                          ] 
              };
    }
  }
  
  protected onButtonClick = (targetProperty:any) => {
    console.log('%c MyApp:' , 'background:orange;color:white' , "targetProperty" );
    console.log('%c MyApp:' , 'background:orange;color:white' , targetProperty );

  }

  //this will track changes in property pane
  protected onPropertyPaneFieldChanged(targetProperty:any, oldValue:any, newValue:any):any{
    console.log('%c MyApp:' , 'background:green;color:white' , "targetProperty" );
    console.log('%c MyApp:' , 'background:green;color:white' , targetProperty );
    console.log('%c MyApp:' , 'background:green;color:white' , "OldValue" );
    console.log('%c MyApp:' , 'background:green;color:white' , oldValue );
    console.log('%c MyApp:' , 'background:green;color:white' , "newValue" );
    console.log('%c MyApp:' , 'background:green;color:white' , newValue );
    if(oldValue === "Remove1"){
      // update(this.properties.numberOfTabs,this.properties.numberOfTabs,() =>);
      //tried to update the fuck here
    }
    // if(targetProperty==="numberOfTabs" && newValue !== oldValue){
    //   for (let index = 1; index <= newValue; index++) {
    //       const object =  {
    //         groupName: `Tab${index} Configurations`,
    //                   isCollapsed:true,
    //                   groupFields: [
    //                     PropertyPaneTextField(`tab${index}`, {
    //                       label: `Tab ${index} Name`,
    //                       onGetErrorMessage:this.onGetErrorMessage.bind(this),
    //                     }),
    //                     PropertyPaneDropdown(`tab${index}`,{
    //                       label: "Document Library",
    //                       options:this.dropdownItems,                  
    //                     })                            
    //                   ] 
    //       };
    //       this.propertyPaneGroup.push(object);
    //   }      
    // }
  }

  protected getLibraryNames(): IPropertyPaneDropdownOption[] {
    
    return ;
  }

  protected onGetErrorMessage(name:string):string | Promise<string>{
    if(name.length < 7 || name.length > 20){
      return "Please keep length in between 7 to 20";
    } else {
      return ;
    }   
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
