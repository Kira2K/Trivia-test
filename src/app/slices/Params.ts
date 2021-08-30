import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "app/LocalStorageTypes";
import { DifficultyTypes } from "Screens/start/DifficultyTypes";
import { getFromLocaleStorage } from "util/functions/getFromLocaleStorage";

export interface ParamsState {
  difficulty?: DifficultyTypes;
  questionsAmount?: number;
}

const initialState: ParamsState = {
  difficulty: getFromLocaleStorage(LocalStorageTypes.difficulty),

  questionsAmount: getFromLocaleStorage(LocalStorageTypes.questionsAmount),
};

export const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
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
