import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Login from "./Login";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = localStorage.getItem("token");
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login'}} component={Login}/>
                )
            }
        />
    )
}

export default PrivateRoute