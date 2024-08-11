import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginErrorState {
  errorMessage: string | null;
}

const initialState: LoginErrorState = {
  errorMessage: null,
};

export const loginErrorSlice = createSlice({
  name: "loginError",
  initialState,
  reducers: {
    // Action to set the login error message
    setLoginError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    // Action to clear the login error message
    clearLoginError: (state) => {
      state.errorMessage = null;
    },
  },
});

// Export the actions to be used in components or thunks
export const { setLoginError, clearLoginError } = loginErrorSlice.actions;

// Export the reducer to be added to the store
export default loginErrorSlice.reducer;
