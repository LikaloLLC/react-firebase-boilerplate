import React from 'react';
import { withAuthorization, AuthUserContext } from '../Session';


const HomePage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
    <div>
        <h1>Account: {authUser.email}</h1>
        <h1>Home Page</h1>
    </div>)}
    </AuthUserContext.Consumer>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);