
import * as request from '../ultils/request'

const registerCensor = async (name, phoneNumber, founding, address, companyTaxCode, taxCodeIssuanceDate, position, placeTaxCode, avatar) => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phoneNumber', phoneNumber);
        formData.append('founding', founding);
        formData.append('address', address);
        formData.append('companyTaxCode', companyTaxCode);
        formData.append('taxCodeIssuanceDate', taxCodeIssuanceDate);
        formData.append('position', position);
        formData.append('placeTaxCode', placeTaxCode);
        if (avatar) {
            formData.append('avatar', avatar);
        }
        const registerReq = await request.post('/censor/register-censor', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return {
            message: registerReq.data.message,
            statusCode: registerReq.status,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
}
const getProductAuction = async (param) => {
    try {
        const requestAuction = await request.get('/censor/get-auction-session', {
            params: param,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return {
            data: requestAuction.data.productAuctions,
            message: requestAuction.data.message,
            totalItem: requestAuction.data.totalItem,
            totalPages: requestAuction.data.totalPages,
            statusCode: requestAuction.status,
        }
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
}

export {
    registerCensor,
    getProductAuction
};