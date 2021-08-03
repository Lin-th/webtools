// import { AccountInfo } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import loginIMG from "../../Assets/Images/login.png";
import microsoftLogo from "../../Assets/Images/microsoftLogo.png";
import authProvider, { authenticationParameters } from "../../Utils/azure/authProvider";
import Dashboard from "../DashBoard/dashboard";

const myStorage = window.localStorage;

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
  const history = useHistory();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const  { instance, inProgress, accounts } = useMsal();
  // const  loginRedirect = () =>{
  //   _.debounce(() => {
  //     authProvider.login(authenticationParameters)
  //   }, 450)
  // }

  useEffect(()=>{
    if (myStorage.getItem("user")) {
      history.push("/report");
    }
  })

  const logout = () => {
    authProvider.logout()
  }

  const handleLogin =async (instance)=> {
    instance.loginPopup(authenticationParameters)
  .then((e)=>{
    myStorage.setItem("user",JSON.stringify(e));
  })

}




  
  const renderAuthenticated = ({login, logout, authenticationState, error, accountInfo}) => {
    console.log(login, logout, authenticationState, error, accountInfo);
    return <Dashboard/>
    
  }

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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleLogin(instance)}
          >
            Sign In With Azure
          </Button>
          {error && (
            <h2 style={{color:"red"}}>{error}</h2>
          )}
        </div>
        {/* <AzureAD provider={authProvider} forceLogin={true}>
          {renderAuthenticated}
        </AzureAD> */}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
