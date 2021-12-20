import axios from "axios";
import { addDATAConstants, connectNodeConstants, getCreditConstants, getOrgTransConstants, mineBlockConstants, replaceChainConstants } from "./constants";

export const addData = (dataInfo) => {
    console.log(dataInfo);
    return async (dispatch) => {
        dispatch({type: addDATAConstants.ADD_DATA_REQUEST});
        const res = await axios.post("http://127.0.0.1:2708/add_data", {
            ...dataInfo,
        });
        console.log(res);
        if(res.status === 201){
            const {message} = res.data;
            dispatch({
                type: addDATAConstants.ADD_DATA_SUCCESS,
                payload: {
                    message
                },
            });
            return true;
        }else {
            dispatch({
                type: addDATAConstants.ADD_DATA_FAILURE,
                payload: {
                    error: "Something wrong happened while adding! Try Again..."
                },
            });
            return false;
        }
    }
}

export const connectNodes = () => {
    return async (dispatch) => {
        dispatch({type: connectNodeConstants.CONNECT_NODES_REQUEST});
        const res = await axios.post("http://127.0.0.1:2708/connect_node");
        if (res.status === 201){
            const {message, total_nodes} = res.data
            dispatch({
                type: connectNodeConstants.CONNECT_NODES_SUCCESS,
                payload: {
                    message,
                    total_nodes

                }
            });
        }else {
            dispatch({type: connectNodeConstants.CONNECT_NODES_FAILURE,
                        payload: {
                            error: "Something Wrong happened while connecting!"
                        },
                    });
        }
    }
}

export const mineBlock = () => {
    return async (dispatch) => {
        dispatch({type: mineBlockConstants.MINE_BLOCK_REQUEST});
        const res = await axios.get("http://127.0.0.1:2708/mine_block");
        if(res.status === 200){
            console.log(res);
            const {message, index, timestamp, proof, previous_hash, data } = res.data;
            dispatch({type: mineBlockConstants.MINE_BLOCK_SUCCESS,
                        payload: {
                            message,
                            index,
                            timestamp,
                            proof,
                            previous_hash,
                            data
                        }
                    });
                    return true;
        } else { 
            dispatch({type: mineBlockConstants.MINE_BLOCK_FAILURE,
                        payload: {error: "Something went wrong in mining!"}});
        }



    }
}

export const replaceChain = () => {
    return async (dispatch) => {
        dispatch({type: replaceChainConstants.REPLACE_CHAIN_REQUEST});
        const res = await axios.get("http://127.0.0.1:2708/replace_chain");
        if(res.status === 200){
            dispatch({type: replaceChainConstants.REPLACE_CHAIN_SUCCESS,
                        payload: {
                            message: res.data.message
                        }
                    });
                    return true;
        } else {
            dispatch({type: replaceChainConstants.REPLACE_CHAIN_FAILURE,
                        payload: {error: "Something wrong happened while replacing!"}
                    });
                    return false;
        }
    }
}

export const getCreditData = () => {
    return async (dispatch) => {
        dispatch({type: getCreditConstants.GET_CREDIT_REQUEST});
        const res = await axios.get("http://127.0.0.1:2708/get_creditData")
        const {alloted_credit, credit_used, available_credit} = res.data;
        if(res.status === 200){
            dispatch({type: getCreditConstants.GET_CREDIT_SUCCESS,
                        payload: {
                            alloted_credit,
                            credit_used,
                            available_credit
                        }});
                        return true;
        }
        else{
            dispatch({type: getCreditConstants.GET_CREDIT_FAILURE,
                        payload:{error: "Something went wrong!"}})
        }
    }
}

export const getOrgTrans = (transactions) => {
    console.log(transactions);
    return async (dispatch) => {
        dispatch({type: getOrgTransConstants.GET_ORGTRANS_REQUEST});
        const res = await axios.post("http://127.0.0.1:2708/get_orgTrans",{
            ...transactions,
        } );
        console.log(res);
        if(res.status === 201){
            const {transactions} = res.data;
            dispatch({
                type: getOrgTransConstants.GET_ORGTRANS_SUCCESS,
                payload: {
                    transactions
                },
            });
            return true;
        } 
        else{
            dispatch({
                type: getOrgTransConstants.GET_ORGTRANS_FAILURE,
                payload: {
                    error: "Something went wrong!"
                },
            });
            return false;
        }
    }
}