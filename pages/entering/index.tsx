import { useUser } from "@/auth/auth";
import EnteringDataPage from "@/components/home/component/entering";
import Sidebar from "@/components/sidebar";
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

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const gridContainerStyle = {
    display: "flex",
    gap: "16px",
  };

  const sidebarStyle = {
    width: "299px",
  };

  const contentStyle = {
    width: "75%",
    background: "#ffffff",
    marginLeft: "48px",
    borderRadius: "8px",
    marginTop: "32px",
    height: "490px",
  };

  const paperStyle = {
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const { user } = useUser();

  const [filter, setFilter] = useState("education");
  const [classification, setClassification] = useState("1");
  const [displayType, setDisplayType] = useState("10");
  const [gender, setGender] = useState(0);
  const [matter, setMatter] = useState(0);
  const [prefecture_cd] = useState(28);
  const [displayMethod, setDisplayMethod] = useState(0);

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
        setGender(Number(value));
        break;
      case "matter":
        setMatter(Number(value));
        break;
      case "displayMethod":
        setDisplayMethod(Number(value));
        break;
      default:
        break;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>
        <span>タイトル</span>
        <span>{user?.email || "No Email"}</span>
      </div>
      <div style={gridContainerStyle}>
        <div style={sidebarStyle}>
          <Sidebar onChange={handleSidebarChange} />
        </div>
        <div style={contentStyle}>
          <div style={paperStyle}>
            <h5>兵庫県の進学者数の推移</h5>
            <EnteringDataPage
              prefecture_cd={prefecture_cd}
              displayType={displayType}
              classification={classification}
              matter={matter}
              displayMethod={displayMethod}
              gender={gender} 
              filter={filter}            />
          </div>
        </div>
      </div>
    </div>
  );
}
