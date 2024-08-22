import {
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
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

interface CityDataResponse {
  prefCode: number;
  cityCode: string;
  cityName: string;
  bigCityFlag: string;
}

const API_KEY = "TeJMKn1SzMISYGHtaAfdKwxpTFaQINogLBSiHtyx";
const BASE_URL = "https://opendata.resas-portal.go.jp";
const endPoint = "api/v1/cities";
const HYOGO_PREF_CODE = 28; // Hyogo Prefecture code

export default function CityData() {
  const [cityData, setCityData] = useState<CityDataResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${endPoint}`, {
          headers: {
            "X-API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
        });
        console.log("API Response:", response.data); // Log API response

        // Filter cities to only include those in Hyogo Prefecture
        const hyogoCities = response.data.result.filter(
          (city: CityDataResponse) => city.prefCode === HYOGO_PREF_CODE
        );

        setCityData(hyogoCities);
      } catch (error) {
        console.error("API Error:", error); // Log error details
        setError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (cityCode: string) => {
    setSelectedCities((prev) => {
      const newSetPref = new Set(prev);
      if (newSetPref.has(cityCode)) {
        newSetPref.delete(cityCode);
      } else {
        newSetPref.add(cityCode);
      }
      return newSetPref;
    });
  };

  const filteredData = cityData.filter((city) =>
    selectedCities.has(city.cityCode)
  );

  const chartData = filteredData.map((item) => ({
    cityName: item.cityName,
    prefCode: item.prefCode,
  }));

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h4" component="h2" gutterBottom>
              City Data
            </Typography>
            {isLoading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">Error: {error}</Typography>}
            {cityData.length > 0 ? (
              <div>
                <div>
                  {cityData.map((city) => (
                    <FormControlLabel
                      key={city.cityCode}
                      control={
                        <Checkbox
                          checked={selectedCities.has(city.cityCode)}
                          onChange={() => handleCheckboxChange(city.cityCode)}
                        />
                      }
                      label={city.cityName}
                    />
                  ))}
                </div>
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
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
                </div>
              </div>
            ) : (
              <Typography>No data to display.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
