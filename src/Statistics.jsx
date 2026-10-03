import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Sector } from 'recharts';

const isMobile = window.innerWidth <= 400;
const categoryColors = {
    food: "#FF6384",
    utilities: "#36A2EB",
    transport: "#FFCE56",
    shopping: "#9966FF",
    health: "#4BC0C0",
    education: "#FF9F40",
    salary : "#ad8500",
    freelance: "#002a7d",
    business: "#cb48ff",
    investment: "#5aff48",
    gift: "#ff1294",
    other: "#ad1d00"
};    

const toTitleCase = (s) => {
    return s.toLowerCase().split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const renderActiveShape = ({ cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, payload, percent, value }) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text style={{fontSize:"1.2em"}} x={cx} y={cy} dy={8} textAnchor="middle" fill={categoryColors[payload.category]}>
        {toTitleCase(payload.category)}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={categoryColors[payload.category]}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={categoryColors[payload.category]}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={categoryColors[payload.category]} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={categoryColors[payload.category]} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 6} y={ey} textAnchor={textAnchor} fill={categoryColors[payload.category]}>{`Rp ${(value / 1000).toFixed(0)}K`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 6} y={ey} dy={18} textAnchor={textAnchor} fill={categoryColors[payload.category]}>
        {`${((percent ?? 1) * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

function Statistics({expenseChartData, incomeChartData, isAnimationActive = true, defaultIndex = undefined}){
    
    const CustomSector = (props) => {
        const category = props.payload.category;
        return (
            <Sector
                {...props}
                fill={categoryColors[category]}
                opacity={0.6}
            />
        )
    }
    
    const CustomLegend = ({ payload }) => {
        return (
            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "3px",
                margin: "0",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                fontSize: "0.8em",
            }}>
                {payload.map((entry) => (
                    <span key={entry.value} >
                        <span
                            style={{
                                display: "inline-block",
                                width: "10px",
                                marginRight: "4px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: categoryColors[entry.value]
                            }}
                        ></span>
                        {toTitleCase(entry.value)}
                    </span>
                ))}
            </div>
        );
    };

    
    return(

        <div className="graph-container charts">
            <div className="chart">
                <h3 style={{ fontSize: "1em" ,marginBottom : 0,  paddingBottom: 0}}>Expense by Category</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <PieChart
                        margin={
                            isMobile
                                ? { top: 20, right: 0, bottom: 20, left: 0 }
                                : { top: 0, right: 0, bottom: 0, left: 40 }
                            }   
                        >
                        <Pie
                            activeShape={renderActiveShape}
                            data={expenseChartData}
                            dataKey="amount"
                            nameKey="category"
                            innerRadius="60%"
                            outerRadius="80%"      
                            stroke="transparent"
                            paddingAngle={3}
                            shape={CustomSector}
                            isAnimationActive={isAnimationActive}
                        />
                        <Tooltip content={() => null} defaultIndex={defaultIndex}/>
                        <Legend content={<CustomLegend />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="chart">
                <h3 style={{ fontSize: "1em" ,marginBottom : 0,  paddingBottom: 0}}>Income by Category</h3>                
                <ResponsiveContainer width="100%" height="90%">
                    <PieChart
                        margin={
                            isMobile
                                ? { top: 20, right: 0, bottom: 20, left: 0 }
                                : { top: 0, right: 40, bottom: 0, left: 0 }
                            }   
                        >
                        <Pie
                            activeShape={renderActiveShape}
                            data={incomeChartData}
                            dataKey="amount"
                            nameKey="category"
                            innerRadius="60%"
                            outerRadius="80%"      
                            stroke="transparent"
                            paddingAngle={3}
                            shape={CustomSector}
                            isAnimationActive={isAnimationActive}                          
                        />
                        <Tooltip content={() => null} defaultIndex={defaultIndex}/>
                        <Legend content={<CustomLegend />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

    );
}


export default Statistics