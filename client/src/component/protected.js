import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
const ProtectedRoutes = ({ component, ...some }) => {
    const Reactcomponent = component;
    const cookies = new Cookies();
    const hastoken = cookies.get('session_maintance');
    console.log({ component, some, hastoken })
    return (
        <Route
            {...some}
            render={props => {
                return hastoken ? (
                    <Reactcomponent {...props} />
                ) : (
                        <Redirect
                            to={{ pathname: '/signin' }}
                        />
                    )
            }}
        />
    )
}

export default ProtectedRoutes;