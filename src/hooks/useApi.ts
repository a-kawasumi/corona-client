import { useCallback } from "react";
import { Prefecture, Api, Patient } from "../types";

const BASE_URL = "http://127.0.0.1:3000/";
const MODE: RequestMode = "cors";
const OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  mode: MODE,
};

type PrefecturesApi = Api<Prefecture[]>;

export interface PatientsData {
  patients: Patient[];
  prefecture: Prefecture;
}
export type PatientsApi = Api<PatientsData>;

export const useApi = () => {
  const getPrefectures = useCallback(async () => {
    const data: PrefecturesApi = await fetch(`${BASE_URL}/prefectures`, OPTIONS)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err: Error) => {
        console.error("エラー: ", err);
      });
    console.log(data);
    return data;
  }, []);

  const getPatients = useCallback(async () => {
    // todo: query
    const data: PatientsApi = await fetch(
      `${BASE_URL}/patients?pref_id=1&date_from=20211201&date_to=20211231`,
      OPTIONS
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((err: Error) => {
        console.error("エラー: ", err);
      });
    console.log(data);
    return data;
  }, []);

  return {
    getPrefectures,
    getPatients,
  };
};
