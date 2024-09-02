import { CityDataResponse } from "@/api/city/type";
import useGetCity from "@/api/city/useGetCity";
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

const HYOGO_PREF_CODE = 28;

export default function CityData() {
  const [cityData, setCityData] = useState<CityDataResponse[]>([]);
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());

  const [response, isLoading, getCity] = useGetCity();

  useEffect(() => {
    getCity();
  }, []);

  useEffect(() => {
    if (response.length > 0) {
      const hyogoCities = response.filter(
        (city) => city.prefCode === HYOGO_PREF_CODE
      );
      setCityData(hyogoCities);
    }
  }, [response]);

  const handleCheckboxChange = (cityCode: string) => {
    setSelectedCities((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cityCode)) {
        newSet.delete(cityCode);
      } else {
        newSet.add(cityCode);
      }
      return newSet;
    });
  };

  const filteredData = cityData.filter((city) =>
    selectedCities.has(city.cityCode)
  );

  const chartData = filteredData.map((item) => ({
    cityName: item.cityName,
    prefCode: item.prefCode,
  }));

  // Debugging logs
  console.log("City Data:", cityData);
  console.log("Filtered Data:", filteredData);
  console.log("Chart Data:", chartData);

  const cityStyleBox: React.CSSProperties = {
    padding: "16px",
    border: "1px solid #ddd",
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    flexWrap: "wrap",
  };

  return (
    <div style={cityStyleBox}>
      <h2 className="text-center">City Data</h2>
      {isLoading && <p>Loading...</p>}
      {response.length === 0 && !isLoading && <p>No data to display.</p>}
      {cityData.length > 0 && (
        <div>
          <div style={cityStyleBox}>
            {cityData.map((city) => (
              <label key={city.cityCode} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={selectedCities.has(city.cityCode)}
                  onChange={() => handleCheckboxChange(city.cityCode)}
                />
                {city.cityName}
              </label>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {filteredData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cityName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="prefCode"
                    stroke="#8884d8"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>
                No cities selected or no data available for selected cities.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
