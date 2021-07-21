import IAction from '../IAction';
import ActionType from '../ActionType';
import {IXxxService, impl as xxxService} from '../../Services/XXXService';
import XxxDTO from '../../DTOs/XxxDTO';
import logger from '../../Utils/logger';
import loaderAction from './LoaderAction';

class HomeAction {

    private xxxService: IXxxService;

    constructor(srv: IXxxService){
        this.xxxService = srv;
    }

    init = () => async (dispatch: any, getState: any) => {
        try{
            // Set the loader on
            dispatch(loaderAction.showLoading());
            // do something...
            const result:XxxDTO = await this.xxxService.getSomething("John Doe");
            // Send resulting state
            dispatch({
                type: ActionType.HOME_INIT,
                payload: {
                   ...result
                }
            } as IAction<any>);
            // Turn off the loader
            dispatch(loaderAction.hideLoading());
        }catch(error){
            if(Array.isArray(error)){
                error.forEach( e => logger.error(e));
                return;
            }
            logger.error(error);
        }
    };
}

export default new HomeAction(xxxService);