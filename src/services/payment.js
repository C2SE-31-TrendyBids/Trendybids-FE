import * as request from "../ultils/request";

const createPaymentPaypal = async (accessToken, body) => {
    try {
        const response = await request.post(`/payment/paypal/create-payment-user`,
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
};
const paymentWallet = async (accessToken, body) => {
    try {
        const response = await request.post(`/payment/tranfer-wallet`,
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
};
const paypalSuccess = async (accessToken, body) => {
    try {
        console.log(body);
        const response = await request.post(`/payment/paypal/success`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        console.log(response);
        return response
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
}
const paymentWithQr = async (accessToken, amount) => {
    try {
        const response = await request.get(`/payment/create-qrcode?amount=${amount}`,
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
const getWallet = async (accessToken) => {
    try {
        const response = await request.get(`/payment/get-wallet`,
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
const getWalletById = async (accessToken, id) => {
    try {
        const response = await request.get(`/payment/get-wallet-by-id?id=${id}`,
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
const qrSuccess = async (accessToken, body) => {
    try {
        const response = await request.post(`/payment/qr-success`,
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
const otpTranferMoney = async (accessToken) => {
    try {
        const response = await request.post(`/payment/otp-tranfer`, {},
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
const verifyOtp = async (accessToken, otp) => {
    try {
        const response = await request.post(`/payment/verify-otp`, { otp },
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
const isReturnMoney = async (accessToken, body) => {
    try {
        console.log(body);
        const response = await request.post(`/payment/is-return-money`, body,
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
export {
    createPaymentPaypal,
    paypalSuccess,
    paymentWithQr,
    getWallet,
    paymentWallet,
    qrSuccess,
    otpTranferMoney,
    verifyOtp,
    getWalletById,
    isReturnMoney
};