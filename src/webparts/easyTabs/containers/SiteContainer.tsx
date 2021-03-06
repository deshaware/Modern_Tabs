import * as React from 'react';
import {connect} from 'react-redux';
import ShowUsage from '../components/ShowUsage';
import fetchUsage from '../actions';
import getContext from '../actions/init';
import {IEasyTabsWebPartProps,ICustomProps,IContext} from '../EasyTabsWebPart';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IUsage{
    usage:number;
    usageState:number;
    description:string;
    context:IContext;
    onPropertyPaneChange:ICustomProps;
    fetchUsage:(url:String)=>{};
    getContext:(context:IContext) => {};
}

class SiteContainer extends React.Component<IUsage,{}>{
        
    public componentDidMount(){
        console.log('%c MyApp:' , 'background:green;color:white' , "Site Usage Class called" );
        console.log('%c MyApp:' , 'background:green;color:white' , this.props.usageState );
        if(this.props.usage){
        this.props.fetchUsage("https://lti3.sharepoint.com");
        this.props.getContext(this.props.context);
        }
    }
    public componentDidUpdate(prev:any,next:any){
        console.log('%c MyApp:' , 'background:green;color:white' , "Component updated" );
        console.log('%c MyApp:' , 'background:green;color:white' , prev );
        console.log('%c MyApp:' , 'background:green;color:white' , next );
    }

    public render():JSX.Element{
        return(
            <div>
                <ShowUsage usage={this.props.usage} />
                Description is {this.props.onPropertyPaneChange.description}
                <p>Webpart name is {this.props.onPropertyPaneChange.webpartname}</p> 
            </div>
        );
    }
}

const mapStateToProps = (state:any) =>{
    return {
        usageState:state.usage
    };
};
export default connect(mapStateToProps,{fetchUsage,getContext})(SiteContainer);