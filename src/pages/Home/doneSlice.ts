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
        changeStatusToDone: (state) => {
            state[0].status = 'Done';
            state[0].steps.forEach((step) => (step.stt = 'Done'));
            state[0].priority = false;
        },
    },
});

export const { addDone, changeStatusToDone } = doneSlice.actions;

export default doneSlice.reducer;
