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
        updateConversation: (state, action) => {
            console.log('updateConversation')
            const {conversationId, message} = action.payload;
            const conversationIndex = state.conversations.findIndex((item) => item.id === conversationId);
            if (conversationIndex > -1) {
                state.conversations[conversationIndex].latestMessage = message;
                const updatedConversation = state.conversations.splice(conversationIndex, 1)[0];
                state.conversations.unshift(updatedConversation);
            }
        }
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

export const { addConversation, updateConversation, filterConversation} = conversationSlice.actions

export default conversationSlice;