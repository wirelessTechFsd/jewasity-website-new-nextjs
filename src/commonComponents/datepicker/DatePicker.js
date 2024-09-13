import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import Button from "../button/Button";
import moment from "moment";

export default function CustomDatePicker({
  startDate,
  setStartDate,
  handleApplyDateFilter,
  isDateFilterApplied,
}) {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button
      onClick={onClick}
      ref={ref}
      title={"Choose Date"}
      buttonStyle={
        "w-[151px] h-[48px] pl-[7px] bg-white-1 rounded-[28px] flex items-center  gap-[14px]"
      }
      textStyle={"text-grey-dark font-medium text-[12px]"}
      subText={isDateFilterApplied ? moment(startDate).format("DD/MM/YY") : "Date"}
      subTextStyle={"text-[11px] text-grey-dark opacity-[0.6] font-regular"}
      icon={<img src="/icons/circularCalender.svg" />}
    />
  ));
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        handleApplyDateFilter(date);
      }}
      customInput={<ExampleCustomInput />}
    />
  );
}
