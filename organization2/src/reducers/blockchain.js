import { addDATAConstants, connectNodeConstants, getCreditConstants, getOrgTransConstants, mineBlockConstants, replaceChainConstants } from "../actions/constants";

const initState = {
    
    loading: false,
    error: "",
    message: "",
    total_nodes: [],
    index: null,
    timestamp: "",
    proof: null,
    data: [],
    alloted_credit: "",
    credit_used: "",
    available_credit: "",
    previous_hash: "",
    transactions: ""

};

export default (state = initState, action) => {
    switch(action.type) {
        case addDATAConstants.ADD_DATA_REQUEST:
            state = {
                ...state,
                loading: true
            };
            break;

        case addDATAConstants.ADD_DATA_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message

            };
            break;
        
        case addDATAConstants.ADD_DATA_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        case connectNodeConstants.CONNECT_NODES_REQUEST:
            state = {
                ...state,
                loading: true

            }
            break;

        case connectNodeConstants.CONNECT_NODES_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                total_nodes: action.payload.total_nodes

            }
            break;

        case connectNodeConstants.CONNECT_NODES_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error

            }
            break;

        case mineBlockConstants.MINE_BLOCK_REQUEST:
            state = {
                ...state,
                loading: true
                
            }
            break;

        case mineBlockConstants.MINE_BLOCK_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                index: action.payload.index,
                timestamp: action.payload.timestamp,
                proof: action.payload.proof,
                previous_hash: action.payload.previous_hash,
                data: action.payload.data


            }
            break;

        case mineBlockConstants.MINE_BLOCK_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        case replaceChainConstants.REPLACE_CHAIN_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        
        case replaceChainConstants.REPLACE_CHAIN_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;

        case replaceChainConstants.REPLACE_CHAIN_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        case getCreditConstants.GET_CREDIT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        
        case getCreditConstants.GET_CREDIT_SUCCESS:
            state = {
                ...state,
                loading: false,
                alloted_credit: action.payload.alloted_credit,
                credit_used: action.payload.credit_used,
                available_credit: action.payload.available_credit,
                
            }
            break;
        
        case getCreditConstants.GET_CREDIT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error


            }
            break;

        case getOrgTransConstants.GET_ORGTRANS_REQUEST:
            state = {
                ...state,
                loading: true

            }
            break;

        case getOrgTransConstants.GET_ORGTRANS_SUCCESS:
            state = {
                ...state,
                loading: false,
                transactions: action.payload.transactions
            }
            break;

        case getOrgTransConstants.GET_ORGTRANS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        
        
    }
    return state;
}