import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#60a5fa", "#facc15", "#34d399"]; // blue, yellow, green

const TaskPieChart = ({ data }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md shadow-gray-100">
      <h5 className="text-xl font-medium mb-4">Task Status Distribution</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={safeData}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {safeData.map((entry, index) => (
              <Cell key={index} fill={["#60a5fa", "#facc15", "#34d399"][index % 3]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};


export default TaskPieChart;
