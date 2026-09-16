function PersonalFinance({balance, income, expense}){

    return(
        <div className="finance-container">
            <div className="finance-info balance">
                <h3 className="type-finance">Balance</h3>
                <p className="money">{balance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
            </div>

            <div className="finance-down-container">
                <div className="finance-info income">
                    <h3 className="type-finance">Income</h3>
                    <p className="money">{income.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                </div>                
                <div className="finance-info expense">
                    <h3 className="type-finance">Expense</h3>
                    <p className="money">{expense.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                </div>                
            </div>

        </div>
    );
}


export default PersonalFinance