export const config = {
    clientId:  process.env.REACT_APP_CLIENT_ID,
    redirectUri: 'http://localhost:3001',
    scopes: [
        'user.read'
    ]
};