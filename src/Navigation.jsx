import { useState } from "react"

function Navigation(){

    const [nav, setNav] = useState("dashboard");

    return (
        <nav className="side-nav">
            <h2><i className="bi bi-leaf-fill nav"></i>Spendly</h2>
            <ul>
                <li onClick={() => setNav("dashboard")}><a href="#list-dashboard" className={`${nav === "dashboard" ? "active" : ""}`}><i className="bi bi-house-door"></i>Dashboard</a></li>
                <li onClick={() => setNav("transactions")}><a href="#list-transactions" className={`${nav === "transactions" ? "active" : ""}`}><i className="bi bi-card-list"></i>Transactions</a></li>
                <li onClick={() => setNav("history")}><a href="#list-history-transactions" className={`${nav === "history" ? "active" : ""}`}><i className="bi bi-clock-history"></i>History</a></li>          
            </ul>
        </nav>
    )

}

export default Navigation