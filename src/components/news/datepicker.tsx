import { DateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React, { Fragment } from "react";

interface DateTimeProps {
  date: string;
  onChangeDate: (date: MaterialUiPickersDate) => void;
}

const StaticDatePicker = ({ date, onChangeDate }: DateTimeProps) => {
  return (
    <Fragment>
      <DateTimePicker
        label=""
        inputVariant="outlined"
        format="yyyy年MM月dd日 hh:mm"
        value={new Date(date)}
        onChange={(date) => {
          onChangeDate(date);
        }}
      />
    </Fragment>
  );
};

export default StaticDatePicker;
