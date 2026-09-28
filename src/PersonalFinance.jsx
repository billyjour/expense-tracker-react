function PersonalFinance({balance, income, expense}){

    return(
        <>

            <header>
                <h3>Good morning, Billy!</h3>
                <p>Here's your financial overview for today.</p>
            </header>
        
            <div className="finance-container">
                <h3 className="wallet">My Wallet</h3>
                <div className="finance-wallet-container">
                    <div className="finance-info balance">
                        <i class="bi bi-wallet-fill"></i>
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