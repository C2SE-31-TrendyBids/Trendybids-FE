import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as notificationService from "../../services/notification";

export const fetchNotificationThunk = createAsyncThunk(
    'notification/fetch',
    async ({accessToken, page, limit, isSeen}, thunkApi) => {
        return notificationService.getNotifications(accessToken, {page, limit, isSeen})
    }
)

export const fetchUnseenNotificationThunk = createAsyncThunk(
    'notification/unseen',
    async (accessToken, thunkApi) => {
        return notificationService.getCountUnseen(accessToken)
    }
)

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications : [],
        unseenCount: 0,
        isLoading: false,
    },
    reducers: {
        addNotifications: (state, action) => {
            state.unseenCount = state.unseenCount + 1
            state.notifications.unshift(action.payload)
        },
        setNotifications: (state, action) => {
            state.notifications = [...state.notifications, ...action.payload]
        },
        clearNotifications: (state, action) => {
            state.notifications = []
        },
        setUnseenCount: (state, action) => {
            state.unseenCount = state.unseenCount - 1
            state.notifications.map((notificationItem) => {
                if (notificationItem.id === action.payload) {
                    return {...notificationItem, isSeen: true};
                } else {
                    return notificationItem; // Return the item unchanged if the id does not match
                }
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotificationThunk.pending, (state, action) => {
                if (state.notifications.length === 0) {
                    state.isLoading = true
                }
            })
            .addCase(fetchNotificationThunk.fulfilled, (state, action) => {
                state.notifications = [...state.notifications, ...action.payload?.response?.data];
                state.isLoading = false;
            })
            .addCase(fetchNotificationThunk.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchUnseenNotificationThunk.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchUnseenNotificationThunk.fulfilled, (state, action) => {
                state.unseenCount = action.payload?.response?.count;
                state.isLoading = false;
            })
            .addCase(fetchUnseenNotificationThunk.rejected, (state) => {
                state.unseenCount = 0;
                state.isLoading = false;
            })
    }
});

export const { addNotifications, setNotifications, clearNotifications, setUnseenCount} = notificationSlice.actions

export default notificationSlice;