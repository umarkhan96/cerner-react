import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom'


const PrivateRoute = ({ component: Component, authed, ...rest }) => (

    <Route {...rest} render={props => {

        if (authed.isAuthenticated) {
            // authorised so return component
            return <Component {...props} />

        }
        // not logged in so redirect to login page with the return url
        return <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />

    }} />
)




export default PrivateRoute