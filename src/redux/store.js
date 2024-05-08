import {configureStore} from "@reduxjs/toolkit"
import conversationSlice from "./slices/conversation";
import messageSlice from "./slices/message";
import bidPricesSlice from "./slices/bidPrice";
import notificationSlice from "./slices/notification";

const store = configureStore({
    reducer: {
        conversation: conversationSlice.reducer,
        message: messageSlice.reducer,
        bidPrice: bidPricesSlice.reducer,
        notification: notificationSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
})

export default store