import IAction from '../IAction';
import ActionType from '../ActionType';

class LoaderAction {

    showLoading = (message?: string) => (dispatch: any, getState: any) => {
        dispatch({
            type: ActionType.LOADING_CHANGE,
            payload: {
                loading: true,
                message,
                percentage: undefined
            }            
        } as IAction<any>);
    };

    hideLoading = ()  => (dispatch: any, getState: any) => {
        dispatch({
            type: ActionType.LOADING_CHANGE,
            payload: {
                loading: false,
                message: undefined,
                percentage: undefined
            }
        } as IAction<any>);
    };

}

export default new  LoaderAction();