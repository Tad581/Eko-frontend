import api from "./configs/axiosConfigs";
import * as qs from "qs";
import { toast } from "react-toastify";

export const ReviewAPI = {
  getAll: async function (params: {
    star?: number;
    user_ID?: number;
    coffee_shop_ID?: number;
    orderBy?: string;
    orderType?: string;
    images?: string[];
  }) {
    const response = await api.request({
      url: `/reviews`,
      method: "GET",
      params: {
        star: params.star,
        user_ID: params.user_ID,
        coffee_shop_ID: params.coffee_shop_ID,
        orderBy: params.orderBy,
        orderType: params.orderType,
        images: params.images,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
    console.log("AuthAPI:: getAll review :: response?.data: ", response?.data);

    return response?.data || [];
  },
  postOne: async function (params: {
    star?: number;
    user_ID?: number;
    coffee_shop_ID?: number;
    review?: string;
    images?: string[];
  }) {
    const response = await api.request({
      url: `/users/${params.user_ID}/reviews`,
      method: "POST",
      data: {
        star: params.star,
        coffee_shop_ID: params.coffee_shop_ID,
        images: params.images,
        review: params.review,
      },
    });
    console.log("AuthAPI:: postOne review :: response?.data: ", response);
    response?.status === 201
      ? toast.success("レビュー成功した", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      : toast.error("なにか壊れたそう", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    return response?.data || [];
  },
};
