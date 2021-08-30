import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "app/LocalStorageTypes";
import { RouteTypes } from "app/RouteTypes";
import { RootState } from "app/store";
import { getFromLocaleStorage } from "util/functions/getFromLocaleStorage";
import { setToLocaleStorage } from "util/functions/setToLocaleStorage";
import { ParamsState } from "./Params";

export interface FetchParams extends ParamsState {}
export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export const fetchQuestions = createAsyncThunk(
  "posts/fetchQuestions",
  async ({ difficulty, questionsAmount }: FetchParams) => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${questionsAmount}&${difficulty}=easy&type=boolean`
    );

    if (response == null) {
      window.location.replace(RouteTypes.home);
      console.error(response);
    }
    const questionsArr = (await response.json()).results;
    setToLocaleStorage({
      key: LocalStorageTypes.questionsArr,
      value: questionsArr,
    });

    return questionsArr;
  }
);

interface QuestionsState {
  questionsArr: Question[];
  currentQuestionNumber: number;
}

const initialState: QuestionsState = {
  questionsArr: getFromLocaleStorage(LocalStorageTypes.questionsArr) ?? [],
  currentQuestionNumber:
    getFromLocaleStorage(LocalStorageTypes.currentQuestionNumber) ?? 0,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setCurrentQuestionNumber: (state, action: PayloadAction<number>) => {
      state.currentQuestionNumber = action.payload;
    },

    resetQuestionsArr: (state) => {
      state.questionsArr = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questionsArr = state.questionsArr = action.payload;
    });
  },
});

export const { setCurrentQuestionNumber, resetQuestionsArr } =
  questionsSlice.actions;

export default questionsSlice.reducer;

export const currentQuestion = (state: RootState) =>
  state.questions.questionsArr[state.questions.currentQuestionNumber];

export const progressInPercent = (state: RootState) => {
  const totalQuestionNumber = state.questions.questionsArr.length;
  const currentQuestionNumber = state.questions.currentQuestionNumber;
  if (currentQuestionNumber == 0) return 100 / totalQuestionNumber;
  return ((currentQuestionNumber + 1) * 100) / totalQuestionNumber;
};
