function Navigation(){

    return (
        <nav className="side-nav">
            <h2><i class="bi bi-leaf-fill nav"></i>Spendly</h2>
            <ul>
                <li><a href="#list-dashboard" className="active"><i class="bi bi-house-door"></i>Dashboard</a></li>
                <li><a href="#list-transactions"><i class="bi bi-card-list"></i>Transactions</a></li>
                <li><a href="#"><i class="bi bi-clock-history"></i>History</a></li>
                <li><a href="#"><i class="bi bi-gear"></i>Settings</a></li>                
            </ul>
        </nav>
    )

}

export default Navigation