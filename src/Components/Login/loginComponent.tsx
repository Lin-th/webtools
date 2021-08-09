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
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import loginIMG from "../../Assets/Images/login.png";
import microsoftLogo from "../../Assets/Images/microsoftLogo.png";
import { login, logout } from "../../Redux/Actions/AuthAction";




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



function SignIn(props) {
  const classes = useStyles();
  // const ua = window.navigator.userAgent;
  // const msie = ua.indexOf("MSIE ");
  // const msie11 = ua.indexOf("Trident/");
  // const isIE = msie > 0 || msie11 > 0;
  // const [isOpen, setIsOpen] = useState(false);
  // const [error, setError] = useState("");
  const history = useHistory();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState({});
  const  { instance} = useMsal();

  useEffect(()=>{
      
    if(props.loggedIn){
      history.push("/report");
    }else{
      // history.push("/");
    }
  })

  const handleLogin =async (instance)=> {
   props.login(instance)
  //   instance.loginPopup(authenticationParameters)
  // .then((e)=>{
  //   myStorage.setItem("user",JSON.stringify(e));
  // })

}


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.large} src={loginIMG}>
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
          {/* {error && (
            <h2 style={{color:"red"}}>{error}</h2>
          )} */}
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = function(state) {
  return {
    loggedIn: state.authState.isLoggedIn
  }
}

export default connect(mapStateToProps,{login,logout})(SignIn);
