import React from "react";
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

const TaskBarChart = ({ data }) => {
  // Fallback data to ensure chart always renders
  const safeData = Array.isArray(data) && data.length > 0
    ? data
    : [
        { priority: "Low", count: 0 },
        { priority: "Medium", count: 0 },
        { priority: "High", count: 0 },
      ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md shadow-gray-100">
      <h5 className="text-xl font-medium mb-4">Task Priority Distribution</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={safeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priority" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskBarChart;
