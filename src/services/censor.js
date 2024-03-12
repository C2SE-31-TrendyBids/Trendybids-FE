import * as request from '../ultils/request'

const AUCTION_SESSION_ENDPOINT = "/censor/get-auction-session"

const getAuctionSession = async (params) => {
    try {
        return await request.get(AUCTION_SESSION_ENDPOINT, {
            params: params,
            headers: {
                "ContentType": "application/json",
            },
        });

    } catch (error) {
        return error;
    }
};
export {
    getAuctionSession,
};