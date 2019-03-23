import * as React from 'react';
import styles from './EasyTabs.module.scss';
import { IEasyTabsProps } from './IEasyTabsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { connect } from 'react-redux';
import getContext from '../actions/init';


class EasyTabs extends React.Component<IEasyTabsProps, {}> {

  public componentDidMount(){
    if(this.props.siteContext){
      console.log('%c MyApp:' , 'background:green;color:white' , "Site Context Empty, hence fetching data" );
        this.props.getContext(this.props.context);
    } else {
      console.log('%c MyApp:' , 'background:green;color:white' , "Already loaded once" );
    }    
  }

  public render(): React.ReactElement<IEasyTabsProps> {
    console.log('%c MyApp:' , 'background:green;color:white' , "Site Context is" );
    console.log('%c MyApp:' , 'background:green;color:white' , this.props.siteContext );
    return (
     <div>
       Hello World
     </div>
    );
  }
}

const mapStateToProps = (state:any) => {
  return {
    siteContext:state.currentContext
  };
};

export default connect(mapStateToProps,{getContext})(EasyTabs);