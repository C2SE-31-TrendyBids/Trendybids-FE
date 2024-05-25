import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as feedbackService from "../../services/feedback";

export const fetchFeedbackThunk = createAsyncThunk(
    'feedback/fetch',
    async ({ accessToken, productAuctionId,userIdString }, thunkApi) => {

        return feedbackService.getAllFeedback(accessToken, productAuctionId,userIdString)
    }
)

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
       list: [],
        loading: false,
    },
    reducers: {
        addfeedback: (state, action) => {
            // console.log('setMessage')
            // const firstMessage = state.messages[0]
            // firstMessage.conversationId === action.payload.conversationId && state.messages.unshift(action.payload);
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbackThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFeedbackThunk.fulfilled, (state, action) => {
                console.log(action, 'action');
                state.list = action.payload?.response;
                state.loading = false;
            })
            .addCase(fetchFeedbackThunk.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const {  addfeedback } = feedbackSlice.actions

export default feedbackSlice;