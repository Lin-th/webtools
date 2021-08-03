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
  </>);
}


export default App;
