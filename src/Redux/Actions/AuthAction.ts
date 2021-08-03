import { userService } from "../../Services/user.service";

export const login = (instance) => (dispatch) => {
    return userService.login(instance).then(
      (data) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: "LOGIN_FAIL",
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const logout = (instance) => (dispatch) => {
    userService.logout(instance);
  
    dispatch({
      type: "LOGOUT",
    });
  };