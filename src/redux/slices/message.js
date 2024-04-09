import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as messageService from "../../services/message";

export const fetchMessagesThunk = createAsyncThunk(
    'message/fetch',
    async ({accessToken, conversationId}, thunkApi) => {
        return messageService.getConversationMessage(accessToken, conversationId)
    }
)

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [{
            id: '',
            content: '',
            filesAttach: [],
            createdAt: '',
            conversationId: '',
            user: {
                id: '',
                fullName: '',
                avatarUrl: '',
            },
        }],
        loading: false,
    },
    reducers: {
        addMessage: (state, action) => {
            console.log('addMessage')
            state.messages.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessagesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
                state.messages = action.payload.response.data;
                state.loading = false;
            })
            .addCase(fetchMessagesThunk.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const {addMessage} = messageSlice.actions

export default messageSlice;