import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

const SignUpPage = props => {
    const context = useContext(AuthContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [registered, setRegistered] = useState(false);

    const register = () => {

        let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        //const validPassword = passwordRegEx.test(password);

        if (password === passwordAgain) {
            console.log(password)
            context.register(userName, password);
            setRegistered(true);

        }
    }

    if (registered === true) {
        return <Navigate to="movies/favorites" />;
    }

    return (
        <>
            <h2>SignUp page</h2>
            <p>You must register a username and password to log in </p>
            <input value={userName} placeholder="user name" onChange={e => {
                setUserName(e.target.value);
            }}></input><br />
            <input value={password} type="password" placeholder="password" onChange={e => {
                setPassword(e.target.value);
            }}></input><br />
            <input value={passwordAgain} type="password" placeholder="password again" onChange={e => {
                setPasswordAgain(e.target.value);
            }}></input><br />
            {/* Login web form  */}
            <button onClick={register}>Register</button>
        </>
    );
};

export default SignUpPage;