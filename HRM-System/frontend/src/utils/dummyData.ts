import moment, { Moment } from "moment";
import { CalendarEventTheme } from "@/components/CalendarView/util";

export interface CalendarEvent {
  title: string;
  theme: CalendarEventTheme;
  startTime: Moment;
  endTime: Moment;
}

export const CALENDAR_INITIAL_EVENTS: CalendarEvent[] = [
  {
    title: "Product call",
    theme: "GREEN",
    startTime: moment().add(-12, "d").startOf("day"),
    endTime: moment().add(-12, "d").endOf("day"),
  },
  {
    title: "Meeting with tech team",
    theme: "PINK",
    startTime: moment().add(-8, "d").startOf("day"),
    endTime: moment().add(-8, "d").endOf("day"),
  },
];

export interface RecentTransaction {
  name: string;
  avatar: string;
  email: string;
  location: string;
  amount: number;
  date: Moment;
}

export const RECENT_TRANSACTIONS: RecentTransaction[] = [
  {
    name: "Alex",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    email: "alex@dashwind.com",
    location: "Paris",
    amount: 100,
    date: moment().endOf("day"),
  },
  {
    name: "Ereena",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    email: "ereena@dashwind.com",
    location: "London",
    amount: 190,
    date: moment().add(-1, "d").endOf("day"),
  },
];
