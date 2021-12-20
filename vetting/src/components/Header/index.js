import React from 'react';
import "./style.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signout } from '../../actions/auth';
const Header = (props) => {
    const auth = useSelector(state=> state.auth);
   const dispatch = useDispatch();
   const logout =()=>{
     dispatch(signout());
   }
    const forLoggedInUser = () => {
        return(
            <header>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {/* <li><Link to="/orgtrans">Transactions</Link></li> */}
                {/* <li><a href="login/signup.html">Signout</a></li> */}
                <li><span onClick={logout}>Signout</span></li>
               </ul>
               </nav>
    </header>
        );
    }

    const forNonLoggedInUser = () =>{
        return(
            <header>
        <nav>
            <ul>
                <li><Link to="/signin">SignIn</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                
               </ul>
               </nav>
    </header>
        );
    }
    return (
        <div>
            {/* <header>
        <nav>
            <ul>
                <li><a href="home.html">Home</a></li>
                <li><a href="orgform.html">Form</a></li>
                <li><a href="orgtrans.html">OTC</a></li>
                <li><a href="login/signup.html">Signout</a></li>
               </ul>
               </nav>
    </header> */}
        {auth.authenticate ? forLoggedInUser() : forNonLoggedInUser()}

        </div>
    )
}

export default Header;
