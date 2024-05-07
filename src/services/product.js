import * as request from "../ultils/request";
import { toast } from "sonner";

const PRODUCT_URL = "/product";

export const getProductForOwner = async (accessToken, params = {}) => {
  try {
    const response = await request.get(`${PRODUCT_URL}/get-product-owner`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });

    return {
      totalPages: response.data.totalPages,
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

export const getProductForCensor = async (accessToken, params = {}) => {
  try {
    const response = await request.get(`${PRODUCT_URL}/get-product-censor`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });

    return {
      totalPages: response.data.totalPages,
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

export const addProduct = async (accessToken, data ) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((t) => {
      if (t === "prdImageURL" && Array.isArray(data[t])) {
        data[t].forEach((d) => {
          formData.append(t, d);
        });
      } else {
        formData.append(t, data[t]);
      }
    });

    const response = await request.post(`${PRODUCT_URL}/post-product`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      "Content-Type": "multipart/form-data",
    });

    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    toast.error(error?.response?.data?.message ?? error?.message);

    return {
      error,
      statusCode: error.status,
    };
  }
};

export const updateProduct = async (accessToken, { id, ...others }) => {
  try {
    const formData = new FormData();
    Object.keys(others).forEach((t) => {
      if (t === "prdImageURL" && Array.isArray(others[t])) {
        others[t].forEach((d) => {
          formData.append(t, d);
        });
      } else {
        formData.append(t, others[t]);
      }
    });
    const response = await request.put(`${PRODUCT_URL}/update-product/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      "Content-Type": "multipart/form-data",
    });

    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    toast.error(error?.response?.data?.message ?? error?.message);

    return {
      error,
      statusCode: error.response.status,
    };
  }
};


export const deleteProduct = async (accessToken, id) => {
  try {
    const response = await request.deleteRe(`${PRODUCT_URL}/delete-product/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    toast.error(error?.response?.data?.message ?? error?.message);

    return {
      error,
      statusCode: error.status,
    };
  }
};

export const deleteImageProduct = async (accessToken, id) => {
  try {
    const response = await request.deleteRe(`${PRODUCT_URL}/delete-image/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response
  } catch (error) {
    toast.error(error?.response?.data?.message ?? error?.message);

    return {
      error,
      statusCode: error.status,
    };
  }
};
