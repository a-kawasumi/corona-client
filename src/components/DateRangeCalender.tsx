import { VFC, useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { format } from "date-fns";

interface Props {
  onSelect: (startDate: string, endDate: string) => void;
}
export const DateRangeCalender: VFC<Props> = (props) => {
  const { onSelect } = props;
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date("2021-12-01"),
      endDate: new Date("2021-12-31"),
      key: "selection",
    },
  ]);
  const handleSelect = (range: RangeKeyDict) => {
    const { startDate, endDate } = range.selection;
    setState([range.selection]);
    if (startDate && endDate && startDate !== endDate)
      onSelect(format(startDate, "yyyyMMdd"), format(endDate, "yyyyMMdd"));
  };
  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      ranges={state}
    />
  );
};
