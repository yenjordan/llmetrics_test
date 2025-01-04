import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface RelevancyChartProps {
  data: {
    modelName: string;
    responseHistory: {
      timestamp: string;
      relevancy: number;
    }[];
  }[];
}

export default function RelevancyChart({ data }: RelevancyChartProps) {
  const filteredData = data.filter(model => ["llama-70b", "mixtral", "gemini"].includes(model.modelName));

  const chartData = filteredData.flatMap((model) =>
    model.responseHistory.map((history) => ({
      modelName: model.modelName,
      timestamp: format(new Date(history.timestamp), "MM/dd HH:mm"),
      relevancy: history.relevancy,
    }))
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} style={{ backgroundColor: '#1e1e2f' }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis 
          dataKey="timestamp" 
          angle={-45} 
          textAnchor="end" 
          height={80}
          stroke="#fff" 
          tick={{ fontSize: 12 }}
          interval={0}
          ticks={chartData.map((entry, index) => `${entry.timestamp}-${index}`).filter((_, index) => index % 2 === 0)}
        />
        <YAxis domain={[0, 100]} stroke="#fff" />
        <Tooltip
          formatter={(value) => [
            typeof value === "number" ? `${value.toFixed(2)}%` : value,
            "Relevancy",
          ]}
          contentStyle={{ backgroundColor: '#333', borderColor: '#444' }}
        />
        <Legend 
          wrapperStyle={{ color: '#fff', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
        />
        {filteredData.map((model, index) => (
          <Line
            key={model.modelName}
            type="monotone"
            dataKey="relevancy"
            data={chartData.filter((d) => d.modelName === model.modelName)}
            name={model.modelName}
            stroke={`hsl(${index * 120}, 70%, 50%)`}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
