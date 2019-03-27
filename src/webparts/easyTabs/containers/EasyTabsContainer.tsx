import * as React from 'react';
import { IEasyTabsContainerProps } from './IEasyTabsContainerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { connect } from 'react-redux';
import getContext from '../actions/init';
import EasyTabs from '../components/EasyTabs';
import PivotItemContainer from './PivotItemContainer';


class EasyTabsContainer extends React.Component<IEasyTabsContainerProps, {}> {

  public componentDidMount(){
    if(this.props.siteContext){
      console.log('%c MyApp:' , 'background:green;color:white' , "Site Context Empty, hence fetching data" );
        this.props.getContext(this.props.context);
    } else {
      console.log('%c MyApp:' , 'background:green;color:white' , "Already loaded once" );
    }    
  }

  public render(): JSX.Element {
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
    siteContext:state.currentContext
  };
};

export default connect(mapStateToProps,{getContext})(EasyTabsContainer);