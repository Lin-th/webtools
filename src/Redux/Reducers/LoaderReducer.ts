import IAction from '../IAction';
import ActionType from '../ActionType';

interface ILoaderState {
    loading?: boolean;
    message?: string;
    percentage?: number; // 0 - 100
}
const initialState: ILoaderState = {
    loading: false
};

const reducer = (state: ILoaderState = initialState, action: IAction<any>): ILoaderState => {
    switch(action.type){
        default:
            return {
                ...state
            };
        case ActionType.LOADING_INIT:
            return {
                ...initialState,
                ...action.payload,
            };
        case ActionType.LOADING_CHANGE:
            return {
                ...action.payload
            };
    }
};

export default reducer;