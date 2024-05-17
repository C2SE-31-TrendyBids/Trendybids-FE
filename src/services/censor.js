
import * as request from "../ultils/request";
import { toast } from "sonner";

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

const registerCensor = async (
  accessToken,
  name,
  phoneNumber,
  founding,
  address,
  companyTaxCode,
  taxCodeIssuanceDate,
  position,
  placeTaxCode,
  avatar
) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("founding", founding);
    formData.append("address", address);
    formData.append("companyTaxCode", companyTaxCode);
    formData.append("taxCodeIssuanceDate", taxCodeIssuanceDate);
    formData.append("position", position);
    formData.append("placeTaxCode", placeTaxCode);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    const registerReq = await request.post(
      "/censor/register-censor",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return {
      message: registerReq.data.message,
      statusCode: registerReq.status,
    };
  } catch (error) {
    return {
      message: error?.response?.data?.message,
      statusCode: error.status,
    };
  }
};
const getProductAuction = async (param) => {
  try {
    const requestAuction = await request.get("/censor/get-auction-session", {
      params: param,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      data: requestAuction.data.productAuctions,
      message: requestAuction.data.message,
      totalItem: requestAuction.data.totalItem,
      totalPages: requestAuction.data.totalPages,
      statusCode: requestAuction.status,
    };
  } catch (error) {
    return {
      error,
      statusCode: error.status,
    };
  }
};

const AUCTION_SESSION_ENDPOINT = "/censor/get-auction-session";

const getAuctionSession = async (params) => {
  try {
    return await request.get(AUCTION_SESSION_ENDPOINT, {
      params: params,
      headers: {
        ContentType: "application/json",
      },
    });
  } catch (error) {
    return error;
  }
};

const CENSORS_ENDPOINT = "/censor/get-censor";

const getCensors = async (params) => {
  try {
    return await request.get(CENSORS_ENDPOINT, {
      params: params,
      headers: {
        ContentType: "application/json",
      },
    });
  } catch (error) {
    return error;
  }
};
const postAuctionSession = async (body, accessToken) => {
  try {
    const reqAuction = await request.post(
      "/censor/post-auction-session",
      body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    );
    return {
      message: reqAuction.data.message,
      statusCode: reqAuction.status,
    };
  } catch (error) {
    return error;
  }
};
const verifyProduct = async (productId, accessToken) => {
  try {
    const reqVerify = await request.post(
      "/censor/approve-auction-product",
      {
        productId: productId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return reqVerify;
  } catch (error) {
    return error;
  }
};
const rejectProduct = async (productId, accessToken, note) => {
  try {
    const reqReject = await request.post(
      "/censor/reject-auction-product",
      {
        productId: productId,
        note: note
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return reqReject;
  } catch (error) {
    return error;
  }
};

const getAuctionSessionByCensor = async (params, accessToken) => {
  try {
    const response = await request.get("/censor/my-auction-session", {
      params: params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    return error;
  }
};

const updateAuctionSession = async (body, accessToken, sessionId) => {
  try {
    console.log(body, sessionId);
    const response = await request.put(
      `/censor/update-auction-session/${sessionId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    return error;
  }
};

const deleteAuctionSession = async ({ accessToken, id }) => {
  try {
    const response = await request.deleteRe(
      `/censor/delete-auction-session/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
const getUserParticipating = async (accessToken, page, limit, auctionSessionId) => {

  try {
    return await request.get(`/censor/get-user-participating?productAuctionId=${auctionSessionId}&page=${page}&limit=${limit}`,
      {
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
const getAllMemberOrganization = async (accessToken, page, limit) => {
  try {
    return await request.get(`/censor/get-all-member?page=${page}&limit=${limit}`,
      {
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
const addMemberByEmail = async (accessToken, email) => {
  try {
    return await request.post(`/censor/add-member`, { email },
      {
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
}
const getUserByEmail = async (accessToken, email) => {
  try {
    return await request.get(`/censor/get-user?email=${email}`,
      {
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
}
const deleteMember = async ({ accessToken, id }) => {
  try {
    const response = await request.deleteRe(
      `/censor/delete-member/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response
  } catch (error) {
    toast.error(error?.response?.data?.message ?? error?.message);
    return {
      error,
      statusCode: error.status,
    };
  }
};
export {
  registerCensor,
  getProductAuction,
  getAuctionSession,
  getCensors,
  postAuctionSession,
  verifyProduct,
  rejectProduct,
  getAuctionSessionByCensor,
  updateAuctionSession,
  deleteAuctionSession,
  getUserParticipating,
  getAllMemberOrganization,
  addMemberByEmail,
  getUserByEmail,
  deleteMember
};