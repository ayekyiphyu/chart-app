import { useUser } from "@/auth/auth";
import EnteringDataPage from "@/components/home/component/entering";
import Sidebar from "@/components/sidebar";
import theme from "@/mui-theme.config";
import { Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useState } from "react";

export default function Entering() {
  const titleStyle = {
    backgroundColor: "#1E293B",
    color: "#ffffff",
    height: "48px",
    fontSize: "20px",
    padding: "9px 16px",
  };

  const { user } = useUser();

  // State variables for the filter and additional parameters
  const [filter, setFilter] = useState("education");
  const [classification, setClassification] = useState("someClassification");
  const [displayType, setDisplayType] = useState("someDisplayType");
  const [gender, setGender] = useState(0); // Assuming 0 for male and 1 for female

  // Example of how you might handle updates based on user input or other logic
  const handleSidebarChange = (value: SetStateAction<string>) => {
    setFilter(value);

    // Update other parameters based on the selected filter or other logic
    if (value === "employment") {
      setClassification("employmentClass");
      setDisplayType("employmentDisplay");
      setGender(1); // Example: Change gender to female for this filter
    } else if (value === "education") {
      setClassification("educationClass");
      setDisplayType("educationDisplay");
      setGender(0); // Example: Change gender to male for this filter
    }
  };

  return (
    <div className="mt-0">
      <ThemeProvider theme={theme}>
        <div style={titleStyle} className="flex justify-between">
          タイトル <p>{user?.email || "No Email"}</p>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Sidebar onChange={handleSidebarChange} />
            </Grid>
            <Grid item xs={9}>
              <Paper elevation={3} sx={{ p: 2, ml: 4.8, mr: 4.8, mt: 4 }}>
                <h2>兵庫県の進学者数の推移</h2>

                <EnteringDataPage
                  filter={filter}
                  prefectureCd={28}
                  classification={classification}
                  displayType={displayType}
                  gender={gender}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
}
