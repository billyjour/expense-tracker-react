function ListTransactions({ transactions, search }){
    const filteredTransactions = transactions.filter((t) => 
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    const recentTransactions = transactions.slice(-5).reverse();

    const displayedTransactions = search === "" ? recentTransactions : filteredTransactions;

    return(
        <div>
            <h2>{search === "" ? "Recent Transactions" : "Search Results"}</h2>

            {displayedTransactions.map((transaction) => (
                <div key={transaction.key}>
                    <span>{transaction.category}</span>
                    <span>{transaction.name}</span>
                    <span>{`${transaction.type === "expense" ? "-" : "+"} ${transaction.amount}`}</span>
                </div>
            ))}
        </div>
    )

}

export default ListTransactions