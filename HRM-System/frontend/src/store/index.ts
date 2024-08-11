import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "../features/common/headerSlice";
import rightDrawerReducer from "../features/common/rightDrawerSlice";
import modalReducer from "../features/common/modalSlice";
import isLoadingReducer from "../features/common/isLoadingSlice";
import { loginErrorSlice } from "../features/common/errorsSlice";

// Define the store
export const store = configureStore({
  reducer: {
    header: headerReducer,
    rightDrawer: rightDrawerReducer,
    modal: modalReducer,
    loading: isLoadingReducer,
    loginError: loginErrorSlice.reducer,

    // Add other slices here
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type (optional, useful for typing dispatch in components)
export type AppDispatch = typeof store.dispatch;
