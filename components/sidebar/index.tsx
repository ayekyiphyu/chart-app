import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  Link as MuiLink,
  Radio,
  RadioGroup,
} from "@mui/material";
import NextLink from "next/link";
import React, { useState } from "react";

interface SidebarProps {
  onChange: (value: string) => void;
}

export default function Sidebar({ onChange }: SidebarProps) {
  // Separate state for each category if needed
  const [filter, setFilter] = useState("education");

  // Handle changes in radio buttons
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setFilter(value);
    onChange(value);
  };

  return (
    <div className="bg-white w-[299px] shadow-outline">
      <h2 className="font-bold text-[18px] pt-[24px] pb-[32px] pl-[24px]">
        フィルター
      </h2>
      <p className="pl-[15px]">
        <NextLink href="/city" passHref>
          <MuiLink className="text-blue-500 hover:underline">
            兵庫県一覧
          </MuiLink>
        </NextLink>
      </p>
      <List>
        <ListItem>
          <FormControl component="fieldset">
            {/* Display Category */}
            <FormLabel component="legend" className="font-bold text-[16px]">
              表示分類
            </FormLabel>
            <RadioGroup
              aria-label="display-category"
              name="display-category"
              value={filter}
              onChange={handleChange}
            >
              <FormControlLabel
                value="education"
                control={<Radio />}
                label="進学"
              />
              <FormControlLabel
                value="employment"
                control={<Radio />}
                label="就職"
              />
            </RadioGroup>

            <Divider className="my-2" />

            {/* Display Content */}
            <FormLabel
              component="legend"
              className="font-bold text-[16px] pt-[32px]"
            >
              表示内容
            </FormLabel>
            <RadioGroup
              aria-label="display-content"
              name="display-content"
              value={filter}
              onChange={handleChange}
            >
              <FormControlLabel
                value="local"
                control={<Radio />}
                label="地元"
              />
              <FormControlLabel
                value="outflow"
                control={<Radio />}
                label="流出"
              />
              <FormControlLabel
                value="inflow"
                control={<Radio />}
                label="流入"
              />
              <FormControlLabel
                value="netOutflow"
                control={<Radio />}
                label="純流出"
              />
            </RadioGroup>

            <Divider className="my-2" />

            {/* Display Classification */}
            <FormLabel
              component="legend"
              className="font-bold text-[16px] pt-[32px]"
            >
              表示区分
            </FormLabel>
            <RadioGroup
              aria-label="display-classification"
              name="display-classification"
              value={filter}
              onChange={handleChange}
            >
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="すべての進学"
              />
              <FormControlLabel
                value="University"
                control={<Radio />}
                label="大学進学"
              />
              <FormControlLabel
                value="JuniorCollege"
                control={<Radio />}
                label="短期大学進学"
              />
            </RadioGroup>

            <Divider className="my-2" />

            {/* Gender */}
            <FormLabel
              component="legend"
              className="font-bold text-[16px] pt-[32px]"
            >
              性別
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={filter}
              onChange={handleChange}
            >
              <FormControlLabel
                value="total"
                control={<Radio />}
                label="総数"
              />
              <FormControlLabel value="man" control={<Radio />} label="男性" />
              <FormControlLabel
                value="women"
                control={<Radio />}
                label="女性"
              />
            </RadioGroup>
          </FormControl>
        </ListItem>
      </List>
    </div>
  );
}
