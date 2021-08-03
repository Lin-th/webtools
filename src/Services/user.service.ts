import { authenticationParameters } from "../Utils/azure/authProvider";


const myStorage = window.localStorage;

function login(instance) {
   return instance.loginPopup(authenticationParameters)
          .then((e)=>{
            myStorage.setItem("user",JSON.stringify(e));
            return e
          })
}

function logout(instance) {
    instance.logoutRedirect().catch(e => {
        console.error(e);
    });
    localStorage.removeItem('user');
}

export const userService = {
    login,
    logout
};