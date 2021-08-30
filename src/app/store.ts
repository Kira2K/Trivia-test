import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./slices/Questions";
import levelReducer from "./slices/Level";
import paramsReducer from "./slices/Params";
import answersReducer from "./slices/Answers";

const store = configureStore({
  reducer: {
    questions: questionsReducer,
    level: levelReducer,
    params: paramsReducer,
    answers: answersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
