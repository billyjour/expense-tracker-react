import PersonalFinance from "./PersonalFinance.jsx"
import AddTransaction from "./AddTransaction.jsx";
import Search from "./Search.jsx";
import ListTransactions from "./ListTransactions.jsx";
import { useState } from "react"

function ExpenseTracker(){

    const [balance, setBalance] = useState(2450000);
    const [income, setIncome] = useState(3000000);
    const [expense, setExpense] = useState(550000);
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");

    return(
    <div className="full-container">
        <div className="tracker-container">
            <h1 className="title">Spendly</h1>
            <PersonalFinance balance={balance} income={income} expense={expense} />
            <AddTransaction setTransactions={setTransactions} />
        </div>        
        <div className="search-container">
            <Search search={search} setSearch={setSearch} />
            <ListTransactions transactions={transactions} search={search} />
        </div>
    </div>

    )
}

export default ExpenseTracker