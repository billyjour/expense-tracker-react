import PersonalFinance from "./PersonalFinance.jsx"
import AddTransaction from "./AddTransaction.jsx";
import Search from "./Search.jsx";
import ListTransactions from "./ListTransactions.jsx";
import Statistics from "./Statistics.jsx";
import { useState, useEffect } from "react"


function ExpenseTracker(){

    const [balance, setBalance] =   useState(() => {return Number(localStorage.getItem('balance')) || 200000});
    const [income, setIncome] =     useState(() => {return Number(localStorage.getItem('income' )) || 0});
    const [expense, setExpense] =   useState(() => {return Number(localStorage.getItem('expense')) || 0});
    const [transactions, setTransactions] = useState(() => {
        const savedTransactions = localStorage.getItem('transactions');
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("food");
    const [sort, setSort] = useState("");
    const [filter, setFilter] = useState("");

    const expenseData = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'expense') {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        }
        return acc;
    }, {});

    const expenseChartData = Object.entries(expenseData).map(([c, a]) => ({
        category: c,
        amount: a
    }));

    const incomeData = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        }
        return acc;
    }, {});

    const incomeChartData = Object.entries(incomeData).map(([c, a]) => ({
        category: c,
        amount: a
    }));
    
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('balance', balance);
        localStorage.setItem('income', income);
        localStorage.setItem('expense', expense);
    }, [transactions, balance, income, expense])

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
                    setSort={setSort}
                    filter={filter} 
                    setFilter={setFilter} />
                </div>
                <div className="list-container">
                    <ListTransactions 
                    transactions={transactions} 
                    setTransactions={setTransactions}
                    search={search} 
                    sort={sort}
                    filter={filter}
                    setBalance={setBalance}
                    setIncome={setIncome}
                    setExpense={setExpense} />
                </div>
            </div>
            
            <div className="graph-container">
                <Statistics 
                expenseChartData={expenseChartData}
                incomeChartData={incomeChartData} />
            </div>
        </div>

    </div>

    )
}

export default ExpenseTracker