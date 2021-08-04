import React from 'react';
import './App.scss';
import HomePage from "../Containers/HomePage/HomePage";
import {
  BrowserRouter as Router
} from "react-router-dom";


const App: React.FC = (props) => {
  return (<>
    <Router basename={process.env.REACT_APP_BASE_NAME}>
          <HomePage />
    </Router>
  </>);
}


export default App;
