
// env.ts
let envSource = process.env;
if ((window as any).__env__ != null){
    // window.env is set only from env-override.js which is generated inside docker startup.
    // local run won't have this property initialized.
    envSource = (window as any).__env__;
}

/* Get constants from environment variables. 
 * Values are configured in .env (for development) and .env.production (for staging and production)
 */ 
const {
    REACT_APP_APP_INSIGHT_KEY,
    REACT_APP_BUILD_NUM,
    REACT_APP_TITLE,
    REACT_APP_BASE_NAME,
    REACT_APP_TENANT_ID,
    REACT_APP_CLIENT_ID,
    REACT_APP_REDIRECT_URL,
    REACT_APP_XXX_API_ENDPOINT,
    REACT_APP_XXX_API_SCOPE
} = envSource;

export default {
    REACT_APP_APP_INSIGHT_KEY,
    REACT_APP_BUILD_NUM,
    REACT_APP_TITLE,
    REACT_APP_BASE_NAME,
    REACT_APP_TENANT_ID,
    REACT_APP_CLIENT_ID,
    REACT_APP_REDIRECT_URL,
    REACT_APP_XXX_API_ENDPOINT,
    REACT_APP_XXX_API_SCOPE
};