import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {useEffect} from "react";
import Signup from './containers/Signup';
import Home from './containers/Home';
import VetorgTrans from './containers/VetorgTrans';

import Signin from './containers/Signin';
import { connectNodes, isUserLoggedIn} from "./actions";

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
  
}



}, [auth.authenticate]);
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/signup" exact element={<Signup/>}/>
      <Route path="/signin" exact element={<Signin/>}/>
      <Route path="/vetorgtrans" exact element={<VetorgTrans/>}/>
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
