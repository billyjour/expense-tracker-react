import { useState } from "react";
import Modal from "./Modal.jsx";

function ListTransactions({ transactions, setTransactions, search, sort, filter, setBalance, setIncome, setExpense }){

    const [viewId, setViewId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [editData, setEditData] = useState({
        name: "",
        amount: "",
        category: "",
        type: "",
        date: ""
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
                date: editData.date
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
        if (deletedData.type === 'income'){
            setIncome(i => i - deletedData.amount);
            setBalance(b => b - deletedData.amount);
        } else {
            setExpense(e => e - deletedData.amount);
            setBalance(b => b + deletedData.amount);
        }
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
        if (filter !== "" || sort !== "") {
            displayedTransactions = sortedTransactions;
        } else displayedTransactions = recentTransactions;
    } else {
        displayedTransactions = filteredTransactions;
    }

    // const toTitleCase = (s) => {
    //     return s.toLowerCase().split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    // }

    const handleCardStyle = (s) => {
        return s === "expense" ? "transaction-card expense" : "transaction-card income" 
    }

    const handleCategory = (c) => {
        switch(c) {
            case 'food':         return '🍴';
            case 'utilities':    return '💡';
            case 'transport':    return '🚗';
            case 'shopping':     return '🛒';
            case 'health':       return '🏥';
            case 'education':    return '📚';
            case 'salary':       return '💼';
            case 'freelance':    return '💻';
            case 'business':     return '🏪';
            case 'investment':   return '📈';
            case 'gift':         return '🎁';
            case 'other-income': return '💰';
        }
    }


    return(
        <div>
            <h2>{getTransactionTitle()}</h2>
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
                        <h2>{`View ${selectedTransaction.type === "expense" ? "expense" : "income"} type`}</h2>
                        <div className="view-transaction">
                            <p>Title:</p>
                            <input 
                                type="text" 
                                name="name" 
                                value={isEditing ? editData.name : selectedTransaction.name}
                                onChange={handleData}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="view-transaction">
                            <p>Amount:</p>
                            <input 
                                type="text"
                                name="amount"
                                value={isEditing ? editData.amount : Number(selectedTransaction.amount).toLocaleString("id-ID")}
                                onChange={handleAmount}
                                readOnly={!isEditing}
                                //Number(value).toLocaleString("id-ID")
                            />
                        </div>
                        <div className="view-transaction">
                            <p>Category:</p>
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
                            <p>Type:</p>
                            <select 
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
                            </select>
                        </div>     
                        <div className="view-transaction">
                            <p>Date:</p>
                            <input 
                                type="date" 
                                name="date"
                                value={isEditing ? editData.date : selectedTransaction.date}
                                onChange={handleData} 
                                readOnly={!isEditing}/>
                        </div> 
                    </>
                )}
            </Modal>
        </div>
    )
}

export default ListTransactions