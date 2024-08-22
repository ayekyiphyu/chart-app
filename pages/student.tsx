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

interface TransitionData {
  year: string;
  employment: number;
  academic: number;
}

const API_KEY = "TeJMKn1SzMISYGHtaAfdKwxpTFaQINogLBSiHtyx";
const BASE_URL = "https://opendata.resas-portal.go.jp";
const endPoint =
  "api/v1/employEducation/localjobAcademic/toTransition?prefecture_cd=28&displayMethod=0&matter=1&classification=1&displayType=10&gender=0";

const TransitionPage = () => {
  const [data, setData] = useState<TransitionData[]>([]);
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

        console.log("Full API Response:", response.data);

        // Assuming response.data.result.data is the correct path based on typical API structures
        if (
          response.data &&
          response.data.result &&
          Array.isArray(response.data.result.data) &&
          response.data.result.data.length > 0
        ) {
          const parsedData: TransitionData[] = response.data.result.data.map(
            (item: { year: string; employment: number; academic: number }) => ({
              year: item.year,
              employment: item.employment,
              academic: item.academic,
            })
          );
          setData(parsedData);
        } else {
          setError("No data found in the API response.");
        }
      } catch (error: any) {
        console.error("API Error:", error);
        setError(error.response?.data?.message || error.message);
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

  if (!data || data.length === 0) {
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
