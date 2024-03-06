import * as request from '../ultils/request'

const getCurrentUser = async (accessToken) => {
    console.log(accessToken);
    try {
        const getDataUser = await request.get(`/user/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(getDataUser);
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