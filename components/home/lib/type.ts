export interface GetIncomeDataResponse {
  result: any;
  prefCode: number;
  prefName: string;
  cityCode: number;
  cityName: string;
  label: string;
  years: {
    year: number;
    value: number;
  }[];
}

interface GetPrecutureData {
  prefCode: number;
  prefName: string;
}

export interface GetPrecutureDataResponse {
  result: GetPrecutureData[];
}
