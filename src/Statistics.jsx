import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Sector } from 'recharts';

function Statistics({expenseChartData, incomeChartData}){

    const categoryColors = {
        food: "#FF6384",
        utilities: "#36A2EB",
        transport: "#FFCE56",
        shopping: "#9966FF",
        health: "#4BC0C0",
        education: "#FF9F40",
        salary : "#ffe48d",
        freelance: "#002a7d",
        business: "#cb48ff",
        investment: "#5aff48",
        gift: "#ff1294",
        other: "#ad1d00"
    };    

    const CustomSector = (props) => {
        const category = props.payload.category;
        return (
            <Sector
                {...props}
                fill={categoryColors[category]}
            />
        )
    }
    
    const CustomLegend = ({ payload }) => {
        return (
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "3px",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {payload.map((entry) => (
                    <span key={entry.value} >
                        <span
                            style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: categoryColors[entry.value]
                            }}
                        ></span>

                        {entry.value}
                    </span>
                ))}
            </div>
        );
    };

    
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
                                shape={CustomSector}                          
                            />
                            <Tooltip formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}/>
                            <Legend content={<CustomLegend />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart">
                    <h3>Income</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie 
                                data={incomeChartData}
                                dataKey="amount"
                                nameKey="category"
                                innerRadius={60}
                                outerRadius={90}
                                shape={CustomSector}
                            />
                            <Tooltip formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}/>
                            <Legend content={<CustomLegend />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}


export default Statistics