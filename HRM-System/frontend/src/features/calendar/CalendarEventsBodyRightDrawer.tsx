import React from "react";
import {
  CALENDAR_EVENT_STYLE,
  CalendarEventTheme,
} from "../../components/CalendarView/util";

const THEME_BG = CALENDAR_EVENT_STYLE;

interface FilteredEvent {
  title: string;
  theme: CalendarEventTheme;
}

interface CalendarEventsBodyRightDrawerProps {
  filteredEvents: FilteredEvent[];
  closeRightDrawer: () => void;
}

const CalendarEventsBodyRightDrawer: React.FC<
  CalendarEventsBodyRightDrawerProps
> = ({ filteredEvents }) => {
  return (
    <>
      {filteredEvents.map((e, k) => (
        <div
          key={k}
          className={`grid mt-3 card rounded-box p-3 ${THEME_BG[e.theme] || ""}`}
        >
          {e.title}
        </div>
      ))}
    </>
  );
};

export default CalendarEventsBodyRightDrawer;
