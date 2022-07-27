import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import he from 'date-fns/locale/he';
import { format } from 'date-fns'

const DatePickerCustom = (props) => {
  registerLocale('he', he);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    let startFormated = start;
    let endFormated = end;
    if (start != null) {
      startFormated = format(start, 'yyyy-MM-dd');
    }
    if (end != null) {
      endFormated = format(end, 'yyyy-MM-dd')
    }



    props.onChange({ from: startFormated, to: endFormated });
  };

  return (

    <DatePicker locale={he} selectsRange startDate={startDate} isClearable
      endDate={endDate} selected={startDate} onChange={onChange} />

  );
};

export default DatePickerCustom;
export const parseDate = dateString => {
  if (dateString != null) {
    return Date.parse(dateString.replace(/-/g, '/').replace('T', ' '));
    }
  //}else{
  //  return '';
 // }
}

export const formatDate = date => {
  if(date!=null){
  return format(date, 'dd/MM/yyyy');
}
}

