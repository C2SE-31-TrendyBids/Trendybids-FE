import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as userServices from "../../services/user";

export const fetchBidPricesThunk = createAsyncThunk(
    'bidPrices/fetch',
    async ({accessToken, sessionId, page = 1, limit = 6}, thunkApi) => {
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
            const bidPrice = action.payload?.bidPrice;
            const highestPrice = action.payload?.highestPrice;
            state.bidPrices.push(bidPrice);
            state.highestPrice = highestPrice;
            state.countBids = state.countBids + 1;
        },
        updateUserJoin: (state, action) => {
            state.currentUserJoin = action.payload.numberOfUsers;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBidPricesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBidPricesThunk.fulfilled, (state, action) => {
                const newBidPrices = action.payload?.response?.auctionPrices.reverse();
                // If currentPage === 0, it means fetching data for the first time
                if (state.currentPage === 0) {
                    state.bidPrices = newBidPrices;
                } else {
                    // Otherwise, add new messages to the beginning of bidPrices array
                    state.bidPrices = [...newBidPrices, ...state.bidPrices];
                }
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
    }
});

export const {addBidPrice, updateUserJoin} = bidPricesSlice.actions

export default bidPricesSlice;