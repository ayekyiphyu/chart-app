export interface DataPoint {
  // employment: number;
  // education: number;
  // local: number;
  // outflow: number;
  // inflow: number;
  // netOutflow: number;
  // all: number;
  // juniorCollege: number;
  // universityEnterance: number;
  // total: number;
  // man: number;
  // women: number;
  // label: string;
  // filter:string;
  prefCode: string;
  data: OptionsValue[];
  prefecture_cd: number;
  displayMethod: number;
  matter: number;
  classification: string;
  displayType: string;
  gender: number;
}

export interface OptionsValue {
  year: number;
  value: number;
}

// export type FetchDataParams = {
//   prefecture_cd: number;
//   displayMethod: number;
//   matter: number;
//   classification: string;
//   displayType: string;
//   gender: number;
// };
