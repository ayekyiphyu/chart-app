import { useUser } from "@/auth/auth";
import EnteringDataPage from "@/components/home/component/entering";
import Sidebar from "@/components/sidebar";
import { Box, Link as MUILink, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function Weather() {

    const { user } = useUser();

    return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Box
        sx={{
          backgroundColor: "#1E293B",
          color: "#ffffff",
          height: "48px",
          fontSize: "20px",
          padding: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Welcome to my page</Typography>
       <div className="flex">
       <Typography variant="h6">{user?.email || "No Email"}</Typography>
        <MUILink href="/signOut" color="inherit" underline="none" className="pl-[2rem]">
          SignOut
        </MUILink>
       </div>
      </Box>
     
        <Box
          sx={{
            width: "75%",
            backgroundColor: "#ffffff",
            marginLeft: "48px",
            borderRadius: "8px",
            marginTop: "32px",
            height: "490px",
            padding: "16px",
            border: "1px solid #ddd",
          }}
        >
          <Paper
            sx={{
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
          <p>Test</p>
            
          </Paper>
        </Box>
      </Box>
  );
}
