export class AuthAction {

    constructor() {

    }
    onUpdateProfile = (ownProps: any, jwt: any) => (dispatch: any) => {
        dispatch({
            type: 'AAD_LOGIN_SUCCESS',
            payload: {
                account: jwt.account,
                jwtAccessToken: jwt.accessToken,
                jwtIdToken: jwt.idToken
            }
        });
        ownProps.history.push("/Company");
    }

    getRole = () => (dispatch: any, getState: any) => {
        let state = getState();
        let { roles } = state.authState;
        return roles || [];
    }

    setRole = (roles: any) => (dispatch: any) => {
        dispatch({ type: 'AAD_ROLES', payload: { roles: roles } });
    }

    getProfile = () => (dispatch: any, getState: any) => {
        let state = getState();
        let authState = state.authState;
        let { account } = authState;
        return account;
    }

}

export default new AuthAction();
