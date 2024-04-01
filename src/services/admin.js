import * as request from '../ultils/request'

const getAllUsers = async (accessToken, params) => {
    try {
        const response = await request.get(`/admin/get-users`, {
            params: params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const acceptAndRejectCensor = async (accessToken, censorId, type) => {
    console.log(accessToken);
    try {
        const response = await request.post(`/admin/toggle-status-censor`, {
            censorId: censorId,
            type: type
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
}


export {
    getAllUsers,
    acceptAndRejectCensor
};