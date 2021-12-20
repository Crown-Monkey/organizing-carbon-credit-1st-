import React, { useState } from 'react';
import { addVote, mineBlock, replaceChain } from "../../actions";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { addData } from '../../actions';
const OrgForm = () => {
    const [co2, setCo2] = useState("");
    const [ch4, setCh4] = useState("");
    const [n2o, setN2o] = useState("");
    const [hfc, setHfc] = useState("");
    const [pfc, setPfc] = useState("");
    const [sf6, setSf6] = useState("");
    const [date, setDate] = useState("");

    const auth = useSelector(state => state.auth);
  const block = useSelector(state => state.blockchain);

  const dispatch = useDispatch();

 if (!auth.authenticate){
  return <Navigate to={"/signin"} />;
 }

 const addDataa = (e) => {
     e.preventDefault();
     const dataInfo = {
         "org_id": auth.user._id,
          co2,
          ch4,
          n2o,
          hfc,
          pfc,
          sf6,
          date
     }
     dispatch(replaceChain()).then((result) => {
        if (result){
          dispatch(addData(dataInfo)).then((resul) => {
            if(resul){
              dispatch(mineBlock());
            }
          })
        }
      })
    // dispatch(addData(dataInfo));
 }
    return (
        <div>
            <section>
            <div class="contentbx">
            <div class="formbx">
                <h2>Org Form</h2>
                
                    <div class="inputbx">
                        <span>CO2 Emission(kg)</span>
                        <input type="text" value={co2} onChange={(e) => setCo2(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>CH4 Emission(kg)</span>
                        <input type="text" value={ch4} onChange={(e) => setCh4(e.target.value)} />
                    </div>
                    <div class="inputbx">
                        <span>N2O Emission(kg)</span>
                        <input type="text" value={n2o} onChange={(e) => setN2o(e.target.value)} />
                    </div>
                    <div class="inputbx">
                        <span>HFC Emission(kg)</span>
                        <input type="text" value={hfc} onChange={(e) => setHfc(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>PFC Emission(kg)</span>
                        <input type="text" value={pfc} onChange={(e) => setPfc(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>SF6 Emission(kg)</span>
                        <input type="text" value={sf6} onChange={(e) => setSf6(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>Date</span>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <input type="submit" value="ADD"name="" onClick={addDataa}/>
                    </div>
                
            </div>
        </div>
        </section>
        </div>
    )
}

export default OrgForm;
