import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loanPurpose: '',
    loan: '',
    isLoading: false,
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {amount, purpose}
                }
            },

            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            }

        },
        payLoan(state) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = '';
        },
        converting(state) {
            state.isLoading = true;
        }
    }
})

export function deposit(amount, currency) {
    if (currency === 'USD') return {type: 'account/deposit', payload: amount}
    return async function fetchCurrency(dispatch, getState) {
        dispatch({type: 'account/converting'})
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await response.json();
        const convertedAmount = data.rates.USD

        dispatch({type: 'account/deposit', payload: convertedAmount})
    }
}

export const {withdraw, requestLoan, payLoan} = accountSlice.actions;

export default accountSlice.reducer;

// old redux way
// export default function accountReducer(state=initialState, action) {
//     switch (action.type) {
//         case 'account/deposit':
//             return {...state, balance: state.balance + action.payload, isLoading: false};
//         case 'account/withdraw':
//             return {...state, balance: state.balance - action.payload};
//         case 'account/requestLoan':
//             if (state.loan > 0) return state;
//             return {...state,
//                 loan: action.payload.amount,
//                 balance: action.payload.amount + state.balance,
//                 loanPurpose: action.payload.purpose,
//             };
//         case 'account/payLoan':
//             return {...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan};
//         case 'account/converting':
//             return {...state, isLoading: true}
//         default:
//             return state;
//     }
// }

// export function deposit(amount, currency) {
//     if (currency === 'USD') return {type: 'account/deposit', payload: amount}
//
//     return async function fetchCurrency(dispatch, getState) {
//         dispatch({type: 'account/converting'})
//         const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
//         const data = await response.json();
//         const convertedAmount = data.rates.USD
//
//         dispatch({type: 'account/deposit', payload: convertedAmount})
//     }
// }
// export function withdraw(amount) {
//     return {type: 'account/withdraw', payload: amount}
// }
// export function requestLoan(purpose, amount) {
//     return {type: 'account/requestLoan', payload: {amount, purpose}}
// }
// export function payLoan() {
//     return {type: 'account/payLoan'}
// }