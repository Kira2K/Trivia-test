import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "app/LocalStorageTypes";
import { getFromLocaleStorage } from "util/functions/getFromLocaleStorage";

interface LevelState {
  level: number;
}

const initialState: LevelState = {
  level: getFromLocaleStorage(LocalStorageTypes.level) ?? 1,
};

export const levelSlice = createSlice({
  name: "level",
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
  },
});

export const { setLevel } = levelSlice.actions;
("");
export default levelSlice.reducer;
