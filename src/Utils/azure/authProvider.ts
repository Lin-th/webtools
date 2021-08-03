import { MsalAuthProvider, LoginType } from 'react-aad-msal';
// Msal Configurations
const config: any = {
    auth: {
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    clientId:  process.env.REACT_APP_CLIENT_ID,
    redirectUri: `${process.env.REACT_APP_REDIRECT_URL}/report`,
        navigateToLoginRequestUrl: false
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true
    }
  };

  export const msalConfig:any = {
    auth: {
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    clientId:  process.env.REACT_APP_CLIENT_ID,
    redirectUri: `${process.env.REACT_APP_REDIRECT_URL}`,
        navigateToLoginRequestUrl: false
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true
    }
  };
  
  export const authenticationParameters: any = {
    scopes: [process.env.REACT_APP_API_SCOPE]
  }
  
  const options: any = {
    loginType: LoginType.Redirect,
    tokenRefreshUri:  `${process.env.REACT_APP_REDIRECT_URL}/report`,
  }
  
  const authProvider = new MsalAuthProvider(config, authenticationParameters, options);
  
  export default authProvider;