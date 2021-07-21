import ActionType from "./ActionType";

interface IAction<T> {
    type: ActionType,
    payload: T
}

export default IAction;
