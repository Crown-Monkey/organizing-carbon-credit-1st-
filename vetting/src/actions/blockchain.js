import axios from "axios";
import { replaceChainConstants, connectNodeConstants, searchOrgConstants } from "./constants";


export const searchOrg = (orgId) => {
    return async (dispatch) => {
        dispatch({type: searchOrgConstants.SEARCH_ORG_REQUEST});
        const res = await axios.post("http://127.0.0.1:2709/get_orgTrans", {
            ...orgId
        });
        console.log(res);
        if(res.status == 201){
            const {transactions} = res.data;
            dispatch({
                type: searchOrgConstants.SEARCH_ORG_SUCCESS,
                payload: {
                    transactions
                },
            });
            return true;
        }
        else{
            dispatch({
                type: searchOrgConstants.SEARCH_ORG_FAILURE,
                payload: {
                    error: "Something wrong happened!"
                },
            });
            return false;
        }
        }
    }



export const connectNodes = () => {
    return async (dispatch) => {
        dispatch({type: connectNodeConstants.CONNECT_NODES_REQUEST});
        const res = await axios.post("http://127.0.0.1:2709/connect_node");
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

export const replaceChain = () => {
    return async (dispatch) => {
        dispatch({type: replaceChainConstants.REPLACE_CHAIN_REQUEST});
        const res = await axios.get("http://127.0.0.1:2709/replace_chain");
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