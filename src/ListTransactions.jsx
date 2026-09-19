import { useState } from "react";
import Modal from "./Modal.jsx";

function ListTransactions({ transactions, setTransactions, search }){

    const [viewId, setViewId] = useState(null);

    const handleDeleteData = (id) => {
        setTransactions(t => t.filter((t) => t.id !== id));
        setViewId(null);        
    }

    const selectedTransaction = transactions.find((t) => t.id === viewId);

    const filteredTransactions = transactions.filter((t) => 
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    const recentTransactions = transactions.slice(-5).reverse();

    const displayedTransactions = search === "" ? recentTransactions : filteredTransactions;

    const toTitleCase = (s) => {
        return s.toLowerCase().split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

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
                    <div className={handleCardStyle(transaction.type)} onClick={() => setViewId(transaction.id)} key={transaction.id}>

                        <span className="left-side"><span className="category">{handleCategory(transaction.category)}</span>{transaction.name}</span>
                        <span className="mid-side">
                            <span className="rupiah">
                                {`${transaction.type === "expense" ? "- Rp " : "+ Rp "}`}
                            </span>
                            {`${transaction.amount.toLocaleString('id-ID')}`}
                        </span>
                        <div className="adjust-btn">
                            <button className="remove-btn" onClick={(e) => {e.stopPropagation(); handleDeleteData(transaction.id)}}><i className="bi bi-trash"></i></button>
                        </div>

                    </div>
                ))}
            </div>

            <Modal isOpen={viewId !== null} onClose={() => setViewId(null)} onDelete={() => handleDeleteData(viewId)} >
                {selectedTransaction && (
                    <>
                        <h2>{selectedTransaction.name}</h2>
                        <p className="p-justify-content">Amount :   <span>Rp {selectedTransaction.amount.toLocaleString('id-ID')}</span></p>
                        <p className="p-justify-content">Category : <span>{`${handleCategory(selectedTransaction.category)} ${toTitleCase(selectedTransaction.category)}`}</span></p>
                        <p className="p-justify-content">Type :     <span className={selectedTransaction.type === "expense" ? "expense-desc" : "income-desc"}>{toTitleCase(selectedTransaction.type)}</span></p>
                        <p>{selectedTransaction.date}</p>
                    </>
                )}
            </Modal>

        </div>
    )

}

export default ListTransactions