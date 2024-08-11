export const MODAL_BODY_TYPES = {
  EMPLOYEE_DETAIL: "EMPLOYEE_DETAIL",
  EMPLOYEE_EDIT_DETAIL: "EMPLOYEE_EDIT_DETAIL",
  USER_DETAIL: "USER_DETAIL",
  LEAD_ADD_NEW: "LEAD_ADD_NEW",
  CONFIRMATION: "CONFIRMATION",
  DEFAULT: "",
} as const;

export const RIGHT_DRAWER_TYPES = {
  NOTIFICATION: "NOTIFICATION",
  CALENDAR_EVENTS: "CALENDAR_EVENTS",
  DEFAULT: "",
} as const;

export const CONFIRMATION_MODAL_CLOSE_TYPES = {
  LEAD_DELETE: "LEAD_DELETE",
} as const;

export type ModalBodyType =
  (typeof MODAL_BODY_TYPES)[keyof typeof MODAL_BODY_TYPES];
export type RightDrawerType =
  (typeof RIGHT_DRAWER_TYPES)[keyof typeof RIGHT_DRAWER_TYPES];
export type ConfirmationModalCloseType =
  (typeof CONFIRMATION_MODAL_CLOSE_TYPES)[keyof typeof CONFIRMATION_MODAL_CLOSE_TYPES];


export const  BASE_URL = "http://localhost:3001/api/v1/";