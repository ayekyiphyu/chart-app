import { useUser } from "@/auth/auth";
import EnteringDataPage from "@/components/home/component/entering";
import Sidebar from "@/components/sidebar";
import theme from "@/mui-theme.config";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useState } from "react";

export default function Entering() {
  const titleStyle = {
    backgroundColor: "#1E293B",
    color: "#ffffff",
    height: "48px",
    fontSize: "20px",
    padding: "9px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const { user } = useUser();

  // State variables for the filter and additional parameters
  const [filter, setFilter] = useState("education");
  const [classification, setClassification] = useState("1"); // Default value "1" for education
  const [displayType, setDisplayType] = useState("10"); // Default value "10" for all education
  const [gender, setGender] = useState(0); // Default value 0 for all genders

  // Handle filter change and update parameters accordingly
  const handleSidebarChange = (value: string) => {
    setFilter(value);

    // Update other parameters based on the selected filter
    switch (value) {
      case "employment":
        setClassification("2"); // Set to "2" for employment
        setDisplayType("20"); // For employment display type
        setGender(0); // Set to all genders
        break;
      case "education":
        setClassification("1"); // Set to "1" for education
        setDisplayType("10"); // For all education display type
        setGender(0); // Set to all genders
        break;
      default:
        setClassification("1");
        setDisplayType("10");
        setGender(0);
        break;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", height: "100vh" }}>
        <Box sx={titleStyle}>
          <Typography variant="h6">タイトル</Typography>
          <Typography variant="body1">{user?.email || "No Email"}</Typography>
        </Box>
        <Grid container spacing={3} sx={{ padding: 3 }}>
          <Grid item xs={3}>
            <Sidebar onChange={handleSidebarChange} />
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h5">兵庫県の進学者数の推移</Typography>
              <EnteringDataPage
                filter={filter}
                classification={classification}
                displayType={displayType}
                gender={gender}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
