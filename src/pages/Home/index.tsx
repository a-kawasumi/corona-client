import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePatient } from "../../hooks/usePatient";
import { PatientGraph } from "../../components/PatientGraph";
import { JapanMap } from "../../components/JapanMap";
import styled from "styled-components";
import { DateRangeCalender } from "../../components/DateRangeCalender";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const Selector = styled.div`
  margin: 50px 0;
`;

const Graph = styled.div`
  position: relative;
`;

const Calender = styled.div`
  position: absolute;
  top: 0;
  right: 200px;
  box-shadow: 0 0 30px rgb(0 0 0 / 10%);
`;

export const Home: React.VFC = () => {
  const calenderRef = useRef<HTMLDivElement>(null);
  const { graphData, fetchPatients } = usePatient();
  const [isShowDateRange, setIsShowDateRange] = useState(false);
  useOutsideClick<HTMLDivElement>(calenderRef, () => {
    setIsShowDateRange(false);
  });

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
    if (!dateEl) return;
    // @ts-expect-error
    dateEl.style.cursor = "pointer";
    const show = (event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      setIsShowDateRange(true);
    };

    dateEl.addEventListener("click", show);
    return () => {
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
        {isShowDateRange && (
          <Calender ref={calenderRef}>
            <DateRangeCalender />
          </Calender>
        )}
      </Graph>
    </div>
  );
};
