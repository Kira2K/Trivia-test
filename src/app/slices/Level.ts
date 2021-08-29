import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "app/LocalStorageTypes";
import { getFromLocaleStorage } from "util/functions/getFromLocaleStorage";

// Define a type for the slice state
interface LevelState {
  level: number;
}

// Define the initial state using that type
const initialState: LevelState = {
  level: getFromLocaleStorage(LocalStorageTypes.level) ?? 1,
};

export const levelSlice = createSlice({
  name: "level",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
  },
});

export const { setLevel } = levelSlice.actions;

export default levelSlice.reducer;
