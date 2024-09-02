import { useUser } from "@/auth/auth";
import EnteringDataPage from "@/components/home/component/entering";
import Sidebar from "@/components/sidebar";
import { useState } from "react";

export default function Entering() {
  const titleStyle: React.CSSProperties = {
    backgroundColor: "#1E293B",
    color: "#ffffff",
    height: "48px",
    fontSize: "20px",
    padding: "9px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
  };

  const gridContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "16px",
  };

  const sidebarStyle: React.CSSProperties = {
    width: "299px",
  };

  const contentStyle: React.CSSProperties = {
    width: "75%",
    background: "#ffffff",
    marginLeft: "48px",
    borderRadius: "8px",
    marginTop: "32px",
    height: "490px",
  };

  const paperStyle: React.CSSProperties = {
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

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
              displayMethod={displayMethod.toString()} // Ensure this matches EnteringDataPage's expected type
              gender={gender}
              filter={filter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
