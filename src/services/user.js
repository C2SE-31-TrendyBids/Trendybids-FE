import * as request from "../ultils/request";

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
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};

const uploadAvatar = async (accessToken, file) => {
    try {
        const formData = new FormData();

        formData.append("avatar", file);

        const response = await request.post(`/user/upload-avatar`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            response: response.data,
            statusCode: response.status,
        }
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};

const JOIN_SESSION_ENDPOINT = "/user/join-auction-session";
const joinSession = async (accessToken, sessionId) => {
    try {
        return await request.post(
            JOIN_SESSION_ENDPOINT,
            {
                sessionId,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const editUser = async (accessToken, id, newData) => {
    try {
        const editDataUser = await request.put(
            `/user/edit-user`,
            {
                userId: id, // Truyền id vào dữ liệu cần gửi
                newData: newData, // Truyền newData vào dữ liệu cần gửi
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return {
            response: editDataUser.data,
            statusCode: editDataUser.status,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const changePass = async (accessToken, id, oldPassword, newPassword) => {
    try {
        const editDataUser = await request.put(
            `/user/change-password`,
            {
                userId: id,
                oldPassword: oldPassword,
                newPassword: newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return {
            response: editDataUser.data,
            statusCode: editDataUser.status,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};

export {getCurrentUser, joinSession, editUser, changePass, uploadAvatar};
