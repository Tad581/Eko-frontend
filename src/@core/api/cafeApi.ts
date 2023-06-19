import api from "./configs/axiosConfigs";
import * as qs from "qs";

export const CafeAPI = {
  getAll: async function (params: {
    name?: string | null;
    opening_at?: string;
    closing_at?: string;
    devices?: string[];
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
        closing_at: params.closing_at,
        crowded_status: params.crowded_status,
        devices: params.devices,
        name: params.name,
        orderBy: params.orderBy,
        orderType: params.orderType,
        opening_at: params.opening_at,
        now: params.now
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
    console.log(
      "AuthAPI:: getAll characters:: response?.data: ",
      response?.data
    );

    return response?.data || [];
  },
};
