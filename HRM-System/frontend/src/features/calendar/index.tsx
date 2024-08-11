import React, { useState } from "react";
import CalendarView from "../../components/CalendarView";
import moment, { Moment } from "moment";
import { CALENDAR_INITIAL_EVENTS } from "../../utils/dummyData";
import { useDispatch } from "react-redux";
import { openRightDrawer } from "../common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../../utils/globalConstantUtil";
import { showNotification } from "../common/headerSlice";
import { CalendarEventTheme } from "@/components/CalendarView/util";

interface CalendarEvent {
  title: string;
  theme: CalendarEventTheme;
  startTime: Moment;
  endTime: Moment;
}

const INITIAL_EVENTS: CalendarEvent[] = CALENDAR_INITIAL_EVENTS.map(
  (event) => ({
    ...event,
    startTime: moment(event.startTime),
    endTime: moment(event.endTime),
  }),
);

const Calendar: React.FC = () => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);

  // Add your own Add Event handler, like opening modal or random event addition
  const addNewEvent = (date: Date) => {
    const randomEvent =
      INITIAL_EVENTS[Math.floor(Math.random() * INITIAL_EVENTS.length)];
    const newEventObj: CalendarEvent = {
      title: randomEvent.title,
      theme: randomEvent.theme,
      startTime: moment(date).startOf("day"),
      endTime: moment(date).endOf("day"),
    };
    setEvents([...events, newEventObj]);
    dispatch(showNotification({ message: "New Event Added!", status: 1 }));
  };

  // Open all events of current day in sidebar
  const openDayDetail = (details: {
    filteredEvents: { title: string; theme: string }[];
    title: string;
  }) => {
    dispatch(
      openRightDrawer({
        header: details.title,
        bodyType: RIGHT_DRAWER_TYPES.CALENDAR_EVENTS,
        extraObject: { filteredEvents: details.filteredEvents },
      }),
    );
  };

  return (
    <>
      <CalendarView
        calendarEvents={events}
        addNewEvent={addNewEvent}
        openDayDetail={openDayDetail}
      />
    </>
  );
};

export default Calendar;
