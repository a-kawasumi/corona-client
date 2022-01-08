import { useCallback, useMemo, useState } from "react";
import { useApi, PatientsData, GetQueries } from "./useApi";
import { SeriesOptionsType } from "highcharts";
import uniq from "lodash.uniq";
import { useMount } from "./useMount";
import { Patient } from "../types";

export const usePatient = () => {
  const { getPatients } = useApi();
  const [patient, setPatient] = useState<PatientsData | null>(null);
  const isMounted = useMount();

  const fetchPatients = useCallback(
    async (queries: GetQueries) => {
      const body = await getPatients(queries);
      if (body.ok && isMounted()) {
        const prefecture = body.data.prefecture;
        // todo: 暫定措置 apiで重複があるので修正する
        const patients = body.data.patients.reduce(
          (previousValue: Patient[], currentValue) => {
            const isTarget = prefecture.id === currentValue.prefecture_id;
            if (!isTarget) {
              return previousValue;
            }
            const isFirst = previousValue.length === 0;
            const isUniq = previousValue.every(
              (prev) => prev.id !== currentValue.id
            );
            if (isUniq || isFirst) {
              previousValue.push(currentValue);
            }
            return previousValue;
          },
          []
        );
        if (patients != null)
          setPatient({
            patients,
            prefecture,
          });
      } else {
        console.error(body.message);
      }
    },
    [getPatients, isMounted]
  );

  const graphData = useMemo(() => {
    if (!patient) return null;
    const patients = patient.patients.map((p) => [p.date, p.people]);
    const categories = patient.patients.map((p) => p.date);
    const first = categories[0];
    const last = categories.slice(-1)[0];
    const subtitleText = first === last ? first : `${first} ~ ${last}`;
    const options: SeriesOptionsType[] = [
      {
        type: "line",
        name: patient.prefecture.name,
        data: uniq(patients),
      },
    ];
    return {
      options,
      categories,
      subtitleText,
    };
  }, [patient]);

  return {
    fetchPatients,
    patient,
    graphData,
  };
};
