import {useState} from 'react'
import './App.css'
import CreateCustomer from "./features/customers/CreateCustomer.jsx";
import Customer from "./features/customers/Customer.jsx";
import AccountOperations from "./features/accounts/AccountOperations.jsx";
import BalanceDisplay from "./features/accounts/BalanceDisplay.jsx";
import {useSelector} from "react-redux";

function App() {
    const fullName = useSelector((state) => state.customer.fullName)
    return (
        <>
            <h1>🏦 The React-Redux Bank ⚛️</h1>
            {!fullName ? <CreateCustomer/>
                :
                <>
                    <Customer/>
                    <AccountOperations/>
                    <BalanceDisplay/>
                </>
            }
        </>
    )
}

export default App
