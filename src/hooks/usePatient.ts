import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi, PatientsData, GetQueries } from "./useApi";
import { SeriesOptionsType } from "highcharts";
import uniq from "lodash.uniq";
import { useMount } from "./useMount";

const defaultQueries: GetQueries = {
  prefId: 1,
  dateFrom: "20211201",
  dateTo: "20211231",
};

export const usePatient = () => {
  const { getPatients } = useApi();
  const [patient, setPatient] = useState<PatientsData | null>(null);
  const isMounted = useMount();

  const fetchPatients = useCallback(
    async (queries: GetQueries) => {
      console.log("fetchPatients", queries);
      const body = await getPatients(queries);
      if (body.ok && isMounted()) {
        setPatient(body.data);
      }
    },
    [getPatients, isMounted]
  );

  useEffect(() => {
    fetchPatients(defaultQueries);
  }, [fetchPatients]);

  const graphData = useMemo(() => {
    if (!patient) return null;
    const patients = patient.patients.map((p) => [p.date, p.people]);
    const categories = patient.patients.map((p) => p.date);
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
    };
  }, [patient]);

  return {
    fetchPatients,
    patient,
    graphData,
  };
};
