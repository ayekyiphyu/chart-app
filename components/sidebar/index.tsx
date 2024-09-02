import NextLink from "next/link";
import { useState } from "react";

interface SidebarProps {
  onChange: (name: string, value: string) => void;
}

export default function Sidebar({ onChange }: SidebarProps) {
  const [filter, setFilter] = useState("education");
  const [displayMethod, setDisplayMethod] = useState("0");
  const [matter, setMatter] = useState("0");
  const [classification, setClassification] = useState("1");
  const [displayType, setDisplayType] = useState("10");
  const [gender, setGender] = useState("0");

  const handleChange = (name: string, value: string) => {
    switch (name) {
      case "filter":
        setFilter(value);
        break;
      case "displayMethod":
        setDisplayMethod(value);
        break;
      case "matter":
        setMatter(value);
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
      default:
        break;
    }
    onChange(name, value);
  };

  return (
    <div className="bg-white w-[299px] shadow-outline h-[200vh]">
      <h2 className="font-bold text-[18px] pt-[24px] pb-[32px] pl-[24px]">
        フィルター
      </h2>
      <p className="pl-[32px] pb-[32px]">
        <NextLink href="/city" passHref>
          <span className="text-blue-500 hover:underline">兵庫県一覧</span>
        </NextLink>
      </p>
      <ul className="pl-[32px]">
        <li>
          <fieldset>
            {/* Display Method */}
            <legend className="font-bold text-[16px] pb-[8px]">表示方法</legend>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="displayMethod"
                  value="0"
                  checked={displayMethod === "0"}
                  onChange={(e) =>
                    handleChange("displayMethod", e.target.value)
                  }
                />
                実数
              </label>
            </div>
            <div>
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="displayMethod"
                  value="1"
                  checked={displayMethod === "1"}
                  onChange={(e) =>
                    handleChange("displayMethod", e.target.value)
                  }
                />
                就職率・進学率
              </label>
            </div>

            {/* Matter */}
            <legend className="font-bold text-[16px] pt-[32px] pb-[8px]">
              表示内容
            </legend>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="matter"
                  value="0"
                  checked={matter === "0"}
                  onChange={(e) => handleChange("matter", e.target.value)}
                />
                地元就職
              </label>
            </div>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="matter"
                  value="1"
                  checked={matter === "1"}
                  onChange={(e) => handleChange("matter", e.target.value)}
                />
                流出
              </label>
            </div>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="matter"
                  value="2"
                  checked={matter === "2"}
                  onChange={(e) => handleChange("matter", e.target.value)}
                />
                流入
              </label>
            </div>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="matter"
                  value="3"
                  checked={matter === "3"}
                  onChange={(e) => handleChange("matter", e.target.value)}
                />
                純流入
              </label>
            </div>

            {/* Classification */}
            <legend className="font-bold text-[16px] pt-[32px] pb-[8px]">
              表示分類
            </legend>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="classification"
                  value="1"
                  checked={classification === "1"}
                  onChange={(e) =>
                    handleChange("classification", e.target.value)
                  }
                />
                進学
              </label>
            </div>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="classification"
                  value="2"
                  checked={classification === "2"}
                  onChange={(e) =>
                    handleChange("classification", e.target.value)
                  }
                />
                就職
              </label>
            </div>

            {/* Display Type */}
            <legend className="font-bold text-[16px] pt-[32px] pb-[8px]">
              表示区分
            </legend>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="displayType"
                  value="10"
                  checked={displayType === "10"}
                  onChange={(e) => handleChange("displayType", e.target.value)}
                />
                すべての進学
              </label>
            </div>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="displayType"
                  value="11"
                  checked={displayType === "11"}
                  onChange={(e) => handleChange("displayType", e.target.value)}
                />
                大学進学
              </label>
            </div>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="displayType"
                  value="12"
                  checked={displayType === "12"}
                  onChange={(e) => handleChange("displayType", e.target.value)}
                />
                短期大学進学
              </label>
            </div>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="displayType"
                  value="20"
                  checked={displayType === "20"}
                  onChange={(e) => handleChange("displayType", e.target.value)}
                />
                就職
              </label>
            </div>

            {/* Gender */}
            <legend className="font-bold text-[16px] pt-[32px] pb-[8px]">
              性別
            </legend>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="gender"
                  value="0"
                  checked={gender === "0"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
                総数
              </label>
            </div>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="gender"
                  value="1"
                  checked={gender === "1"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
                男性
              </label>
            </div>
            <div className="pb-[8px]">
              <label>
                <input
                  className="mr-[10px]"
                  type="radio"
                  name="gender"
                  value="2"
                  checked={gender === "2"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
                女性
              </label>
            </div>
          </fieldset>
        </li>
      </ul>
    </div>
  );
}
