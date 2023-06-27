import { configureStore } from '@reduxjs/toolkit';
import todoSliceReducer from '../pages/Home/todoSlice';
import procesSliceReducer from '../pages/Home/processSlice';
import doneSliceReducer from '../pages/Home/doneSlice';
import filterReducer from '../components/Filter/FilterSlice';
import authenReducer from '../components/Layout/DefaultLayout/Taskbar/authenSlice';
import notifyReducer from '../components/Notification/notifycationSlice';

const store = configureStore({
    reducer: {
        todoList: todoSliceReducer,
        processList: procesSliceReducer,
        doneList: doneSliceReducer,
        filter: filterReducer,
        authen: authenReducer,
        notify: notifyReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
