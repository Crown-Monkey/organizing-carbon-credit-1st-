import React, { useEffect } from 'react';
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrgTrans } from '../../actions';
import { Navigate } from "react-router-dom";

const OrgTrans = () => {
    const dispatch = useDispatch();
    const block = useSelector((state) => state.blockchain);
    const auth = useSelector((state) => state.auth);
    useEffect(()=>{
        console.log(auth.user._id);
        const o_id = {
            "org_id": auth.user._id
          } 
          dispatch(getOrgTrans(o_id));
    },[]);
    if (!auth.authenticate) {
        return <Navigate to={"/signin"} />;
      }
    const renderTransDetails = () => {
        return(
            <table>
            <tr id="header">
            <th>S.no</th>
            <th>Date</th>
            <th>CO2(kg)</th>
            <th>N2O(kg)</th>
            <th>CH4(kg)</th>
            <th>HFC(kg)</th>
            <th>PFC(kg)</th>
            <th>SF6(kg)</th>
            <th>Credit Used(cc)</th>
            <th>Available Credit(cc)</th>
        </tr>
        {block.transactions.length > 0 ? block.transactions.map((details, index)=>(
            <tr>
            <td>{index+1}</td>
            <td>{details.date}</td>
            <td>{details.c02}</td>
            <td>{details.ch4}</td>
            <td>{details.n20}</td>
            <td>{details.hfc}</td>
            <td>{details.pfc}</td>
            <td>{details.sf6}</td>
            <td>{details.calculated_credit}</td>
            <td>{details.available_credit}</td>
        </tr>
        )): null}
        {/* <tr>
        <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr> */}
        </table>
        )
    }
    return (
        <div>
            {/* <table>
        <tr id="header">
            <th>Date</th>
            <th>Co2</th>
            <th>N2o</th>
            <th>CH4</th>
            <th>hfc</th>
            <th>pfc</th>
            <th>sf6</th>
            <th>Credit Used</th>
            <th>Available Credit</th>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td> </td>
            <td> </td>
            <td></td>
        </tr>
        <tr>
            <td> </td>
            <td> </td>
            <td> </td>
            <td></td>
            <td> </td>
            <td></td>
        </tr>
        <tr>
            <td> </td>
            <td> </td>
            <td></td>
            <td></td>
            <td> </td>
            <td></td>
        </tr>
        <tr>
            <td> </td>
            <td></td>
            <td></td>
            <td></td>
            <td> </td>
            <td></td>
        </tr>
        <tr>
            <td> </td>
            <td></td>
            <td></td>
            <td></td>
            <td> </td>
            <td></td>
        </tr>

    </table> */}
    {renderTransDetails()}
        </div>
    )
}

export default OrgTrans;
