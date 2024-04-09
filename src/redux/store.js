import {configureStore} from "@reduxjs/toolkit"
import conversationSlice from "./slices/conversation";
import messageSlice from "./slices/message";

const store = configureStore({
    reducer: {
        conversation: conversationSlice.reducer,
        message: messageSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
})

export default store