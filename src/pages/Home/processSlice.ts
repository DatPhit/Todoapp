import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProcessingJobs } from '../../Services/ProjectsService';

import { ListJobProps } from '../../Model/ListJob';

export const procesSlice = createSlice({
    name: 'processList',
    initialState: [...ProcessingJobs],
    reducers: {
        addProcess: (state, action: PayloadAction<ListJobProps>) => {
            state.unshift(action.payload);
        },
        deleteProcess: (state, action) => {
            state.splice(action.payload, 1);
        },
        changeStatusToProcessing: (state) => {
            state[0].status = 'Processing';
            state[0].steps.forEach((step) => (step.stt = 'Processing'));
        },
    },
});

export const { addProcess, deleteProcess, changeStatusToProcessing } = procesSlice.actions;

export default procesSlice.reducer;
