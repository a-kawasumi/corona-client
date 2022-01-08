import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePatient } from "../../hooks/usePatient";
import { GetQueries } from "../../hooks/useApi";
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
  const [queries, setQueries] = useState<GetQueries>({
    prefId: 1,
    dateFrom: "20211201",
    dateTo: "20211231",
  });

  useEffect(() => {
    fetchPatients(queries);
  }, [queries, fetchPatients]);

  const handleSelect = useCallback((id: number) => {
    setQueries((prev) => {
      return {
        ...prev,
        prefId: id,
      };
    });
  }, []);

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

  const handleSelectDate = useCallback((dateFrom: string, dateTo: string) => {
    setQueries((prev) => {
      return {
        ...prev,
        dateFrom,
        dateTo,
      };
    });
  }, []);

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
            subtitleText={graphData.subtitleText}
          />
        )}
        {isShowDateRange && (
          <Calender ref={calenderRef}>
            <DateRangeCalender onSelect={handleSelectDate} />
          </Calender>
        )}
      </Graph>
    </div>
  );
};
