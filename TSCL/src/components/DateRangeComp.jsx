import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeComp = () => {
  // date state
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  // open close
  const [open, setOpen] = useState(false);

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <input
        value={
          range[0].startDate && range[0].endDate
            ? `${format(range[0].startDate, "dd/MM/yyyy")}  -  ${format(
                range[0].endDate,
                "dd/MM/yyyy"
              )}`
            : "dd/mm/yy - dd/mm/yy"
        }
        readOnly
        className="w-60 outline-none rounded-md px-3 font-lexend py-1.5 text-center"
        onClick={() => setOpen((open) => !open)}
      />

      <button className="bg-primary px-4 py-1.5 rounded-md text-white ml-2 ">Search</button>

      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => {
              setRange([item.selection]);
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            maxDate={new Date()}
            direction="horizontal "
            className="absolute bg-gray-100 mt-2 mx-4"
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeComp;