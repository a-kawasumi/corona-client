import { VFC, useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";

interface Props {
  className?: string;
}
export const DateRangeCalender: VFC<Props> = (props) => {
  const { className } = props;
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date("2021-12-01"),
      endDate: new Date("2021-12-31"),
      key: "selection",
    },
  ]);
  const handleSelect = (range: RangeKeyDict) => {
    console.log(range);
    setState([range.selection]);
  };
  return (
    <DateRange
      className={className}
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      ranges={state}
    />
  );
};
