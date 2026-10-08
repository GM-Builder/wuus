"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DemoDialog } from "./demo-dialog";
import { dateValue, todayISO, stayNights } from "./booking-model";
import s from "./demo.module.css";

export function DateCalendar({
  start,
  end,
  onApply,
  onClose,
}: {
  start: string;
  end: string;
  onApply: (start: string, end: string) => void;
  onClose: () => void;
}) {
  const today = todayISO();
  const [month, setMonth] = useState(
    () =>
      new Date(dateValue(start || today)).getUTCFullYear() * 12 +
      new Date(dateValue(start || today)).getUTCMonth(),
  );
  const [range, setRange] = useState({ start, end });
  const [selectingEnd, setSelectingEnd] = useState(!end && !!start);
  const firstMonth =
    new Date(dateValue(today)).getUTCFullYear() * 12 +
    new Date(dateValue(today)).getUTCMonth();
  function pick(value: string) {
    if (selectingEnd && value > range.start) {
      setRange({ start: range.start, end: value });
      setSelectingEnd(false);
    } else {
      setRange({ start: value, end: "" });
      setSelectingEnd(true);
    }
  }
  return (
    <DemoDialog title="Choose your dates" onClose={onClose} wide>
      <div className={s.dialogBody}>
        <div className={s.calendarHeading}>
          <button
            className={s.iconButton}
            disabled={month <= firstMonth}
            aria-label="Previous month"
            onClick={() => setMonth(month - 1)}
          >
            <ChevronLeft size={20} />
          </button>
          <p>
            {selectingEnd
              ? "Now choose check-out"
              : "Choose check-in, then check-out"}
          </p>
          <button
            className={s.iconButton}
            aria-label="Next month"
            onClick={() => setMonth(month + 1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className={s.calendarMonths}>
          {[month, month + 1].map((index) => {
            const date = new Date(
              Date.UTC(Math.floor(index / 12), index % 12, 1),
            );
            const year = date.getUTCFullYear();
            const m = date.getUTCMonth();
            const count = new Date(Date.UTC(year, m + 1, 0)).getUTCDate();
            const offset = (date.getUTCDay() + 6) % 7;
            return (
              <div key={index}>
                <h3>
                  {date.toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </h3>
                <div className={s.calendarGrid}>
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                  {Array.from({ length: offset }, (_, i) => (
                    <span key={`blank-${i}`} />
                  ))}
                  {Array.from({ length: count }, (_, i) => {
                    const value = new Date(Date.UTC(year, m, i + 1))
                      .toISOString()
                      .slice(0, 10);
                    const selected =
                      value === range.start || value === range.end;
                    const between =
                      !!range.start &&
                      !!range.end &&
                      value > range.start &&
                      value < range.end;
                    return (
                      <button
                        key={value}
                        type="button"
                        disabled={value < today}
                        aria-label={`Select ${value}`}
                        aria-pressed={selected}
                        className={
                          selected ? s.selectedDay : between ? s.rangeDay : ""
                        }
                        onClick={() => pick(value)}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className={s.calendarHeading}>
          <span>
            {range.start || "Check-in"} → {range.end || "Check-out"}
            <br />
            <small>Up to 30 nights · example availability</small>
          </span>
          <button
            className={s.button}
            disabled={
              !range.end ||
              stayNights({ checkIn: range.start, checkOut: range.end }) < 1 ||
              stayNights({ checkIn: range.start, checkOut: range.end }) > 30
            }
            onClick={() => onApply(range.start, range.end)}
          >
            Apply dates
          </button>
        </div>
      </div>
    </DemoDialog>
  );
}
