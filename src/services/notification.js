import * as request from "../ultils/request";


export const getNotifications = async (accessToken, params) => {
    try {
        const response = await request.get("/notification/notifications", {
            params: {...params},
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

export const seenNotification = async (accessToken, notificationId) => {
    try {
        const response = await request.post("/notification/seen-notification", {notificationId}, {
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

export const getCountUnseen = async (accessToken) => {
    try {
        const response = await request.get("/notification/count-unseen", {
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