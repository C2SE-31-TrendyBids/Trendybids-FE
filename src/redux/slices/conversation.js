import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as messageService from "../../services/message";

export const fetchConversationsThunk = createAsyncThunk(
    'conversation/fetch',
    async (accessToken, thunkApi) => {
        return messageService.getConversations(accessToken)
    }
)

export const fetchUnseenConversationsThunk = createAsyncThunk(
    'conversation/unseen',
    async (accessToken, thunkApi) => {
        return messageService.getUnseenConvCount(accessToken)
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
        unseenConv: 0
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
        },
        updateSeenConversation: (state, action) => {
            const conversation = action.payload
            const conversationIndex = state.conversations.findIndex((item) => item.id === conversation.id);
            if (!state.conversations[conversationIndex].latestMessage.isSeen) {
                state.conversations[conversationIndex].latestMessage.isSeen = true;
                state.conversations[conversationIndex].latestMessage.seenAt = new Date();
                state.unseenConv -= 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversationsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
                state.conversations = action.payload?.response?.conversations;
                state.loading = false;
            })
            .addCase(fetchConversationsThunk.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchUnseenConversationsThunk.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchUnseenConversationsThunk.fulfilled, (state, action) => {
                state.unseenConv = action.payload?.response?.unseenConv;
            })
            .addCase(fetchUnseenConversationsThunk.rejected, (state) => {
                state.unseenConv = 0;
                state.loading = false;
            })
    }
});

export const { addConversation, updateConversation, updateSeenConversation} = conversationSlice.actions

export default conversationSlice;