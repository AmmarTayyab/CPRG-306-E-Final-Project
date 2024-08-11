interface HeaderState {
  pageTitle: string;
  noOfNotifications: number;
  newNotificationMessage: string;
  newNotificationStatus: number; // You may use enum if you have predefined statuses
}

interface ShowNotificationPayload {
  message: string;
  status: number; // Define status as enum if necessary
}

interface ModalState {
  title: string;
  isOpen: boolean;
  bodyType: string;
  size: string;
  extraObject: Record<string, any>;
}

interface OpenModalPayload {
  title: string;
  bodyType: string;
  size?: string; // Optional size
  extraObject: Record<string, any>; // Adjust type as needed
}

interface RightDrawerState {
  header: string;
  isOpen: boolean;
  bodyType: string;
  extraObject: Record<string, any>;
}

interface OpenRightDrawerPayload {
  header: string;
  bodyType: string;
  extraObject: Record<string, any>;
}

interface ExtraObject {
  message: string;
  type: string;
  index?: number; // index is optional
}

interface ConfirmationModalBodyProps {
  extraObject: ExtraObject;
  closeModal: () => void;
}

export type {
  HeaderState,
  ShowNotificationPayload,
  ModalState,
  OpenModalPayload,
  RightDrawerState,
  OpenRightDrawerPayload,
  ExtraObject,
  ConfirmationModalBodyProps,
};
