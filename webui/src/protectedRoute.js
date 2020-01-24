import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthIsAuthenticated from './authentication-service/isAuthenticated'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (AuthIsAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/login" />
                }
            }}
        />
    )
}

export default ProtectedRoute;