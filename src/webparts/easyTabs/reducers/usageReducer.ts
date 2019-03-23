
const initialState = {
    usage:0
};

export interface IAction{
    type:string;
    payload:number;
}

export default(state=initialState,action:IAction):any => {
    console.log('%c MyApp:' , 'background:green;color:white',"reducer called after action dispatched");
    switch(action.type){
        case "GET_USAGE":
            return {
                ...state,
                usage:action.payload
            };
        default:
            return state;
        
    }
};