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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
