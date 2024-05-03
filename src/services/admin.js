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
const deleteUser = async (accessToken, userId) => {
    try {
        const response = await request.deleteRe(`/admin/delete-user?userId=${userId}`, {
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
const editUser = async (accessToken, userId, body) => {
    try {
        const response = await request.put(`/admin/edit-user?userId=${userId}`,
            body,
            {
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
const getAllRoles = async (accessToken) => {
    try {
        const response = await request.get(`/admin/get-roles`, {
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

const getSummary = async (accessToken) => {
    try {
        return await request.get(`/admin/get-summary`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};

const getChartProduct = async (accessToken, params) => {
    try {
        return await request.get(`/admin/get-summary-product-auction`, {
            params: params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};

const getProfit = async (accessToken,params) => {
    try {
        return await request.get(`/admin/get-profit`, {
            params: params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};

const getTransactionHistory = async (accessToken, params) => {
    try {
        return await request.get(`/admin/get-transaction-history`, {
            params: params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};

export {
    getAllUsers,
    acceptAndRejectCensor,
    deleteUser,
    editUser,
    getAllRoles,
    getSummary,
    getChartProduct,
    getProfit,
    getTransactionHistory
};