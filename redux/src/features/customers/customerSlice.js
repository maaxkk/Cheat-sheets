import {combineReducers, createStore} from 'redux';
import {createSlice} from "@reduxjs/toolkit";


const customerInitialState = {
    fullName: '',
    customerId: '',
    createdAt: '',
}

const customerSlice = createSlice({
    name: 'customer',
    initialState: customerInitialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalId) {
                return {
                    payload: {fullName, nationalId}
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalId = action.payload.nationalId;
            },
        },
        updateName(state, action) {
            state.fullName = action.payload.fullName;
        }
}})

export const {createCustomer, updateName} = customerSlice.actions;

export default customerSlice.reducer;

// export default function customerReducer(state=customerInitialState, action) {
//     switch (action.type) {
//         case 'customer/createCustomer':
//             return {fullName: action.payload.fullName, nationalId: action.payload.nationalId,
//                 createdAt: action.payload.createdAt};
//         case 'customer/updateName':
//             return {...state, fullName: action.payload.fullName}
//         default:
//             return state;
//     }
// }
//
// export function createCustomer(fullName, nationalId) {
//     return {type: 'customer/createCustomer', payload: {fullName, nationalId, createdAt: Date.now()}}
// }
//
// export function updateName(fullName) {
//     return {type: 'customer/updateName', payload: fullName}
// }
