import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define an interface for the data you expect from the API response
interface TransitionData {
  year: string; // Adjust according to actual data field
  employment: number; // Adjust according to actual data field
  academic: number; // Adjust according to actual data field
}

const API_KEY = "TeJMKn1SzMISYGHtaAfdKwxpTFaQINogLBSiHtyx";
const BASE_URL = "https://opendata.resas-portal.go.jp";
const endPoint = "api/v1/employEducation/localjobAcademic/toTransition";

const TransitionPage = () => {
  const [data, setData] = useState<TransitionData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${endPoint}`, {
          headers: {
            "X-API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
        });
        // Log API response
        console.log("API Response:", response.data);

        // Process the API response to extract relevant data
        // Adapt this according to the actual response structure
        setData(
          response.data.result.map((item: any) => ({
            year: item.year, // Adjust according to actual data structure
            employment: item.employment, // Adjust according to actual data structure
            academic: item.academic, // Adjust according to actual data structure
          }))
        );
      } catch (error: any) {
        console.error("API Error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Employment and Academic Transitions</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="employment"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line type="monotone" dataKey="academic" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransitionPage;
