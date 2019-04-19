
import * as React from "react";
import { Shimmer, ShimmerElementType } from 'office-ui-fabric-react/lib/Shimmer';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Button } from "office-ui-fabric-react/lib/Button";

import Shimmers from '../components/Shimmers';
import PivotItemComponent from '../components/PivotItemComponent';

export interface IPivotItemProps{
    icon:string;
    pivotHeader:string;
    listItems:IListItem[];
    itemCount:number;
}

export interface IListItem{
    id:number;
    title:String;
    createdBy:String;
    modified:String;
}

export interface test{
    itemAvailable:boolean;
}

class PivotItemContainer extends React.Component<{},test>{
    public item:IPivotItemProps[];

    constructor(props){
        super(props);
        this.state = {
            itemAvailable:false
        };
        this.item = [
            {
                icon:"Globe",pivotHeader:"This is the first tabe",itemCount:21,
                listItems:
                [
                    {id:1,title:"this is item 1",modified:"11 April 2019",createdBy:"Swapnil Deshaware"}
                ]
            },
            {
                icon:"Sunny",pivotHeader:"This is the first tabe",itemCount:21,
                listItems:
                [
                    {id:1,title:"this is item 1",modified:"11 April 2019",createdBy:"Swapnil Deshaware"}
                ]
            },
            {
                icon:"Globe",pivotHeader:"This is the first tabe",itemCount:21,
                listItems:
                [
                    {id:1,title:"this is item 1",modified:"11 April 2019",createdBy:"Swapnil Deshaware"}
                ]
            }
        ];
    }

    //shimmer
    public showShimmer(){
        console.log('%c MyApp:' , 'background:green;color:white' , "PivotItemContainer" );
        return(
            <Shimmers/>
        );
    }
  
    public generateSome(){
        return this.item.map((i:IPivotItemProps,key:number) => {
            return (<PivotItem key={key} linkText={i.pivotHeader} itemIcon={i.icon} itemCount={i.itemCount} >
                    <span>
                        {i.listItems.map((listitem:IListItem) =>{
                            return (
                            <div>
                                <p>ID:{listitem.id}</p>
                                <p>Title:{listitem.title}</p>
                                <p>Created BY:{listitem.createdBy}</p>
                                <p>Modified:{listitem.modified}</p>
                            </div>
                            );
                        })}
                    </span>
                </PivotItem>);
        });
    }
    public render():JSX.Element{
        return(
            <Pivot>
                {/* <PivotItem linkText="FirstTab" itemIcon="Globe" key="1" >
                    {(!this.state.itemAvailable) ? this.showShimmer(): <div>hi</div> }
                </PivotItem> */}
                {this.generateSome()}
                <Button onClick={() => this.setState({itemAvailable:true})} >Click Me</Button>
            </Pivot>
        );
    }   

}

export default PivotItemContainer;