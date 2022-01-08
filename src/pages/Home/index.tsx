import React from "react";
import { usePatient } from "../../hooks/usePatient";
import { PatientGraph } from "../../components/PatientGraph";

export const Home: React.VFC = () => {
  const { graphData } = usePatient();

  return (
    <div>
      <h1>hello home</h1>
      {graphData && (
        <PatientGraph
          data={graphData.options}
          categories={graphData.categories}
        />
      )}
    </div>
  );
};
