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



export {
    getCurrentUser,
    joinSession,
};