import { useState } from "react";
import Search from "./Search.jsx";
import Modal from "./Modal.jsx";

function ListTransactions({ transactions, setTransactions, search, setSearch, sort, setSort, filter, setFilter, setBalance, setIncome, setExpense, setHistoryTransactions }){

    const [viewId, setViewId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [editData, setEditData] = useState({
        name: "",
        amount: "",
        category: "",
        type: "",
        date: "",
        timeHistory: "",
    });

    const sortTransaction = (allTransactions, sortBy) => {
        switch(sortBy){
            case 'all':     return allTransactions;
            case 'newest':  return [...allTransactions].sort((a,b) => new Date(b.date) - new Date(a.date));
            case 'oldest':  return [...allTransactions].sort((a,b) => new Date(a.date) - new Date(b.date));
            case 'highest': return [...allTransactions].sort((a,b) => b.amount - a.amount);
            case 'lowest':  return [...allTransactions].sort((a,b) => a.amount - b.amount);
            case 'expense': return allTransactions.filter(t => t.type === 'expense');
            case 'income':  return allTransactions.filter(t => t.type === 'income');
            default:        return allTransactions;
        }
    }

    const getTransactionTitle = () => {
        if (search !== "")  return "Search Results";
        switch (sort) {
            case "expense":     return "Expense Transactions";
            case "income":      return "Income Transactions";
            case "newest":      return "Newest Transactions";
            case "oldest":      return "Oldest Transactions";
            case "highest":     return "Highest Transactions";
            case "lowest":      return "Lowest Transactions";
            case "all":         return "All Transactions";
            default:            return "Recent Transactions";
        }
    };    


    const filterCategory = (allTransactions, filterBy) => {
        if (filterBy === "") return allTransactions;

        return allTransactions.filter(t => t.category === filterBy)
        // switch(filterBy){
        //     case 'food':        return allTransactions.filter(t => t.category === 'food');
        //     case 'utilities':   return allTransactions.filter(t => t.category === 'utilities');
        //     case 'transport':   return allTransactions.filter(t => t.category === 'transport');
        //     case 'shopping':    return allTransactions.filter(t => t.category === 'shopping');
        //     case 'health':      return allTransactions.filter(t => t.category === 'health');
        //     case 'education':   return allTransactions.filter(t => t.category === 'education');
        //     case 'salary':      return allTransactions.filter(t => t.category === 'salary');
        //     case 'freelance':   return allTransactions.filter(t => t.category === 'freelance');
        //     case 'business':    return allTransactions.filter(t => t.category === 'business');
        //     case 'investment':  return allTransactions.filter(t => t.category === 'investment');
        //     case 'gift':        return allTransactions.filter(t => t.category === 'gift');
        //     case 'other-income':return allTransactions.filter(t => t.category === 'other-income');
        //     default:            return allTransactions;            
        // }
    }

    const handleEditData = () => {
        setEditData({
            name: selectedTransaction.name,
            amount: Number(selectedTransaction.amount).toLocaleString("id-ID"),
            category: selectedTransaction.category,
            type: selectedTransaction.type,
            date: selectedTransaction.date
        })

        setIsEditing(true);
    }

    const handleSaveData = () => {
        if (editData.name !== "" && editData.amount !== ""){
            const savedData = {
                id: viewId,
                name: editData.name,
                amount: Number(editData.amount.replace(/\./g, "")),
                category: editData.category,
                type: editData.type,
                date: editData.date,             
            };

            const historyData = {
                ...savedData,
                timeHistory: new Date().toISOString(),
                mode: "edited",
                nameBefore: selectedTransaction.name,
                amountBefore: selectedTransaction.amount,
                categoryBefore: selectedTransaction.category,
                typeBefore: selectedTransaction.type,
                dateBefore: selectedTransaction.date                
            };

            if (selectedTransaction.type === savedData.type && savedData.type === "expense"){
                setExpense(e => e - selectedTransaction.amount + savedData.amount);
                setBalance(b => b + selectedTransaction.amount - savedData.amount);
            } else if (selectedTransaction.type === savedData.type && savedData.type === "income"){
                setIncome(i => i - selectedTransaction.amount + savedData.amount);
                setBalance(b => b - selectedTransaction.amount + savedData.amount);
            } else if (selectedTransaction.type === "expense" && savedData.type === "income"){
                setExpense(e => e - selectedTransaction.amount);
                setIncome(i => i + savedData.amount);
                setBalance(b => b + selectedTransaction.amount + savedData.amount);
            } else if (selectedTransaction.type === "income" && savedData.type === "expense"){
                setIncome(i => i - selectedTransaction.amount);
                setExpense(e => e + savedData.amount);
                setBalance(b => b - selectedTransaction.amount - savedData.amount);
            }

            setTransactions(t => 
                t.map(transaction => {
                    if (transaction.id === viewId) return savedData;
                    else return transaction;
                })
            );  

            if (historyData.name !== historyData.nameBefore || 
                historyData.amount !== historyData.amountBefore ||
                historyData.category !== historyData.categoryBefore ||
                historyData.type !== historyData.typeBefore ||
                historyData.date !== historyData.dateBefore
            ) setHistoryTransactions(h => [...h, historyData]);
        
        }
        setIsEditing(false);
    }

    const handleData = (e) => {
        const {name, value} = e.target;
        setEditData(data => ({...data, [name] : value}));
    };

    const handleAmount = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setEditData(data => ({
            ...data,
            amount: value === "" ? "" : Number(value).toLocaleString("id-ID")
        }));
    };

    const handleDeleteData = (id) => {
        const deletedData = transactions.find((t) => t.id === id);       
        const historyData = {
            ...deletedData,
            timeHistory: new Date().toISOString(),
            mode: "deleted"
        } 
        if (deletedData.type === 'income'){
            setIncome(i => i - deletedData.amount);
            setBalance(b => b - deletedData.amount);
        } else {
            setExpense(e => e - deletedData.amount);
            setBalance(b => b + deletedData.amount);
        }
        setHistoryTransactions(h => [...h, historyData]);
        setTransactions(t => t.filter((t) => t.id !== id));
        setViewId(null);                
    };

    const selectedTransaction = transactions.find((t) => t.id === viewId);

    const filteredTransactions = transactions.filter((t) => 
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    const recentTransactions = transactions.slice(-5).reverse();

    const filteredCategoryTransactions = filterCategory(transactions, filter);
    const sortedTransactions = sortTransaction(filteredCategoryTransactions, sort);
    // const displayedTransactions = search === "" ? recentTransactions : filteredTransactions;
    
    let displayedTransactions;

    if (search === ""){ 
        if (filter !== "" || sort !== "") displayedTransactions = sortedTransactions;
        else displayedTransactions = recentTransactions;
    } else displayedTransactions = filteredTransactions;
    

    const toTitleCase = (s) => {
        return s.toLowerCase().split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    const handleCardStyle = (s) => {
        return s === "expense" ? "transaction-card expense" : "transaction-card income" 
    }

    const handleCategory = (c) => {
        switch(c) {
            case 'food':         return <i className="bi bi-fork-knife"></i>;
            case 'utilities':    return <i className="bi bi-lightbulb-fill"></i>;
            case 'transport':    return <i className="bi bi-car-front-fill"></i>;
            case 'shopping':     return <i className="bi bi-cart-fill"></i>;
            case 'health':       return <i className="bi bi-hospital-fill"></i>;
            case 'education':    return <i className="bi bi-book-fill"></i>;
            case 'salary':       return <i className="bi bi-bank2"></i>;
            case 'freelance':    return <i className="bi bi-laptop-fill"></i>;
            case 'business':     return <i className="bi bi-buildings-fill"></i>
            case 'investment':   return <i className="bi bi-bar-chart-fill"></i>
            case 'gift':         return <i className="bi bi-gift-fill"></i>;
            case 'other-income': return <i className="bi bi-piggy-bank-fill"></i>;
        }
    }

    const handleDate = (d) => {
        const dateArray = d.split("-");
        let day, month, year;
        day = dateArray[2];
        month = dateArray[1];
        year = dateArray[0];
    
        switch(month) {
            case "01" : month = "Jan"; break; 
            case "02" : month = "Feb"; break;      
            case "03" : month = "Mar"; break;      
            case "04" : month = "Apr"; break;      
            case "05" : month = "May"; break;      
            case "06" : month = "Jun"; break;      
            case "07" : month = "Jul"; break;      
            case "08" : month = "Aug"; break;      
            case "09" : month = "Sep"; break;      
            case "10" : month = "Oct"; break;      
            case "11" : month = "Nov"; break;       
            case "12" : month = "Dec"; break;           
        }

        return `${month} ${day}, ${year}`;
    }


    return(
        <div>            
            <div className="search-container" id="list-transactions">
                <h2>{getTransactionTitle()}</h2>
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                    sort={sort} 
                    setSort={setSort}
                    filter={filter} 
                    setFilter={setFilter}
                />
            </div>            
            <div className="transaction-scroll">
                <div className="transaction-header">
                    <span className="transaction-name">Name</span>
                    <span className="transaction-category">Category</span>
                    <span className="transaction-type">Type</span>
                    <span className="transaction-date">Date</span>
                    <span className="transaction-amount">Amount</span>
                </div>

                {displayedTransactions.map((transaction) => (
                    <div className={handleCardStyle(transaction.type)} onClick={() => setViewId(transaction.id)} key={transaction.id}>

                        <span className="transaction-name">{handleCategory(transaction.category)}<span className="name-text">{transaction.name}</span></span>
                        <span className="transaction-category">{toTitleCase(transaction.category)}</span>
                        <span className={`transaction-type ${transaction.type === "income" ? "income-type" : "expense-type"}`}>{toTitleCase(transaction.type)}</span>
                        <span className="transaction-date">{handleDate(transaction.date)}</span>

                        <span className={`transaction-amount ${transaction.type === "expense" ? "expense-amount" : "income-amount"}`} >
                            <span className="rupiah">
                                {`${transaction.type === "expense" ? "- Rp " : "+ Rp "}`}
                            </span>
                            <span className="rupiah-value">
                                {`${transaction.amount.toLocaleString('id-ID')}`}
                            </span>
                        </span>

                        <button className="remove-btn" onClick={(e) => {e.stopPropagation(); handleDeleteData(transaction.id)}}><i class="bi bi-trash-fill"></i></button>

                    </div>
                ))}
            </div>

            <Modal 
                isOpen={viewId !== null} 
                onClose={() => {setViewId(null); setIsEditing(false);}} 
                onDelete={() => handleDeleteData(viewId)} 
                onEdit={handleEditData}
                isEditing={isEditing}
                onSave={handleSaveData}
            >
                {selectedTransaction && (
                    <>  
                        <h2 className="header-modal-pop-up">{`View ${selectedTransaction.type === "expense" ? "expense" : "income"} type`}</h2>
                        <div className="view-transaction">
                            <p>Title</p>
                            <input 
                                type="text" 
                                name="name" 
                                value={isEditing ? editData.name : selectedTransaction.name}
                                onChange={handleData}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="view-transaction">
                            <p>Amount</p>
                            <input 
                                type="text"
                                name="amount"
                                value={isEditing ? editData.amount : Number(selectedTransaction.amount).toLocaleString("id-ID")}
                                onChange={handleAmount}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="view-transaction">
                            <p>Category</p>
                            <select 
                                value={isEditing ? editData.category : selectedTransaction.category}
                                name="category" 
                                onChange={handleData}
                                disabled={!isEditing}
                            >
                                <option value="food">           🍴 Food         </option>
                                <option value="utilities">      💡 Utilities    </option>
                                <option value="transport">      🚗 Transport    </option>
                                <option value="shopping">       🛒 Shopping     </option>
                                <option value="health">         🏥 Health       </option>
                                <option value="education">      📚 Education    </option>
                                <option value="salary">         💼 Salary       </option>
                                <option value="freelance">      💻 Freelance    </option>
                                <option value="business">       🏪 Business     </option>
                                <option value="investment">     📈 Investment   </option>
                                <option value="gift">           🎁 Gift         </option>
                                <option value="other-income">   💰 Other        </option>
                            </select>                            
                        </div>
                        <div className="view-transaction">
                            <p>Type</p>
                            {/* <select 
                                className={
                                    (isEditing ? editData.type : selectedTransaction.type) === "expense"
                                    ? "expense-desc"
                                    : "income-desc"
                                }
                                name="type" 
                                value={isEditing ? editData.type : selectedTransaction.type}
                                onChange={handleData} 
                                disabled={!isEditing}
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select> */}
                            <div className="onclick-btns">
                                <button 
                                    type="button" 
                                    onClick={() => setEditData(d => ({...d, type: "income"}))} 
                                    className={`income-btn ${(isEditing ? editData.type : selectedTransaction.type) === "income" ? "fill" : ""}`}
                                    disabled={!isEditing}
                                >
                                    Income
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setEditData(d => ({...d, type: "expense"}))} 
                                    className={`expense-btn ${(isEditing ? editData.type : selectedTransaction.type) === "expense" ? "fill" : ""}`}
                                    disabled={!isEditing}
                                >
                                    Expense
                                </button>
                            </div>                            
                        </div>     
                        <div className="view-transaction">
                            <p>Date</p>
                            <input 
                                type="date" 
                                name="date"
                                value={isEditing ? editData.date : selectedTransaction.date}
                                onChange={handleData} 
                                disabled={!isEditing}
                            />
                        </div> 
                    </>
                )}
            </Modal>
        </div>
    )
}

export default ListTransactions