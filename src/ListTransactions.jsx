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
            case 'food':            return '🍴';
            case 'utilities':       return '💡';
            case 'transport':       return '🚗';
            case 'shopping':        return '🛒';
            case 'health':          return '🏥';
            case 'education':       return '📚';
            case 'salary':          return '💼';
            case 'freelance':       return '💻';
            case 'business':        return '🏪';
            case 'investment':      return '📈';
            case 'gift':            return '🎁';
            case 'other-income':    return '💰';
        }
    }


    return(
        <div>
            <h2>{search === "" ? "Recent Transactions" : "Search Results"}</h2>

            <div className="transaction-scroll">
                {displayedTransactions.map((transaction) => (
                    <div className={handleCardStyle(transaction.type)} key={transaction.key}>

                        <span className="left-side"><span className="category">{handleCategory(transaction.category)}</span>{transaction.name}</span>
                        <span className="mid-side">
                            <span className="rupiah">
                                {`${transaction.type === "expense" ? "- Rp " : "+ Rp "}`}
                            </span>
                            {`${transaction.amount.toLocaleString('id-ID')}`}
                        </span>
                        <div className="adjust-btn">
                            <button className="edit-btn"><i class="bi bi-pencil-fill"></i></button>
                            <button className="remove-btn"><i className="bi bi-trash"></i></button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )

}

export default ListTransactions