import React, {useEffect} from 'react';
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { searchOrg } from '../../actions';
import { Navigate } from "react-router-dom";


const VetorgTrans = () => {
    const dispatch = useDispatch();
    const block = useSelector((state) => state.blockchain);
    const auth = useSelector((state) => state.auth);
    // useEffect(()=>{
    //     console.log(auth.user._id);
    //     const o_id = {
    //         "org_id": (auth.user._id).slice(-5)
    //       } 
    //       dispatch(searchOrg(o_id));
    // },[]);
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
            <th>Credit Used</th>
            <th>Available Credit</th>
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
            {renderTransDetails()}
            {/* <table>
        <tr id="header">
            <th>Date</th>
            <th>CO2</th>
            <th>N2O</th>
            <th>CH4</th>
            <th>HFC</th>
            <th>PFC</th>
            <th>SF6</th>
            <th>Credits Used</th>
            <th>Available Credits</th>
        </tr>
        <tr>
            <td>2021-12-14</td>
            <td>786</td>
            <td>66</td>
            <td>90</td>
            <td>56</td>
            <td>34</td>
            <td>0/.445</td>
            <td>198</td>
            <td>1876</td>
        </tr>
        <tr>
            <td>2021-11-13 </td>
            <td> 676</td>
            <td> 76</td>
            <td>56 </td>
            <td>98 </td>
            <td>0.65</td>
            <td>0.567</td>
            <td>156</td>
            <td>1798</td>
        </tr>
        <tr>
            <td>2021-8-4</td>
            <td>564</td>
            <td>78</td>
            <td> 56</td>
            <td> 45</td>
            <td>0.69</td>
            <td>0.56</td>
            <td>234</td>
            <td>1675
            </td>
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
        </div>
    );
}

export default VetorgTrans;
