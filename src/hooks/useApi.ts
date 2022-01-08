import { useCallback } from "react";
import { Prefecture, Api, Patient } from "../types";

const BASE_URL = process.env.REACT_APP_BASE_URL;
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

export interface GetQueries {
  prefId: number;
  dateFrom: string;
  dateTo: string;
}

export const useApi = () => {
  const request = useCallback((url: string) => {
    return fetch(url, OPTIONS)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err: Error) => {
        console.error("エラー: ", err);
      });
  }, []);

  const getPrefectures = useCallback(async () => {
    const data: PrefecturesApi = await request(`${BASE_URL}/prefectures`);
    return data;
  }, [request]);

  const getPatients = useCallback(
    async (queries: GetQueries) => {
      const { prefId, dateFrom, dateTo } = queries;
      const data: PatientsApi = await request(
        `${BASE_URL}/patients?pref_id=${prefId}&date_from=${dateFrom}&date_to=${dateTo}`
      );
      return data;
    },
    [request]
  );

  return {
    getPrefectures,
    getPatients,
  };
};
