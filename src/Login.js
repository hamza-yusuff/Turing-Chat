import React from 'react';
import './Login.css';
import {Button} from "@material-ui/core";
import Logo from './assets/Logo.gif';
import { auth, provider } from './firebase';
import {actionTypes} from './reducer';
import {useStateValue} from './StateProvider';


//"https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = ()=>{
        auth.signInWithPopup(provider).then(
            (result)=>{
                dispatch({
                    type:actionTypes.SET_USER,
                    user: result.user,
                });
            }
        ).catch((error)=>alert(error.message))
    };

    return (
        <div className="login">
            <div className = "loginContainer">
                <img src={Logo}
                alt=""/>
                <div className="loginText">
                    <h1>Turing</h1>
                </div>
                <Button type="button" onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
}

export default Login;