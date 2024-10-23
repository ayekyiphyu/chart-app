import { useUser } from "@/auth/auth";
import EnteringDataPage from "@/components/home/component/entering";
import Sidebar from "@/components/sidebar";
import { Box, Link as MUILink, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function Entering() {
  const { user } = useUser();
  const [filter, setFilter] = useState<string>("education");
  const [classification, setClassification] = useState<string>("1");
  const [displayType, setDisplayType] = useState<string>("10");
  const [gender, setGender] = useState<string>("0");
  const [matter, setMatter] = useState<string>("0");
  const [prefecture_cd] = useState<number>(28);
  const [displayMethod, setDisplayMethod] = useState<number>(0);

  const handleSidebarChange = (name: string, value: string) => {
    switch (name) {
      case "filter":
        setFilter(value);
        break;
      case "classification":
        setClassification(value);
        break;
      case "displayType":
        setDisplayType(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "matter":
        setMatter(value);
        break;
      case "displayMethod":
        setDisplayMethod(Number(value));
        break;
      default:
        break;
    }
  };

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
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Box sx={{ width: "299px" }}>
          <Sidebar onChange={handleSidebarChange} />
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
            <Typography variant="h5">兵庫県の進学者数の推移</Typography>
            <EnteringDataPage
              prefecture_cd={prefecture_cd}
              displayType={displayType}
              classification={classification}
              matter={matter}
              displayMethod={displayMethod.toString()}
              gender={gender}
              filter={filter}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
