import Navigation from "./Navigation.jsx";
import PersonalFinance from "./PersonalFinance.jsx"
import AddTransaction from "./AddTransaction.jsx";
import ListTransactions from "./ListTransactions.jsx";
import Statistics from "./Statistics.jsx";
import History from "./History.jsx";
import { useState, useEffect } from "react"

function ExpenseTracker(){

    const [balance, setBalance] =   useState(() => {return Number(localStorage.getItem('balance')) || 200000});
    const [income, setIncome]   =   useState(() => {return Number(localStorage.getItem('income' )) || 0});
    const [expense, setExpense] =   useState(() => {return Number(localStorage.getItem('expense')) || 0});
    const [transactions, setTransactions] = useState(() => {
        const savedTransactions = localStorage.getItem('transactions');
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });

    const [historyTransactions, setHistoryTransactions] = useState(() => {
        const historySavedTransactions = localStorage.getItem('historyTransactions');
        return historySavedTransactions ? JSON.parse(historySavedTransactions) : [];
    })

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
        localStorage.setItem('historyTransactions', JSON.stringify(historyTransactions));
        localStorage.setItem('balance', balance);
        localStorage.setItem('income', income);
        localStorage.setItem('expense', expense);
    }, [transactions, historyTransactions, balance, income, expense])

    return(
    <div className="app-container" id="list-dashboard">
        <Navigation />
        <div className="main-container">
            <div className="tracker-container">                
                <PersonalFinance 
                    balance={balance} 
                    income={income} 
                    expense={expense} 
                />
                <div className="add-and-statistics-container">
                    <AddTransaction 
                        setTransactions={setTransactions} 
                        category={category} 
                        setCategory={setCategory} 
                        setBalance={setBalance}
                        setIncome={setIncome}
                        setExpense={setExpense} 
                        setHistoryTransactions={setHistoryTransactions}
                    />
                    <Statistics 
                        expenseChartData={expenseChartData}
                        incomeChartData={incomeChartData} 
                    />
                </div>
            </div>
            <div className="search-list-container">
                <ListTransactions 
                    transactions={transactions} 
                    setTransactions={setTransactions}
                    search={search} 
                    setSearch={setSearch}
                    sort={sort}
                    setSort={setSort} 
                    filter={filter}
                    setFilter={setFilter}
                    setBalance={setBalance}
                    setIncome={setIncome}
                    setExpense={setExpense} 
                    setHistoryTransactions={setHistoryTransactions}
                />
            </div>
            <div className="history-list-container">
                <History 
                    historyTransactions={historyTransactions}
                />
            </div>
        </div>
    </div>
    )

}

export default ExpenseTracker