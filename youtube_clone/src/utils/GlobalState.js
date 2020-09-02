import React, { createContext, useReducer, useContext } from "react";
const CountContext = createContext();
const { Provider } = CountContext;

const reducer = (state, action) => {
    switch (action.type) {
        case "open":
            return {
                ...state,
                status: true,
            }
        case "close":
            return {
                ...state,
                status: false,
            }
        case "clientLoaded":
            return {
                ...state,
                clientLoaded: true,
            }
        case "search":
            return {
                ...state,
                searchTerm: action.searchTerm,
            }
        case "result":
            return {
                ...state,
                hasResult:true,
                result: action.result,
            }
        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
};

const CountProvider = ({ value = 0, ...props }) => {
    const [state, dispatch] = useReducer(
        reducer, {
        status: false,
        clientLoaded: false,
        searchTerm: '',
        result:[],
        hasResult:false,

    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useCountContext = () => {
    return useContext(CountContext);
};

export { CountProvider, useCountContext };
