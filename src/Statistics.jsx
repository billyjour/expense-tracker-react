import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from 'recharts';

function Statistics({expenseChartData, incomeChartData}){
    return(
        <>
            <h2>Statistics</h2>

            <div className="charts">
                <div className="chart">
                    <h3>Expense</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={expenseChartData}
                                dataKey="amount"
                                nameKey="category"
                                innerRadius={60}
                                outerRadius={90}                                
                            /> 
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart">
                    <h3>Expense</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie 
                                data={incomeChartData}
                                dataKey="amount"
                                nameKey="category"
                                innerRadius={60}
                                outerRadius={90}
                            />
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}


export default Statistics