import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as messageService from "../../services/message";

export const fetchConversationsThunk = createAsyncThunk(
    'conversation/fetch',
    async (accessToken, thunkApi) => {
        return messageService.getConversations(accessToken)
    }
)

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversations: [{
            id: '',
            recipient: {
                id: '',
                fullName: '',
                avatarUrl: '',
            },
            latestMessage: {
                id: '',
                content: '',
                filesAttach: [],
                createdAt: '',
                user: {
                    id: '',
                    fullName: '',
                    avatarUrl: '',
                }
            },
        }],
        loading: false,
    },
    reducers: {
        addConversation: (state, action) => {
            console.log('addConversation')
            state.conversations.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversationsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
                state.conversations = action.payload.response.conversations;
                state.loading = false;
            })
            .addCase(fetchConversationsThunk.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const {addConversation} = conversationSlice.actions

export default conversationSlice;