import { DataItem, FetchDataParams } from "@/api/entering/type";
import { fetchData } from "@/api/entering/useGetLocalJobAcademicToTransition";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Ensure that the props received match the FetchDataParams and any additional required props
export default function EnteringDataPage({
  filter,
  displayMethod,
  matter,
  classification,
  displayType,
  gender,
}: FetchDataParams & { filter: string }) {
  const [data, setData] = useState<DataItem[]>([]);
  const hyogoPrefectureCd = 28;

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const fetchedData = await fetchData({
          prefecture_cd: hyogoPrefectureCd,
          displayMethod,
          matter,
          classification,
          displayType,
          gender,
        });

        setData(fetchedData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchAndSetData();
  }, [displayMethod, matter, classification, displayType, gender]);

  const years = Array.from(
    new Set(data.flatMap((item) => item.data.map((d) => d.year)))
  );
  console.log("years", years);
  const chartData = years.map((year) => {
    const entry: { year: number; [key: string]: number } = { year };
    data.forEach((dataset) => {
      const value = dataset.data.find((d) => d.year === year)?.value || 0;
      entry[dataset.label] = value;
    });
    return entry;
  });

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
            >
              <LabelList
                dataKey={dataset.label}
                position="top"
                style={{ fontSize: 12, fill: "#333" }}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Utility functions to determine colors and labels
function getColor(label: string): string {
  const colors: { [key: string]: string } = {
    兵庫県: "#8884d8",
    全国平均: "#82ca9d",
  };
  return colors[label] || "#8884d8";
}

function getLabel(filter: string): string {
  const labels: { [key: string]: string } = {
    education: "Education",
    employment: "Employment",
    local: "Local",
    outflow: "Outflow",
    inflow: "Inflow",
    netOutflow: "Net Outflow",
    all: "All",
    University: "University Entrance",
    JuniorCollege: "Junior College Entrance",
    total: "Total",
    man: "Men",
    women: "Women",
  };
  return labels[filter] || "";
}
