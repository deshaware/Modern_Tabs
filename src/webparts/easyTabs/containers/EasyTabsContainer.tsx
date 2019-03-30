import * as React from 'react';
import { IEasyTabsContainerProps } from './IEasyTabsContainerProps';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import { connect } from 'react-redux';
import getContext from '../actions/init';
import EasyTabs from '../components/EasyTabs';
import PivotItemContainer from './PivotItemContainer';
import getLists from '../actions/getLists';


class EasyTabsContainer extends React.Component<IEasyTabsContainerProps, {}> {

  public componentDidMount(){
   
  }

  public fetchDetails(){
    console.log('%c MyApp:' , 'background:blue;color:white' , "siteContext in component didmount EasyTabsContainer" );
    console.log('%c MyApp:' , 'background:blue;color:white' , this.props.siteContext );
    if(isEmpty(this.props.siteContext)){
      // getLists(this.props.siteContext.siteURL,this.props.siteContext.spHttpClient);
      console.log('%c MyApp:' , 'background:green;color:white' , "Site Context Empty, hence fetching data" );
      console.log('%c MyApp:' , 'background:yello;color:white' , this.props );
      // debugger;
      this.props.getContext(this.props.context);
    } else {
      if(isEmpty(this.props.listDetails)){
        this.props.getLists(this.props.siteContext.siteURL,this.props.siteContext.spHttpClient);
        console.log('%c MyApp:' , 'background:green;color:white' , "Already loaded once" );
      }      
    }
    
    //to call parent and give the list details//
    //hence I am calling a callback function to pass the lists
    if(this.props.listDetails){
      console.log('%c MyApp:' , 'background:green;color:white' , "Found list Details, now returning" );
      this.props.onConfigChange(this.props.listDetails);
    }
  }

  public render(): JSX.Element {
    this.fetchDetails();
    console.log('%c MyApp:' , 'background:green;color:white' , "Props in EasyTabsContainer" );
    console.log('%c MyApp:' , 'background:red;color:white' , this.props );
    return (
     <div>
         {/* <EasyTabs></EasyTabs> */}
         <PivotItemContainer test="hi"></PivotItemContainer>
     </div>
    );
  }
}

const mapStateToProps = (state:any) => {
  return {
    siteContext:state.currentContext.siteContext,
    listDetails:state.currentContext.listDetails
  };
};

export default connect(mapStateToProps,{getContext,getLists})(EasyTabsContainer);