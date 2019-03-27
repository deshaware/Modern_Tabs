
import * as React from "react";
import { Shimmer, ShimmerElementType } from 'office-ui-fabric-react/lib/Shimmer';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Button } from "office-ui-fabric-react/lib/Button";

import Shimmers from '../components/Shimmers';

export interface IPivotItemContainerProps{
    test:string;
}

export interface test{
    itemAvailable:boolean;
}

class PivotItemContainer extends React.Component<IPivotItemContainerProps,test>{

    constructor(props:IPivotItemContainerProps){
        super(props);
        this.state = {
            itemAvailable:false
        };
    }

    //shimmer
    public showShimmer(){
        console.log('%c MyApp:' , 'background:green;color:white' , "PivotItemContainer" );
        return(
            <Shimmers/>
        );
    }
  
    public render():JSX.Element{
        return(
            <Pivot>
                <PivotItem linkText="FirstTab" itemIcon="Globe" key="1" >
                    {(!this.state.itemAvailable) ? this.showShimmer(): <div>hi</div> }
                </PivotItem>
                <Button onClick={() => this.setState({itemAvailable:true})} >Click Me</Button>
            </Pivot>
        );
    }   

}

export default PivotItemContainer;