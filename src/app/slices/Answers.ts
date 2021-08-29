import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "app/LocalStorageTypes";
import { getFromLocaleStorage } from "util/functions/getFromLocaleStorage";
import { Question } from "./Questions";

export interface QuestionWithAnswer extends Question {
  isCorrect?: boolean;
}
// Define a type for the slice state
interface AnswerState {
  answersArr: boolean[];
  questionsWithAnswerArr: QuestionWithAnswer[];
  correctAnswersAmount: number;
  wrongAnswersAmount: number;
}

// Define the initial state using that type
const initialState: AnswerState = {
  answersArr: getFromLocaleStorage(LocalStorageTypes.answers) ?? [],
  questionsWithAnswerArr:
    getFromLocaleStorage(LocalStorageTypes.questionsWithAnswerArr) ?? [],
  correctAnswersAmount: 0,
  wrongAnswersAmount: 0,
};

export const answerSlice = createSlice({
  name: "answers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAnswer: (state, action: PayloadAction<boolean>) => {
      state.answersArr.push(action.payload);
    },
    resetAnswers: (state) => {
      state.answersArr = [];
    },
    compareQuestionsWithUsersAnswers: (
      state,
      action: PayloadAction<Question[]>
    ) => {
      state.questionsWithAnswerArr.length = 0;
      state.correctAnswersAmount = 0;
      state.wrongAnswersAmount = 0;
      const questionsArr = action.payload;
      const usersAnswers = state.answersArr;
      for (let i = 0; i < questionsArr.length; i++) {
        const question = questionsArr[i];
        const correctAnswer = question.correct_answer;
        const usersAnswer = usersAnswers[i];
        const boolCorrectAnswer =
          correctAnswer.toLowerCase() == "true" ? true : false;
        if (boolCorrectAnswer == usersAnswer) {
          state.correctAnswersAmount++;
          state.questionsWithAnswerArr.push({ isCorrect: true, ...question });
        } else {
          state.wrongAnswersAmount++;
          state.questionsWithAnswerArr.push({ isCorrect: false, ...question });
        }
      }
    },
  },
});

export const { setAnswer, compareQuestionsWithUsersAnswers, resetAnswers } =
  answerSlice.actions;

export default answerSlice.reducer;
