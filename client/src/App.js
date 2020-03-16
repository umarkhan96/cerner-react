import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Home from "./pages/home/Home";
import Launcher from "./pages/launcher/launcher";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
  <Router>

         <Switch>
             <Route path={"/app"} component={Home} />
             <Route path={"/"} component={Launcher} />

         </Switch>

  </Router>
  );
}

export default App;
