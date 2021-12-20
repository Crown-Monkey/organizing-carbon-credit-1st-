import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';


import "./style.css";
import { Navigate } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
import { connectNodes, replaceChain, searchOrg } from '../../actions';
const Home = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [organId, setOrganId] = useState("");
    const history = useNavigate();

    const block = useSelector((state) => state.blockchain);
    if (!auth.authenticate) {
        return <Navigate to={"/signin"} />;
      }

     const searchOrgg = (e) => {
        //  e.preventDefault();
         const organization_id = {
             "org_id": organId
         }
         dispatch(replaceChain()).then((result) => {
             if(result){
                 dispatch(searchOrg(organization_id)).then((resul) => {
                     if(resul){
                        //  dispatch(connectNodes());
                         console.log("sucessss");
                        // <Navigate to={"/vetorgtrans"}/>;
                        history("/vetorgtrans");
                     }
                 })
             }
         })

     } 
    return (
        <div>
            <div class="vetname">
    <h2>{auth.user.name}</h2>
  
  </div>

    <section>
        <div class="contentbx">
            <div class="formbx">
               
                
               
                    <div class="inputbx">
                        <span>Enter the Organization Id</span>
                        <input type="text" value={organId} onChange={(e) => setOrganId(e.target.value)}/>
                    </div>
                  
                    <div class="inputbx">
                        <input type="submit" value="SEARCH"name="" onClick={searchOrgg}/>
                    </div>
                
            </div>
        </div>


    </section>
        </div>
    )
}

export default Home;
