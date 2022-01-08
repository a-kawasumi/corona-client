import { useEffect, useMemo, useState } from "react";
import { useApi, PatientsData } from "./useApi";
import { SeriesOptionsType } from "highcharts";
import uniq from "lodash.uniq";

export const usePatient = () => {
  const { getPatients } = useApi();
  const [patient, setPatient] = useState<PatientsData | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const body = await getPatients();
      if (body.ok) {
        setPatient(body.data);
      }
    };
    fetch();
  }, [getPatients]);

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
    patient,
    graphData,
  };
};
