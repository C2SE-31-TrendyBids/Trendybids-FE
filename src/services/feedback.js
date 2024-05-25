
import * as request from "../ultils/request";

export const createFeedback = async (accessToken, body) => {
    try {
        const response = await request.post("/feeback/create", body, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        return {
            response: response.data,
            statusCode: response.status,
        };
    } catch (error) {
        return {
            error: error.response.data,
            statusCode: error.response.status,
        };
    }
};

export const updateFeedback = async (accessToken,id, body) => {
    try {
        const response = await request.put(`/feeback/${id}`, body, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        return {
            response: response.data,
            statusCode: response.status,
        };
    } catch (error) {
        return {
            error: error.response.data,
            statusCode: error.response.status,
        };
    }
};

export const deleteFeedback = async (accessToken, id) => {
    try {
        const response = await request.deleteRe(`/feeback/${id}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        return {
            response: response.data,
            statusCode: response.status,
        };
    } catch (error) {
        return {
            error: error.response.data,
            statusCode: error.response.status,
        };
    }
};

export const getAllFeedback = async (accessToken,productAuctionId,userId) => {
    try {
        const response = await request.get(`/feeback?productAuctionId=${productAuctionId}&userId=${userId}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        return {
            response: response.data,
            statusCode: response.status,
        };
    } catch (error) {
        return {
            error: error.response.data,
            statusCode: error.response.status,
        };
    }
};