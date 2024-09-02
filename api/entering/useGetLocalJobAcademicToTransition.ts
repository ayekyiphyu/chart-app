import { DataItem, FetchDataParams } from "@/api/entering/type";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://opendata.resas-portal.go.jp";
const endPoint = "api/v1/employEducation/localjobAcademic/toTransition";

export const fetchData = async (
  params: FetchDataParams
): Promise<DataItem[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/${endPoint}`, {
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
      params: params,
    });

    if (response.data && response.data.result && response.data.result.data) {
      // Filter the data to include only items for prefecture code "28"
      const filteredData = response.data.result.data.filter(
        (item: any) => item.prefCode === "28"
      );

      // Map the filtered data to match the DataItem type
      return filteredData.map((item: any) => ({
        label: item.label,
        prefCode: item.prefCode,
        data: item.data.map((entry: any) => ({
          year: entry.year,
          value: entry.value,
        })),
      }));
    } else {
      console.error("API response:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
