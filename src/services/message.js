import * as request from "../ultils/request";

export const createConversation = async (accessToken, body) => {
    try {
        const response = await request.post("/conversation/create", body, {
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

export const getConversations = async (accessToken) => {
    try {
        const response = await request.get("/conversation/conversations", {
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

export const getConversationMessage = async (accessToken, conversationId, query) => {
    try {
        const response = await request.get(`/message/messages/${conversationId}`, {
            params: {...query},
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

export const createMessage = async (accessToken, body) => {
    try {
        const response = await request.post("/message/create", body, {
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

export const createMessageWithImage = async (accessToken, body) => {
    try {
        const response = await request.post("/message/upload-image", body, {
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