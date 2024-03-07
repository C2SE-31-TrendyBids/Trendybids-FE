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
export {
    getCurrentUser,
};