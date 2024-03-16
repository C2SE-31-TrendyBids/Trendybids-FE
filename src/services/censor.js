import * as request from "../ultils/request";

const CENSOR_URL = "/censor";

export const getAllCensor = async () => {
  try {
    const response = await request.get(`${CENSOR_URL}/get-censor`, {
      params: { page: 1, limit: 9999999 },
    });

    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      error,
      statusCode: error.status,
    };
  }
};
