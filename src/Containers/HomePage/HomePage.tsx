import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dashboard from "../../Components/DashBoard/dashboard";
import homeAction from "../../Redux/Actions/HomeAction";
import { msalConfig } from "../../Utils/azure/authProvider";
import { LoginPage } from "../Login/login";

const msalInstance = new PublicClientApplication(msalConfig);

const myStorage = window.localStorage;

const HomePage: React.FC<any> = (props) => {
  return (
    <div id="home-page">
      {/* <LoaderComponent /> */}
      {/* <Dashboard/> */}
      <MsalProvider instance={msalInstance}>
        {myStorage.getItem("user") ? <Dashboard /> : <LoginPage />}
      </MsalProvider>

      {/* <h1>{props.greeting}</h1> */}
      {/* <button type="button" onClick={(e)=>props.init()} >Click Me</button> */}
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => ({
  ...state.homeState,
});

export default withRouter(
  connect(mapStateToProps, { ...homeAction })(HomePage)
);
