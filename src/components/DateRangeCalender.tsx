import { VFC, useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { format } from "date-fns";

interface Props {
  onSelect: (startDate: string, endDate: string) => void;
  start: string;
  end: string;
}
export const DateRangeCalender: VFC<Props> = (props) => {
  const { onSelect, start, end } = props;
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(start),
      endDate: new Date(end),
      key: "selection",
    },
  ]);
  const handleSelect = (range: RangeKeyDict) => {
    const { startDate, endDate } = range.selection;
    setState([range.selection]);
    if (startDate && endDate && startDate !== endDate)
      onSelect(format(startDate, "yyyy-MM-dd"), format(endDate, "yyyy-MM-dd"));
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
