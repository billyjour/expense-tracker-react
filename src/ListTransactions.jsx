function ListTransactions({ transactions, search }){
    const filteredTransactions = transactions.filter((t) => 
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    const recentTransactions = transactions.slice(-5).reverse();

    const displayedTransactions = search === "" ? recentTransactions : filteredTransactions;

    const handleCardStyle = (s) => {
        return s === "expense" ? "transaction-card expense" : "transaction-card income" 
    }

    const handleCategory = (c) => {
        switch(c) {
            case 'food':        return "🍴";
            case 'utilities':   return "💡";
            case 'transport':   return "🚗";
            case 'shopping':    return "🛒";
            case 'health':      return "🏥";
            case 'education':   return "📚";
        }
    }


    return(
        <div>
            <h2>{search === "" ? "Recent Transactions" : "Search Results"}</h2>

            {displayedTransactions.map((transaction) => (
                <div className={handleCardStyle(transaction.type)} key={transaction.key}>
                    <span className="category">{handleCategory(transaction.category)}</span>
                    <span>{transaction.name}</span>
                    <span>{`${transaction.type === "expense" ? "-" : "+"} ${transaction.amount}`}</span>
                    <button className="edit-btn">Edit</button>
                </div>
            ))}
        </div>
    )

}

export default ListTransactions