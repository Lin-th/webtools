import React from 'react';
import './App.scss';
import HomePage from "../Containers/HomePage/HomePage";
import {
  BrowserRouter as Router
} from "react-router-dom";

const App: React.FC = (props) => {
  return (<>
    <Router basename="/comm-ui">
          <HomePage />
    </Router>
    {/* <hr /> */}
    {/* <div>BUILD#: {env.REACT_APP_BUILD_NUM}</div>
    <div>env.ts: {JSON.stringify(env)}</div> */}
  </>);
}


export default App;
