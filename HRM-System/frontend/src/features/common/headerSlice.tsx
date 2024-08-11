import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeaderState, ShowNotificationPayload } from "@/features/common/Common";

// Define the initial state
const initialState: HeaderState = {
  pageTitle: "Home",
  noOfNotifications: 15,
  newNotificationMessage: "",
  newNotificationStatus: 1,
};

// Create the slice
export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.pageTitle = action.payload.title;
    },
    removeNotificationMessage: (state) => {
      state.newNotificationMessage = "";
    },
    showNotification: (
      state,
      action: PayloadAction<ShowNotificationPayload>,
    ) => {
      state.newNotificationMessage = action.payload.message;
      state.newNotificationStatus = action.payload.status;
    },
  },
});

// Export actions and reducer
export const { setPageTitle, removeNotificationMessage, showNotification } =
  headerSlice.actions;
export default headerSlice.reducer;
