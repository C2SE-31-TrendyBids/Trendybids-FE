import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as adminServices from "../../services/admin";

export const fetchRulesThunk = createAsyncThunk(
    'rules/fetch',
    async ({accessToken}, thunkApi) => {
        return adminServices.getRules(accessToken, {})
    }
)


const rulesSlice = createSlice({
    name: 'rule',
    initialState: {
        rules: [],
        statusChange: false,
        loading: false
    },
    reducers: {
        updateStatusChange: (state, action) => {
            state.statusChange = action.payload.statusChange;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRulesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRulesThunk.fulfilled, (state, action) => {
                state.rules = action.payload?.data?.rules;
                state.loading = false;
            })
            .addCase(fetchRulesThunk.rejected, (state, action) => {
                state.loading = false;
            })
    }
});

export const {updateStatusChange} = rulesSlice.actions

export default rulesSlice;