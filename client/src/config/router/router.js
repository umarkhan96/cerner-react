import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from "./protectedRoute"
import {connect} from 'react-redux'

// Importing Screens

import Signin from '../../screens/auth/signin'
import Signup from '../../screens/auth/signup'
import Home from '../../screens/home/home'
import HomeOld from '../../pages/home/Home';
import Report from '../../screens/home/report'
import Launcher from "../../pages/launcher/launcher";

const Routes = React.memo((props) => (
    <Router>
      <div>
        <Route exact path="/" component={Signin} />
        <Route path="/login" component={Signin} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute exact path="/home" component={Home} authed={{isAuthenticated: props.user}} />
        <PrivateRoute exact path="/data" component={Report} authed={{isAuthenticated: props.user}} />
          <PrivateRoute exact path="/app" component={HomeOld} authed={{isAuthenticated: props.user}} />
        <PrivateRoute exact path="/launch" component={Launcher} authed={{isAuthenticated: props.user}} />

      </div>
    </Router>
));

const mapStateToProps = state => {
  return {
      user: state.user,
  }
}

export default connect(mapStateToProps, null )(Routes);
