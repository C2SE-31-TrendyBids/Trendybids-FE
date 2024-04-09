import * as request from "../ultils/request";
const loginApi = async (email, password) => {
    try {
        const loginRequest = await request.post("auth/login", {
            email: email,
            password: password,
        });
        return {
            response: loginRequest.data,
            statusCode: loginRequest.status,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const register = async (email, password, fullName) => {
    try {
        const registerReq = await request.post("/auth/register", {
            email: email,
            password: password,
            fullName: fullName,
        });
        return {
            response: registerReq.data,
            statusCode: registerReq.status,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const verifyEmail = async (email, otp) => {
    try {
        const verifyReq = await request.post("/auth/verify-email", {
            email: email,
            otp: otp,
        });
        return {
            response: verifyReq.data,
            statusCode: verifyReq.status,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const forgotPassword = async (email) => {
    try {
        const fogotRe = await request.post("/auth/forgot-password", {
            email: email,
        });
        return {
            response: fogotRe.data,
            statusCode: fogotRe.status,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const resetPassword = async (email, password, otp) => {
    try {
        const resetPRe = await request.post("/auth/reset-password", {
            email: email,
            password: password,
            otp: otp,
        });
        return {
            response: resetPRe.data,
            statusCode: resetPRe.status,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
export const logOut = async () => {
    try {
        const response = await request.post("/auth/logout");
        return response.data;
    } catch (error) {
        return error;
    }
};

export { loginApi, register, verifyEmail, forgotPassword, resetPassword };
