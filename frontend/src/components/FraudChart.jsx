import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getPredictionHistory } from "../data/predictionHistory";

function FraudChart() {

  const history = getPredictionHistory();

  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  const chartData = days.map(day => ({
    day,
    fraud: 0,
    genuine: 0
  }));

  history.forEach(item => {

    const date = new Date(item.createdAt);

    let index = date.getDay();

    // Convert JS day (0=Sun) to Mon-first
    index = index === 0 ? 6 : index - 1;

    if(item.prediction === "Fraud")
      chartData[index].fraud++;

    else
      chartData[index].genuine++;

  });

  return (

    <div className="card">

      <h2 style={{color:"#1e3a8a"}}>

        Weekly Fraud Trend

      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="fraud"
            stroke="#ef4444"
            strokeWidth={3}
            name="Fraud"
          />

          <Line
            type="monotone"
            dataKey="genuine"
            stroke="#22c55e"
            strokeWidth={3}
            name="Genuine"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default FraudChart;