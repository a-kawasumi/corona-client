import React, { useCallback, useEffect, useState } from "react";
import { usePatient } from "../../hooks/usePatient";
import { PatientGraph } from "../../components/PatientGraph";
import { JapanMap } from "../../components/JapanMap";
import styled from "styled-components";
import { DateRangeCalender } from "../../components/DateRangeCalender";

const Selector = styled.div`
  display: flex;
`;

const Graph = styled.div`
  position: relative;
`;

const StyledDateRangeCalender = styled(DateRangeCalender)`
  position: absolute;
  top: 0;
  right: 200px;
  box-shadow: 0 0 30px rgb(0 0 0 / 10%);
`;

export const Home: React.VFC = () => {
  const { graphData, fetchPatients } = usePatient();
  const [isShowDateRange, setIsShowDateRange] = useState(false);

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

  useEffect(() => {
    const dateEl = document.querySelector(".highcharts-subtitle");
    console.log(dateEl);
    if (!dateEl) return;
    // @ts-expect-error
    dateEl.style.cursor = "pointer";
    const show = () => setIsShowDateRange(true);
    const close = () => setIsShowDateRange(false);
    const click = (event: MouseEvent) => {
      const inside = dateEl.contains(event.target as Node);
      if (!inside) close();
    };
    document.addEventListener("click", click);
    dateEl.addEventListener("click", show);
    return () => {
      document.removeEventListener("click", click);
      dateEl.removeEventListener("click", show);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphData]);

  return (
    <div>
      <Selector>
        <JapanMap onClickPrefecture={handleSelect} />
      </Selector>
      <Graph>
        {graphData && (
          <PatientGraph
            data={graphData.options}
            categories={graphData.categories}
          />
        )}
        {isShowDateRange && <StyledDateRangeCalender />}
      </Graph>
    </div>
  );
};
