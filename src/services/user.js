import * as request from '../ultils/request'

const getCurrentUser = async (accessToken) => {
    try {
        const getDataUser = await request.get(`/user/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            response: getDataUser.data,
            statusCode: getDataUser.status,
        }
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};

const JOIN_SESSION_ENDPOINT = "/user/join-auction-session"
const joinSession = async (accessToken, sessionId) => {
    try {
        return await request.post(JOIN_SESSION_ENDPOINT, {
            sessionId
        },
            {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                    Authorization:
                        `Bearer ${accessToken}`,
                }
                ,
            }
        )
            ;
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};


const getBidPrices = async (accessToken, sessionId, paramObject) => {
    try {
        const response = await request.get(`/user/get-all-auction-price/${sessionId}`, {
            params: paramObject,
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


const getSummaryAuctionSession = async (accessToken, sessionId) => {
    try {
        const response = await request.get(`/user/get-summary-auction-price/${sessionId}`, {
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

export {
    getCurrentUser,
    joinSession,
    getBidPrices,
    getSummaryAuctionSession
};