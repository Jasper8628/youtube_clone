import React, { createContext, useReducer, useContext } from "react";
const CountContext = createContext();
const { Provider } = CountContext;

const reducer = (state, action) => {
    switch (action.type) {
        //using "open" and "openRight" globally to control content body's width in response to menu sidebars
        case "open":
            return {
                ...state,
                status: !state.status,
            }
        case "openRight":
            return {
                ...state,
                openRight: !state.openRight,
            }
        //if false,google auth will trigger
        case "clientLoaded":
            return {
                ...state,
                clientLoaded: true,
            }
        case "login":
            return {
                ...state,
                isAuthenticated: true,
                username:action.username,
            }
        case "logout":
            return {
                ...state,
                isAuthenticated: false,
            }
        case "search":
            return {
                ...state,
                searchTerm: action.searchTerm,
            }
        //api response passed by search button to prop video display components
        case "result":
            return {
                ...state,
                hasResult: true,
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
        result: [],
        hasResult: false,
        isAuthenticated: false,
        username:'',

    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useCountContext = () => {
    return useContext(CountContext);
};

export { CountProvider, useCountContext };
