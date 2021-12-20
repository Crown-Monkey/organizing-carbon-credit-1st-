import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {useEffect} from "react";
import Signup from './containers/Signup';
import OrgHome from './containers/OrgHome';
import OrgForm from './containers/OrgForm';
import OrgTrans from './containers/OrgTrans';
import Signin from './containers/Signin';
import { connectNodes, getCreditData, getOrgTrans, isUserLoggedIn} from "./actions";

import { useDispatch, useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch();
const auth = useSelector(state => state.auth);

useEffect(() => {
  if(!auth.authenticate){
  dispatch(isUserLoggedIn());
}
if(auth.authenticate){
  dispatch(connectNodes());
  dispatch(getCreditData());
  const idString = auth.user._id;
  const lastidString = idString.slice(-5);
  const o_id = {
    "org_id": auth.user._id
  }
  dispatch(getOrgTrans(o_id));
}



}, [auth.authenticate]);
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" exact element={<OrgHome/>}/>
      <Route path="/signup" exact element={<Signup/>}/>
      <Route path="/signin" exact element={<Signin/>}/>
      <Route path="/orgform" exact element={<OrgForm/>}/>
      <Route path="/orgtrans" exact element={<OrgTrans/>}/>


    </Routes>
    {/* <Signin/> */}
    {/* <Signup/> */}
    {/* <OrgHome/> */}
    {/* <OrgForm/> */}
    {/* <OrgTrans/> */}

    </>
  );
}

export default App;
