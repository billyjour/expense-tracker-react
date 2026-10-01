function PersonalFinance({balance, income, expense}){

    function getTimeOfDay(date = new Date()) {
        const hour = date.getHours();

    if (hour >= 4 && hour < 11) return "Morning";    // 04:00 - 10:59
    if (hour >= 11 && hour < 15) return "Afternoon";  // 11:00 - 14:59
    if (hour >= 15 && hour < 18) return "Evening";   // 15:00 - 17:59
    return "Night";                               // 18:00 - 03:59
    }

    return(
        <>

            <header>
                <div className="left-header">
                    <h3>{`Good ${getTimeOfDay()}, Billy!`}</h3>
                    <p>Here's your financial overview for today.</p>
                </div>
                <div className="right-header">
                    <span>
                        {new Date().toLocaleDateString("en-GB", {
                            weekday: "short",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}                        
                    </span>
                    <span className="prof-pict">BJ</span>
                </div>

            </header>
        
            <div className="finance-container">
                <h3 className="wallet">My Wallet</h3>
                <div className="finance-wallet-container">
                    <div className="finance-info balance">
                        <i className="bi bi-wallet-fill"></i>
                        <div className="info">
                            <h3 className="type-finance">Balance</h3>
                            <p className="money">{balance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                        </div>
                    </div>

                    <div className="finance-info income">    
                        <i class="bi bi-arrow-up-right-circle-fill"></i>
                        <div className="info">
                            <h3 className="type-finance">Income</h3>
                            <p className="money">{income.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                        </div>
                    </div>                

                    <div className="finance-info expense">
                        <i class="bi bi-arrow-down-circle-fill"></i>
                        <div className="info">
                            <h3 className="type-finance">Expense</h3>
                            <p className="money">{expense.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                        </div>
                    </div>                
                </div>

            </div>
        </>
    );
}


export default PersonalFinance