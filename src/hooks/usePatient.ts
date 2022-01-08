import { useCallback, useMemo, useState } from "react";
import { useApi, PatientsData, GetQueries } from "./useApi";
import { SeriesOptionsType } from "highcharts";
import uniq from "lodash.uniq";
import { useMount } from "./useMount";

export const usePatient = () => {
  const { getPatients } = useApi();
  const [patient, setPatient] = useState<PatientsData | null>(null);
  const isMounted = useMount();

  const fetchPatients = useCallback(
    async (queries: GetQueries) => {
      const body = await getPatients(queries);
      if (body.ok && isMounted()) {
        const patients = body.data.patients;
        if (patients != null) setPatient(body.data);
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
