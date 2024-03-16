import * as request from "../ultils/request";

const CATEGORY_URL = "/category";

export const getAllCategory = async () => {
  try {
    const response = await request.get(`${CATEGORY_URL}/get-all-category`, {
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
