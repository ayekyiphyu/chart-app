import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  cityName: string;
  employment: number;
  education: number;
  local: number;
  outflow: number;
  inflow: number;
  netOutflow: number;
  all: number;
  juniorCollege: number;
  universityEnterance: number;
  total: number;
  man: number;
  women: number;
}

//const API_KEY = "TeJMKn1SzMISYGHtaAfdKwxpTFaQINogLBSiHtyx";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://opendata.resas-portal.go.jp";
const endPoint = "api/v1/employEducation/localjobAcademic/toTransition";

interface EnteringDataPageProps {
  filter: string;
  classification: string;
  displayType: string;
  gender: number;
}

export default function EnteringDataPage({
  filter,
  classification,
  displayType,
  gender,
}: EnteringDataPageProps) {
  const [data, setData] = useState<DataPoint[]>([]);
  const hyogoPrefectureCd = 28; // Prefecture code for Hyogo

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${endPoint}`, {
          headers: {
            "X-API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
          params: {
            prefecture_cd: hyogoPrefectureCd,
            displayMethod: 1,
            matter: 0,
            classification: classification,
            displayType: displayType,
            gender: gender,
          },
        });

        console.log("API Response:", response.data);

        if (
          response.data &&
          response.data.result &&
          response.data.result.data
        ) {
          const parsedData: DataPoint[] = response.data.result.data.map(
            (item: {
              cityName: string;
              employment: number;
              education: number;
              local: number;
              outflow: number;
              inflow: number;
              netOutflow: number;
              all: number;
              juniorCollege: number;
              universityEnterance: number;
              total: number;
              man: number;
              women: number;
            }) => ({
              cityName: item.cityName,
              employment: item.employment,
              education: item.education,
              local: item.local,
              outflow: item.outflow,
              inflow: item.inflow,
              netOutflow: item.netOutflow,
              all: item.all,
              juniorCollege: item.juniorCollege,
              universityEnterance: item.universityEnterance,
              total: item.total,
              man: item.man,
              women: item.women,
            })
          );

          console.log("Parsed Data:", parsedData);
          setData(parsedData);
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [classification, displayType, gender]);

  const chartData = {
    labels: data.map((item) => item.cityName),
    datasets: [
      {
        label: getLabel(filter),
        data: data.map((item) => getDataByFilter(item, filter)),
        backgroundColor: "#8884d8",
        barThickness: 20,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={chartData} />
    </div>
  );
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

function getDataByFilter(item: DataPoint, filter: string): number {
  switch (filter) {
    case "education":
      return item.education;
    case "employment":
      return item.employment;
    case "local":
      return item.local;
    case "outflow":
      return item.outflow;
    case "inflow":
      return item.inflow;
    case "netOutflow":
      return item.netOutflow;
    case "all":
      return item.all;
    case "University":
      return item.universityEnterance;
    case "JuniorCollege":
      return item.juniorCollege;
    case "total":
      return item.total;
    case "man":
      return item.man;
    case "women":
      return item.women;
    default:
      return 0;
  }
}
