import { useState } from "react";

function History({ historyTransactions }){

    const [sortHistory, setSortHistory] = useState("all");

    const handleModeIcon = (mode) => {
        switch(mode) {
            case 'added'  : return <i class="bi bi-plus-lg mode-icon"></i>;
            case 'deleted': return <i class="bi bi-trash-fill mode-icon"></i>;
            case 'edited' : return <i class="bi bi-pencil-fill mode-icon"></i>;
            default : return "";
        }
    }

    const handleDescClass = (mode) => {
        switch(mode) {
            case 'added'   : return "added-card";
            case 'deleted' : return "deleted-card";
            case 'edited'  : return "edited-card";
            default : return "";        
        }
    }
    
    const handleStyleColorMode = (mode) => {
        switch(mode) {
            case 'added'   : return "rgb(18, 108, 0)";
            case 'deleted' : return "rgb(108, 0, 0)";
            case 'edited'  : return "rgb(7, 135, 255)";
            default : return "";
        }
    }

    const toTitleCase = (s) => {
        return s.toLowerCase().split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    const reverseHistoryTransactions = [...historyTransactions].reverse();
    const addedHistoryTransactions = [...historyTransactions].filter(t => t.mode === "added").reverse();
    const editedHistoryTransactions = [...historyTransactions].filter(t => t.mode === "edited").reverse();
    const deletedHistoryTransactions = [...historyTransactions].filter(t => t.mode === "deleted").reverse();

    let displayedHistoryTransactions;
    switch(sortHistory) {
        case 'all'      : displayedHistoryTransactions = reverseHistoryTransactions;    break;
        case 'added'    : displayedHistoryTransactions = addedHistoryTransactions;      break;
        case 'edited'   : displayedHistoryTransactions = editedHistoryTransactions;     break;
        case 'deleted'  : displayedHistoryTransactions = deletedHistoryTransactions;    break;
    }

    return (
        <>  
            <div className="history-transaction-container" id="list-history-transactions">
                <div className="history-left-container">
                    <h2>History Transactions</h2>
                    <p>Track all activities in your transactions</p>
                </div>
                <div className="history-right-container">
                    <button type="button" onClick={() => setSortHistory("all") } className={`history-sort-btn ${sortHistory === "all" ? "fill" : ""}`}>All</button>
                    <button type="button" onClick={() => setSortHistory("added")} className={`history-sort-btn ${sortHistory === "added" ? "fill" : ""}`}>Added</button>
                    <button type="button" onClick={() => setSortHistory("edited")} className={`history-sort-btn ${sortHistory === "edited" ? "fill" : ""}`}>Edited</button>
                    <button type="button" onClick={() => setSortHistory("deleted")} className={`history-sort-btn ${sortHistory === "deleted" ? "fill" : ""}`}>Deleted</button>
                </div>
            </div>
            
            <div className="transaction-scroll">
                {displayedHistoryTransactions.map((transaction) => {
                    const date = new Date(transaction.timeHistory);
                    const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    });

                    const formattedTime = date.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    });                    
                    return (
                    <div className="history-card">
                        {handleModeIcon(transaction.mode)}
                        <div className={`history-desc ${handleDescClass(transaction.mode)}`}>
                            <div className="history-upper-desc"> 
                                <div className="history-left-desc">
                                    <span className="first">You <span style={{color: handleStyleColorMode(transaction.mode)}}>{`${transaction.mode}`}</span> a transaction</span>
                                    <span className="transaction-name-desc">{`"${transaction.name}"`}</span>
                                </div>
                                <div className="history-right-desc">
                                    <span>{formattedDate}</span>
                                    <span>{formattedTime}</span>
                                </div>
                            </div>
                            {transaction.mode !== "edited" && ( 
                            <div className="history-lower-desc not-edited">
                                    <span className={`${transaction.mode === "added" ? "added-transaction" : "deleted-transaction"}`}>Rp {transaction.amount.toLocaleString("id-ID")}</span>
                                    <span className={`${transaction.type === "income" ? "income-transaction" : "expense-transaction"}`}>{toTitleCase(transaction.type)}</span>
                                    <span className="category-transaction">{toTitleCase(transaction.category)}</span>
                            </div>
                            )
                            }
                            {transaction.mode === "edited" && (
                            <div className="history-lower-desc edited">
                                <i class="bi bi-arrow-right"></i>
                                <div className="before-edited-transaction">
                                    <span className="header-transaction before">Before</span>
                                    <span className="key-value">
                                        <span className="key"><i className="bi bi-journal-text"></i> Name</span>
                                        <span className="value name-transaction">{`${transaction.nameBefore}`}</span>
                                    </span>
                                    <span className="key-value">
                                        <span className="key"><i className="bi bi-coin"></i> Amount</span>
                                        <span className="value amount-transaction">{`Rp ${transaction.amountBefore.toLocaleString("id-ID")}`}</span>
                                    </span>
                                    <span className="key-value">
                                        <span className="key"><i className="bi bi-tag"></i> Category</span>
                                        <span className="value category-transaction">{`${toTitleCase(transaction.categoryBefore)}`}</span>
                                    </span>
                                    <span className="key-value">
                                        <span className="key"><i className="bi bi-arrow-left-right"></i> Type</span>
                                        <span className={`value ${transaction.typeBefore === "income" ? "income-transaction" : "expense-transaction"}`}>{`${toTitleCase(transaction.typeBefore)}`}</span>
                                    </span>
                                    <span className="key-value">
                                        <span className="key"><i className="bi bi-calendar"></i> Amount</span>
                                        <span className="value date-transaction">{`${transaction.dateBefore}`}</span>
                                    </span>                                                                                                            
                                </div>
                                <div className="after-edited-transaction">
                                    <span className="header-transaction after">After</span>
                                    <span className="key-value">
                                        <span className="key"><i className="bi bi-journal-text"></i> Name</span>
                                        <span className={`value name-transaction ${transaction.nameBefore !== transaction.name ? "diff" : ""}`}>{`${transaction.name}`}</span>
                                    </span>
                                    <span className="key-value">
                                        <span className="key"><i className="bi bi-coin"></i> Amount</span>
                                        <span className={`value amount-transaction ${transaction.amountBefore !== transaction.amount ? "diff" : ""}`}>{`Rp ${transaction.amount.toLocaleString("id-ID")}`}</span>
                                    </span>
                                    <span className="key-value">
                                        <span className="key"><i className="bi bi-tag"></i> Category</span>
                                        <span className={`value category-transaction ${transaction.categoryBefore !== transaction.category ? "diff" : ""}`}>{`${toTitleCase(transaction.category)}`}</span>
                                    </span>
                                    <span className="key-value">
                                        <span className="key"><i className="bi bi-arrow-left-right"></i> Type</span>
                                        <span className={`value ${transaction.type === "income" ? "income-transaction" : "expense-transaction"}`}>{`${toTitleCase(transaction.type)}`}</span>
                                    </span>
                                    <span className="key-value">
                                        <span className="key"><i className="bi bi-calendar"></i> Amount</span>
                                        <span className={`value date-transaction ${transaction.dateBefore !== transaction.date ? "diff" : ""}`}>{`${transaction.date}`}</span>
                                    </span>                                                                                                            
                                </div>                                
                            </div>
                            )}

                        </div>

                    </div>
                    )
                })}
            </div>
        </>
    )

}

export default History