function Navigation(){

    return (
        <nav className="side-nav">
            <h2><i className="bi bi-leaf-fill nav"></i>Spendly</h2>
            <ul>
                <li><a href="#list-dashboard" className="active"><i className="bi bi-house-door"></i>Dashboard</a></li>
                <li><a href="#list-transactions"><i className="bi bi-card-list"></i>Transactions</a></li>
                <li><a href="#"><i className="bi bi-clock-history"></i>History</a></li>
                <li><a href="#"><i className="bi bi-gear"></i>Settings</a></li>                
            </ul>
        </nav>
    )

}

export default Navigation