
import {CURRENT_CONTEXT} from '../actions/types';
import {IContext} from '../EasyTabsWebPart';
const initialState = {
    siteContext:{}
};
export interface IUsageState{
    siteContext:IContext;
}
export interface IAction{
    type:string;
    payload:number;
}

export default(state=initialState,action:IAction) : any => {
    console.log('%c MyApp:' , 'background:green;color:white',"reducer adding current context");
    console.log('%c MyApp:' , 'background:green;color:white',action.payload);
    switch(action.type){
            case CURRENT_CONTEXT:
            return {
                ...state,
                siteContext:action.payload
            };
        default:
            return state;
        
    }
};