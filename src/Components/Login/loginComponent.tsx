import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import loginIMG from "../../Assets/Images/login.png";
import microsoftLogo from "../../Assets/Images/microsoftLogo.png";

import AzureAuthenticationContext from "../../Utils/azure/authContext";
import { AccountInfo } from "@azure/msal-browser";

import { UserAgentApplication } from "msal";
import { config } from "../../Utils/azure/Config";
import { normalizeError, getUserProfile } from "../../Utils/MSUtils";

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
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");
  const msie11 = ua.indexOf("Trident/");
  const isIE = msie > 0 || msie11 > 0;
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const userAgentApplication = new UserAgentApplication({
    auth: {
      clientId: config.clientId,
      redirectUri: config.redirectUri,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true,
    },
  });

  const toggle = () => {
    setIsOpen(true);
  };

  const login = async () => {
    try {
      console.log(config);

      await userAgentApplication.loginPopup({
        scopes: config.scopes,
        prompt: "select_account",
      });

      const user = await getUserProfile(userAgentApplication, config.scopes);

      setIsAuthenticated(true);
      setUser({
        displayName: user.displayName,
        email: user.mail || user.userPrincipalName,
      });
      setError(null);
    } catch (err) {
      console.log(err);

      setIsAuthenticated(false);
      setUser({});
      setError(normalizeError(err));
    }
  };

  const logout = () => {
    userAgentApplication.logout();
  };

  // Azure client context
  const authenticationModule: AzureAuthenticationContext =
    new AzureAuthenticationContext();

  const [authenticated, setAuthenticated] = useState<Boolean>(false);
  // const [user, setUser] = useState<AccountInfo>();

  const logIn = (method: string): any => {
    const typeName = "loginPopup";
    const logInType = isIE ? "loginRedirect" : typeName;

    // Azure Login
    authenticationModule.login(logInType, returnedAccountInfo);
  };

  const logOut = (): any => {
    if (user) {
      onAuthenticated(undefined);
      // Azure Logout
      // authenticationModule.logout(user);
    }
  };

  const returnedAccountInfo = (user: AccountInfo) => {
    // set state
    setAuthenticated(user?.name ? true : false);
    onAuthenticated(user);
    setUser(user);
  };

  const showLogInButton = (): any => {
    return (
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
      <></>
    );
  };

  const showLogOutButton = (): any => {
    return (
      <div id="authenticationButtonDiv">
        <div id="authentication">
          <button id="authenticationButton" onClick={() => logOut()}>
            Log out
          </button>
        </div>
      </div>
    );
  };

  const showButton = (): any => {
    return authenticated ? showLogOutButton() : showLogInButton();
  };

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
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
