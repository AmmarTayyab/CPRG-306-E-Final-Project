import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState, OpenModalPayload } from "@/features/common/Common";

const initialState: ModalState = {
  title: "",
  isOpen: false,
  bodyType: "",
  size: "",
  extraObject: {},
};

// Create the slice
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      const { title, bodyType, extraObject, size } = action.payload;
      state.isOpen = true;
      state.bodyType = bodyType;
      state.title = title;
      state.size = size || "md";
      state.extraObject = extraObject;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.bodyType = "";
      state.title = "";
      state.extraObject = {};
    },
  },
});

// Export actions and reducer
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
