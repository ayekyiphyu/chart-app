export interface DataEntry {
  year: number;
  value: number;
}

export interface DataItem {
  label: string;
  prefCode: string;
  data: DataEntry[];
}

// Update the DataPoint type to match the structure returned by the API
export interface DataPoint extends FetchDataParams {
  filter: string;
}

export interface FetchDataParams {
  prefecture_cd: number;
  displayMethod: string;
  matter: string;
  classification: string;
  displayType: string;
  gender: string;
}
