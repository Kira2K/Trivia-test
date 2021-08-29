import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "app/LocalStorageTypes";
import { DifficultyTypes } from "Screens/start/DifficultyTypes";
import { getFromLocaleStorage } from "util/functions/getFromLocaleStorage";

// Define a type for the slice state
export interface ParamsState {
  difficulty?: DifficultyTypes;
  questionsAmount?: number;
}

// Define the initial state using that type
const initialState: ParamsState = {
  difficulty: getFromLocaleStorage(LocalStorageTypes.difficulty),
  // TODO: write about it
  questionsAmount: getFromLocaleStorage(LocalStorageTypes.questionsAmount),
};

export const paramsSlice = createSlice({
  name: "params",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setDifficulty: (state, action: PayloadAction<DifficultyTypes>) => {
      state.difficulty = action.payload;
    },
    setQuestionsAmount: (state, action: PayloadAction<number>) => {
      state.questionsAmount = action.payload;
    },
    resetParams: (state) => {
      state.questionsAmount = initialState.questionsAmount;
      state.difficulty = initialState.difficulty;
    },
  },
});

export const { setDifficulty, setQuestionsAmount, resetParams } =
  paramsSlice.actions;

export default paramsSlice.reducer;
