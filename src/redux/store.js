import {configureStore} from "@reduxjs/toolkit"
import conversationSlice from "./slices/conversation";
import messageSlice from "./slices/message";
import bidPricesSlice from "./slices/bidPrice";

const store = configureStore({
    reducer: {
        conversation: conversationSlice.reducer,
        message: messageSlice.reducer,
        bidPrice: bidPricesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
})

export default store