import {GET_CURRENT_CONTEXT,GET_USAGE} from './types';

export interface IAction{
    type:string;
    payload:any;
}

const fetchUsage = (url:string) => async (dispatch:any) => {
    // console.log('%c MyApp:' , 'background:green;color:white' ,"Showing usage data");
    console.log("action called");
    const usage = await setTimeout(() => 3,3000);
    console.log(usage);
    dispatch({type:GET_USAGE,payload:303});
    console.log('%c MyApp:' , 'background:green;color:white' ,"action call completed");
    console.log("");
  };


export const getCurrentContext = () => (dispatch:any) => {
    console.log('%c MyApp:' , 'background:green;color:white' ,"getCurrentContext called");
    dispatch({type:GET_CURRENT_CONTEXT,payload:{name:"Swapnil",age:27}});
};
  
  export default fetchUsage;
