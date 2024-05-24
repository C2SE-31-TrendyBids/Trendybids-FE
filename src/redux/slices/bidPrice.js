import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as userServices from "../../services/user";

export const fetchBidPricesThunk = createAsyncThunk(
    'bidPrices/fetch',
    async ({accessToken, sessionId, page = 1, limit = 8}, thunkApi) => {
        return userServices.getBidPrices(accessToken, sessionId, {page, limit})
    }
)

export const fetchPreviousBidPricesThunk = createAsyncThunk(
    'previousBidPrices/fetch',
    async ({accessToken, sessionId, page = 1, limit = 8}, thunkApi) => {
        return userServices.getBidPrices(accessToken, sessionId, {page, limit})
    }
)


const bidPricesSlice = createSlice({
    name: 'bidPrice',
    initialState: {
        bidPrices: [{
            id: '',
            auctionPrice: '',
            productAuctionId: '',
            createdAt: '',
            user: {
                id: '',
                fullName: '',
                avatarUrl: '',
            },
        }],
        numberOfParticipants: 0,
        currentUserJoin: 0,
        highestPrice: 1,
        currentPage: 0,
        totalPages: 0,
        countBids: 0,
        loading: false,
        error: null
    },
    reducers: {
        addBidPrice: (state, action) => {
            const  anonymizeFullName  = action.payload.anonymizeFullName;
            const bidPrice = action.payload?.data?.bidPrice;
            const highestPrice = action.payload?.data?.highestPrice;
            // Modify fullName before adding bidPrice
            bidPrice.user.fullName = anonymizeFullName(bidPrice.user.fullName);
            // Add bidPrice to the bidPrices array
            state.bidPrices.push(bidPrice);
            // Update highestPrice and countBids
            state.highestPrice = highestPrice;
            state.countBids = state.countBids + 1;
        },
        updateUserJoin: (state, action) => {
            state.currentUserJoin = action.payload.numberOfUsers;
        },
        addPriceFrom: (state, action) => {
            const priceFrom = action.payload.priceFrom;
            state.highestPrice = priceFrom;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBidPricesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBidPricesThunk.fulfilled, (state, action) => {
                // If currentPage === 0, it means fetching data for the first time
                state.bidPrices = action.payload?.response?.auctionPrices.reverse();
                state.totalPages = action.payload?.response?.totalPages;
                state.currentPage = action.payload?.response?.currentPage;
                state.highestPrice = action.payload?.response?.highestPrice;
                state.countBids = action.payload?.response?.totalBids;
                state.numberOfParticipants = action.payload?.response?.numberOfParticipation;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchBidPricesThunk.rejected, (state, action) => {
                state.loading = false;
                state.totalPages = 0;
            })
            .addCase(fetchPreviousBidPricesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPreviousBidPricesThunk.fulfilled, (state, action) => {
                const newBidPrices = action.payload?.response?.auctionPrices.reverse();
                // If currentPage === 0, it means fetching data for the first time
                if (state.currentPage === 0) {
                    state.bidPrices = newBidPrices;
                } else {
                    // Otherwise, add new messages to the beginning of bidPrices array
                    state.bidPrices = [...newBidPrices, ...state.bidPrices];
                }
                state.currentPage = action.payload?.response?.currentPage;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchPreviousBidPricesThunk.rejected, (state, action) => {
                state.loading = false;
                state.totalPages = 0;
            })
    }
});

export const {addBidPrice, updateUserJoin,addPriceFrom} = bidPricesSlice.actions

export default bidPricesSlice;