import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DoneJobs } from '../../Services/ProjectsService';

import { ListJobProps } from '../../Model/ListJob';

export const doneSlice = createSlice({
    name: 'doneList',
    initialState: [...DoneJobs],
    reducers: {
        addDone: (state, action: PayloadAction<ListJobProps>) => {
            state.unshift(action.payload);
        },
        deleteDone: (state, action) => {
            state.splice(
                state.findIndex((job) => job.id === action.payload),
                1,
            );
        },
        changeStatusToDone: (state, action) => {
            state[action.payload].status = 'Done';
            state[action.payload].steps.forEach((step) => (step.stt = 'Done'));
        },
        changeOrderDone: (state, action) => {
            const [item] = state.splice(action.payload.from, 1);
            state.splice(action.payload.to, 0, item);
        },
        moveToDone: (state, action) => {
            state.splice(action.payload.index, 0, action.payload.data);
        },
    },
});

export const { addDone, deleteDone, changeStatusToDone, changeOrderDone, moveToDone } =
    doneSlice.actions;

export default doneSlice.reducer;
