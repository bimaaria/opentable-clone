"use client";

import * as React from "react";
import DatePicker from "react-datepicker";
import Link from "next/link"
import { partySize } from "../../../../../data";

const ReservationCard = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    if(date) {
      setSelectedDate(date);
      return
    }
    setSelectedDate(null)
  }

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="pb-2 font-bold text-center border-b">
        <h4 className="text-lg mr-7">Make a Reservation</h4>
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 font-light border-b" id="">
          {partySize.map(size => (
            <option key={size.value} value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker 
            selected={selectedDate} 
            onChange={handleChangeDate} 
            className="py-3 font-light border-b text-reg w-28" 
            dateFormat="MMMM d" 
            wrapperClassName="w-[48&]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 font-light border-b">
            <option value="">7:30 AM</option>
            <option value="">9:30 AM</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <Link href="reservation/mcd">
          <button className="w-full h-16 px-4 font-bold text-white bg-red-600 rounded">
            Find a Time
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ReservationCard
