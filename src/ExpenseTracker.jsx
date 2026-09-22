import PersonalFinance from "./PersonalFinance.jsx"
import AddTransaction from "./AddTransaction.jsx";
import Search from "./Search.jsx";
import ListTransactions from "./ListTransactions.jsx";
import { useState } from "react"


function ExpenseTracker(){

    const [balance, setBalance] = useState(200000);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("food");
    const [sort, setSort] = useState("");
    
    return(
    <div className="full-container">
        <div className="tracker-container">
            <h1 className="title">Spendly</h1>

            <PersonalFinance 
            balance={balance} 
            income={income} 
            expense={expense} />

            <AddTransaction 
            setTransactions={setTransactions} 
            category={category} 
            setCategory={setCategory} 
            setBalance={setBalance}
            setIncome={setIncome}
            setExpense={setExpense} />
            
        </div>

        <div className="right-container">
            <div className="search-list-container">
                <div className="search-container">
                    <Search 
                    search={search} 
                    setSearch={setSearch} 
                    sort={sort} 
                    setSort={setSort} />
                </div>
                <div className="list-container">
                    <ListTransactions 
                    transactions={transactions} 
                    setTransactions={setTransactions}
                    search={search} 
                    sort={sort}
                    setBalance={setBalance}
                    setIncome={setIncome}
                    setExpense={setExpense} />
                </div>
            </div>
            
            <div className="graph-container">
                <h2>Statistics</h2>
            </div>
        </div>

    </div>

    )
}

export default ExpenseTracker