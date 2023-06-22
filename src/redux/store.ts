import { configureStore } from '@reduxjs/toolkit';
import todoSliceReducer from '../pages/Home/todoSlice';
import procesSliceReducer from '../pages/Home/processSlice';
import doneSliceReducer from '../pages/Home/doneSlice';

const store = configureStore({
    reducer: {
        todoList: todoSliceReducer,
        processList: procesSliceReducer,
        doneList: doneSliceReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
