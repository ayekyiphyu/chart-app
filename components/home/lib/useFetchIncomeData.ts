import axios from "axios";
import { useEffect, useState } from "react";
import { GetIncomeDataResponse } from "./type";

export default function useFetchIncomeData() {
  const [data, setData] = useState<GetIncomeDataResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(
        "https://opendata.resas-portal.go.jp/api/v1/forestry/income/forContractRevenue",
        {
          headers: {
            "X-API-KEY": "i0TRv1OjKWR9yMNYcUwfdBWTT07EBnaiUnLZLhl9",
            "Content-Type": "application/json",
          },
          params: {
            cityCode: 11362,
            prefCode: 11,
          },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err: any) => {
        setError("An error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
}
