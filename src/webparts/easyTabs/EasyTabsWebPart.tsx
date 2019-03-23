import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownProps,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';

// import * as strings from 'EasyTabsWebPartStrings';
import EasyTabs from './components/EasyTabs';
import { IEasyTabsProps } from './components/IEasyTabsProps';

import { Store } from 'redux';
import { Provider } from 'react-redux';
import DefaultContainer from './containers/DefaultContainer';
import { createStore, IState } from './store';
import { applyProperties, updateProperty } from './reducers/webpart';
import SiteContainer from './containers/SiteContainer';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import {IUsage} from './containers/SiteContainer';

//to be removed
import {getCurrentContext} from "./actions";

export interface IEasyTabsWebPartProps {
  description: string;
  webpartname: number;
  context:IContext;
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
  private webPartProperties:ICustomProps;
  private currentContext:IContext;

  public constructor() {
    super();
    this.store = createStore();
  }  

  public render(): void {
    this.webPartProperties = {
      description: this.properties.description,
      webpartname: this.properties.webpartname
    }; 
    if(this.context){
      this.currentContext= {
        siteURL:this.context.pageContext.web.absoluteUrl,
        spHttpClient:this.context.spHttpClient
      }; 
    }
    const element = (
      <Provider store={this.store}>
        {/* <SiteContainer onPropertyPaneChange={this.webPartProperties} context={this.currentContext} usage="1" /> */}
        <EasyTabs context={this.currentContext} description={this.properties.description} />
      </Provider>
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    console.log('%c MyApp:' , 'background:green;color:white' , "change is"+this.webPartProperties.description );
    return {
      pages: [
        {
          header: {
            description: "PropertyPaneDescriptio"
          },
          groups: [
            {
              groupName: "BasicGroupName",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "DescriptionFieldLabel"
                }),
                PropertyPaneTextField('webpartname', {
                  label: "Web Part Name"
                })            
              ]
            }
          ]
        }
      ]
    };
  }
}
