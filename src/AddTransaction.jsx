import { useState } from "react";

function AddTransaction(){

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("food");
    const [type, setType] = useState("expense");

    const [transactions, setTransactions] = useState([]);

    const handleAmount = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        const formatted = Number(value).toLocaleString('id-ID');
        setAmount(formatted);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTransaction = {
            id: Date.now(),
            name: name,
            amount: Number(amount.replace(/\./g, "")),
            category: category,
            type: type,
            date: date
        };

        setTransactions(t => [...t, newTransaction]);
    }

    return(
        <div className="transaction-container">
            <h2>Add Transaction</h2>

            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Transaction Name"/>
                </label>
                <br />
                <label>Amount:
                    <input type="text" value={amount} onChange={handleAmount} placeholder="Amount"/>
                </label>
                <br />
                <label>Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="food">🍔 Food</option>
                        <option value="utilities">💡 Utilities</option>
                        <option value="transport">🚗 Transport</option>
                        <option value="shopping">🛒 Shopping</option>
                        <option value="health">🏥 Health</option>
                        <option value="education">📚 Education</option>
                    </select>
                </label>
                <br />
                <label>Type:
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </label>
                <br />
                <label>Date:
                    <input type="date" value={date} onChange={(e) =>setDate(e.target.value)}/>
                </label>
                <br />
                <button type="submit">Button</button>
            </form>
        </div>
    );
}

export default AddTransaction