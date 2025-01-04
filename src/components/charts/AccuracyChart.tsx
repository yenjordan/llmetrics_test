import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AccuracyChartProps {
  data: {
    modelName: string;
    averageAccuracy: number;
  }[];
}

export default function AccuracyChart({ data }: AccuracyChartProps) {
  const filteredData = data.filter(model => ["llama-70b", "mixtral", "gemini"].includes(model.modelName));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={filteredData} style={{ backgroundColor: '#1e1e2f' }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="modelName" stroke="#fff" />
        <YAxis domain={[0, 100]} stroke="#fff" />
        <Tooltip
          formatter={(value) => [`${Number(value).toFixed(2)}%`, "Accuracy"]}
          contentStyle={{ backgroundColor: '#333', borderColor: '#444' }}
        />
        <Legend wrapperStyle={{ color: '#fff' }} />
        <Bar dataKey="averageAccuracy" fill="#686ce4" name="Accuracy Score" />
      </BarChart>
    </ResponsiveContainer>
  );
}
