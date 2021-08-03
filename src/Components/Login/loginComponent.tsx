// import { AccountInfo } from "@azure/msal-browser";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { UserAgentApplication } from "msal";
import React, { useState } from "react";
import loginIMG from "../../Assets/Images/login.png";
import microsoftLogo from "../../Assets/Images/microsoftLogo.png";
// import AzureAuthenticationContext from "../../Utils/azure/authContext";
import { config } from "../../Utils/azure/Config";
import { getUserProfile } from "../../Utils/MSUtils";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ต๋าวงายยยย
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(22),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ onAuthenticated }: any) {
  const classes = useStyles();
  // const ua = window.navigator.userAgent;
  // const msie = ua.indexOf("MSIE ");
  // const msie11 = ua.indexOf("Trident/");
  // const isIE = msie > 0 || msie11 > 0;
  // const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const userAgentApplication = new UserAgentApplication({
    auth: {
      clientId: config.clientId,
      redirectUri: config.redirectUri,
      authority:config.authority
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true,
    },
  });

  // const toggle = () => {
  //   setIsOpen(true);
  // };

  const login = async () => {
    try {
      console.log(config);

      await userAgentApplication.loginPopup({
        scopes: config.scopes,
        prompt: "select_account",
      });

      const user = await getUserProfile(userAgentApplication, config.scopes);
console.log("userWith Azure=>",user);

      // setIsAuthenticated(true);
      setUser({
        displayName: user.displayName,
        email: user.mail || user.userPrincipalName,
      }); 
      // localStorage.setItem(user,user)
      setError(null);
    } catch (err) {
      console.log(err.message);

      // setIsAuthenticated(false);
      setUser({});
      setError(err.message);
    }
  };

  // const logout = () => {
  //   userAgentApplication.logout();
  // };

  // Azure client context
  // const authenticationModule: AzureAuthenticationContext =
  //   new AzureAuthenticationContext();

  // const [authenticated, setAuthenticated] = useState<Boolean>(false);
  // const [user, setUser] = useState<AccountInfo>();

  // const logIn = (method: string): any => {
  //   const typeName = "loginPopup";
  //   const logInType = isIE ? "loginRedirect" : typeName;

  //   // Azure Login
  //   authenticationModule.login(logInType, returnedAccountInfo);
  // };

  const logOut = (): any => {
    if (user) {
      onAuthenticated(undefined);
      // Azure Logout
      // authenticationModule.logout(user);
    }
  };

  // const returnedAccountInfo = (user: AccountInfo) => {
  //   // set state
  //   setAuthenticated(user?.name ? true : false);
  //   onAuthenticated(user);
  //   setUser(user);
  // };

  // const showLogInButton = (): any => {
  //   return (
      // <Button
      //   type="submit"
      //   fullWidth
      //   variant="contained"
      //   color="primary"
      //   className={classes.submit}
      //   onClick={() => logIn()}
      // >
      //   Sign In With Azure
      // </Button>
      // <></>ไ
  //   );
  // };

  // const showLogOutButton = (): any => {
  //   return (
  //     <div id="authenticationButtonDiv">
  //       <div id="authentication">
  //         <button id="authenticationButton" onClick={() => logOut()}>
  //           Log out
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  // const showButton = (): any => {
  //   return authenticated ? showLogOutButton() : showLogInButton();
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.large} src={loginIMG}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "2%",
            borderRadius: "20px",
          }}
          className={classes.form}
        >
          <img src={microsoftLogo} alt="" width="120px" className="center" />
          {/* {authenticationModule.isAuthenticationConfigured ? (
            showButton()
          ) : (
            <div>Authentication Client ID is not configured.</div>
          )} */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => login()}
          >
            Sign In With Azure
          </Button>
          {error && (
            <h2 style={{color:"red"}}>{error}</h2>
          )}
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
