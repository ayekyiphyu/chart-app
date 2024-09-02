import { CityDataResponse } from "@/api/city/type";
import axios from "axios";
import { useState } from "react";

export default function useCity(): [
  CityDataResponse[],
  boolean,
  () => Promise<void>
] {
  const [response, setResponse] = useState<CityDataResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getCity() {
    setResponse([]);
    setIsLoading(true);

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const BASE_URL = "https://opendata.resas-portal.go.jp";
    const endPoint = "api/v1/cities";
    const headers = {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.get(`${BASE_URL}/${endPoint}`, {
        headers: headers,
      });

      if (res.data.result) {
        setResponse(res.data.result);
      } else {
        setResponse(res.data);
      }
    } catch (err: any) {
      console.error("API Error:", err);
      if (!err?.response) {
        console.log("Network error");
      } else if (!err.response?.data) {
        console.log("No response data Error");
      } else {
        const message = err.response.data?.message;
        if (message) {
          console.log("API Error message: Show error snackbar");
        } else {
          console.log("Unknown Error");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return [response, isLoading, getCity];
}
