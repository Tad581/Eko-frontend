import api from "./configs/axiosConfigs";
import * as qs from "qs";

export const ReviewAPI = {
  getAll: async function (params: {
    star?: number;
    user_ID?: number;
    coffee_shop_ID?: number;
    orderBy?: string;
    orderType?: string;
  }) {
    const response = await api.request({
      url: `/reviews`,
      method: "GET",
      params: {
        star: params.star,
        user_ID: params.user_ID,
        coffee_shop_ID: params.coffee_shop_ID,
        orderBy: params.orderBy,
        orderType: params.orderType
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
    console.log(
      "AuthAPI:: getAll review :: response?.data: ",
      response?.data
    );

    return response?.data || [];
  },
};
