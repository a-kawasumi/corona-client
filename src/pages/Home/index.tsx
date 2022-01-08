import React, { useCallback } from "react";
import { usePatient } from "../../hooks/usePatient";
import { PatientGraph } from "../../components/PatientGraph";
import { JapanMap } from "../../components/JapanMap";
import styled from "styled-components";

const Header = styled.div`
  margin-top: 20px;
`;

export const Home: React.VFC = () => {
  const { graphData, fetchPatients } = usePatient();

  const handleSelect = useCallback(
    (id: number) => {
      fetchPatients({
        prefId: id,
        // todo: date search
        dateFrom: "20211201",
        dateTo: "20211231",
      });
    },
    [fetchPatients]
  );

  return (
    <div>
      <Header />
      <JapanMap onClickPrefecture={handleSelect} />
      {graphData && (
        <PatientGraph
          data={graphData.options}
          categories={graphData.categories}
        />
      )}
    </div>
  );
};
