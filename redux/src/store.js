import {applyMiddleware, combineReducers, createStore} from "redux";
import accountReducer from "./features/accounts/accountSlice.js";
import customerReducer from "./features/customers/customerSlice.js";
import {thunk} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    }
})
