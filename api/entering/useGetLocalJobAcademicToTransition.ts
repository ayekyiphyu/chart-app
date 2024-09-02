import { FetchDataParams } from "@/api/entering/type";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://opendata.resas-portal.go.jp";
const endPoint = "api/v1/employEducation/localjobAcademic/toTransition";

export const fetchData = async (params: FetchDataParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endPoint}`, {
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
      params: params,
    });


    if (response.data && response.data.result && response.data.result.data) {
      return response.data.result.data.map((item: any) => ({
        // employment: item.employment,
        // education: item.education,
        // local: item.local,
        // outflow: item.outflow,
        // inflow: item.inflow,
        // netOutflow: item.netOutflow,
        // all: item.all,
        // juniorCollege: item.juniorCollege,
        // universityEnterance: item.universityEnterance,
        // total: item.total,
        // man: item.man,
        // women: item.women,
        prefecture_cd: item.hyogoPrefectureCd,
        displayMethod: item.displayMethod,
        matter: item.matter,
        classification: item.classification,
        displayType: item.displayType,
        gender: item.gender,
      }));
    } else {
      console.error("API response:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
