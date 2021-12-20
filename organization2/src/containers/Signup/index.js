import React,{useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";
import { Navigate } from "react-router-dom";
import "./style.css";
const Signup = (props) => {
    const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [selType, setSelType] = useState("");
  const [address, setAddress] = useState("");
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  if (auth.authenticate) {
    return <Navigate to={"/"} />;
  }

  if (user.loading) {
    return <p>Loading...</p>;
  }

  const userSignup = (e) => {
    e.preventDefault();
    const user = { name, selType, address, email, password };
    dispatch(signup(user));
  };
    return (
        <div>
            <section>
        <div class="contentbx">
            <div class="formbx">
                <h2>Organization Sign Up </h2>
                {/* <form onSubmit={{userSignup}}> */}
                    <div class="inputbx">
                        <span>Organization name</span>
                        <input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>Organization Sector</span>
                        <select value={selType} onChange={(e) => setSelType(e.target.value)} >
                          <option>Automobiles</option>
                          <option>Mining</option>
                          <option>Electricity</option>
                          <option>Chemical</option>
                        </select>
                    </div>
                    <div class="inputbx">
                        <span>Oraganization Address</span>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>Email Address</span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>Password</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>Confirm Password</span>
                        <input type="password"/>
                    </div> 
                    <div class="inputbx">
                        <input type="submit" value="Register"name="" onClick={userSignup}/>
                        
                    </div>
                {/* </form> */}
            </div>
        </div>
    </section>
            </div>
    )
}

export default Signup;
