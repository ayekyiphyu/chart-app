import { DataPoint } from "@/api/entering/type";
import { fetchData } from "@/api/entering/useGetLocalJobAcademicToTransition";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function EnteringDataPage({
  filter,
  displayMethod,
  matter,
  classification,
  displayType,
  gender,
}: DataPoint) {
  const [data, setData] = useState<
    { label: string; data: { year: number; value: number }[] }[]
  >([]);
  const hyogoPrefectureCd = 28;

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const response = await fetchData({
          prefecture_cd: hyogoPrefectureCd,
          displayMethod,
          matter,
          classification,
          displayType,
          gender,
        });

        // Assuming response is directly the result with changes
        setData(response.result.changes);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchAndSetData();
  }, [displayMethod, matter, classification, displayType, gender]);

  // Prepare data for chart
  const years = data.flatMap((item) => item.data.map((d) => d.year));
  const chartData = years.reduce((acc, year) => {
    const entry: { year: number; [key: string]: number } = {
      year: parseInt(year.toString()),
    };
    data.forEach((dataset) => {
      const value = dataset.data.find((d) => d.year === year)?.value || 0;
      entry[dataset.label] = value;
    });
    acc.push(entry);
    return acc;
  }, [] as { year: number; [key: string]: number }[]);

  return (
    <div style={{ width: "100%", height: "400px", marginTop: "32px" }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data.map((dataset) => (
            <Bar
              key={dataset.label}
              dataKey={dataset.label}
              fill={getColor(dataset.label)}
              name={getLabel(filter)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Utility functions to determine colors and labels
function getColor(label: string): string {
  // You can define different colors for different labels
  const colors: { [key: string]: string } = {
    兵庫県: "#8884d8",
    全国平均: "#82ca9d",
  };
  return colors[label] || "#8884d8";
}

function getLabel(filter: string): string {
  switch (filter) {
    case "education":
      return "Education";
    case "employment":
      return "Employment";
    case "local":
      return "Local";
    case "outflow":
      return "Outflow";
    case "inflow":
      return "Inflow";
    case "netOutflow":
      return "Net Outflow";
    case "all":
      return "All";
    case "University":
      return "University Entrance";
    case "JuniorCollege":
      return "Junior College Entrance";
    case "total":
      return "Total";
    case "man":
      return "Men";
    case "women":
      return "Women";
    default:
      return "";
  }
}
