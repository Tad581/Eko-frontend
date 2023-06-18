import api from "./configs/axiosConfigs";

export const CafeAPI = {
  getAll: async function (params: {
    name?: string | null;
    opening_at?: string;
    closing_at?: string;
    device?: string[];
    orderBy?: string;
    orderType?: string;
    now?: string;
    crowded_status?: number;
    page?: number;
    pageSize?: number;
  }) {
    const response = await api.request({
      url: `/coffee_shop`,
      method: "GET",
      params: {
        name: params.name,
        opening_at: params.opening_at,
        closing_at: params.closing_at,
        device: params.device,
        orderBy: params.orderBy,
      },
    });
    console.log(
      "AuthAPI:: getAll characters:: response?.data: ",
      response?.data
    );

    return response?.data || [];
  },
};
