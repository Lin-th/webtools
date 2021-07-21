import IAction from '../IAction';
import ActionType from '../ActionType';

interface IHomePageState {
    greeting?: string;
}
const initState: IHomePageState = {
    greeting: "None"
}

const reducer = (state:IHomePageState = initState, action: IAction<any>): IHomePageState => {

    switch(action.type){
        default:
            return {
                ...state
            };
        case ActionType.HOME_INIT:
            return {
                ...initState,
                ...action.payload
            };
        case ActionType.HOME_CHANGE:
            return {
                ...state,
                ...action.payload
            };
    }
};

export default reducer;