export const config = {
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    clientId:  process.env.REACT_APP_CLIENT_ID,
    redirectUri: `${process.env.REACT_APP_REDIRECT_URL}/report`,
    scopes: [
        'user.read'
    ]
};