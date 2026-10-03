import { useState } from "react";

function AddTransaction({ setTransactions, category, setCategory, setBalance, setIncome, setExpense, setHistoryTransactions }){

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    });

    const [type, setType] = useState("expense");

    const handleAmount = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        const formatted = Number(value).toLocaleString('id-ID');
        setAmount(formatted);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name !== "" && amount !== ""){
            const newTransaction = {
                id: Date.now(),
                name: name,
                amount: Number(amount.replace(/\./g, "")),
                category: category,
                type: type,
                date: date,
                timeHistory: new Date().toISOString(),
                mode: "added",
            };

            setName("");
            setAmount("");
            setDate(() => {
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = String(today.getMonth() + 1).padStart(2, "0");
                    const day = String(today.getDate()).padStart(2, "0");
                    return `${year}-${month}-${day}`;
                });

            setCategory("food");
            setType("expense");
            setTransactions(t => [...t, newTransaction]);
            setHistoryTransactions(t => [...t, newTransaction]);
            
            if (type === "expense"){
                setBalance(b => b - newTransaction.amount);
                setExpense(e => e + newTransaction.amount);
            } else if (type === "income"){
                setBalance(b => b + newTransaction.amount);
                setIncome(i => i + newTransaction.amount);
            }
        }
    }

    return(
        <div className="transaction-container">
            <h2>Add Transaction</h2>

            <form onSubmit={handleSubmit}>
                <div className="add-transaction-form-label">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g: Family Dinner" required/>
                </div>

                <div className="add-transaction-form-label">
                    <label>Amount</label>
                    <input type="text" value={amount} onChange={handleAmount} placeholder="Amount" required/>
                </div>

                <div className="add-transaction-form-label">
                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
                        <option value="other">          💰 Other        </option>
                    </select>
                </div>

                <div className="add-transaction-form-label">
                    <label>Type</label>
                    {/* <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select> */}
                    <div className="onclick-btns">
                        <button type="button" onClick={() => setType("income")} className={`income-btn ${type === "income" ? "fill" : ""}`} >Income</button>
                        <button type="button" onClick={() => setType("expense")} className={`expense-btn ${type === "expense" ? "fill" : ""}`}>Expense</button>
                    </div>
                </div>

                <div className="add-transaction-form-date">                
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) =>setDate(e.target.value)}/>
                </div>
                
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddTransaction