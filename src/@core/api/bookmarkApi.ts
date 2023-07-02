import api from "./configs/axiosConfigs";
import { toast } from "react-toastify";

export const BookmarkAPI = {
  postOne: async function (params: {
    user_ID: number;
    coffee_shop_ID: number;
  }) {
    const response = await api.request({
      url: `/bookmarks`,
      method: "POST",
      data: {
        user_ID: params.user_ID,
        coffee_shop_ID: params.coffee_shop_ID,
      },
    });
    console.log(
      "BookmarksAPI:: postOne bookmark:: response?.data: ",
      response?.data
    );
    response?.status === 201
      ? toast.success("ブークマーク成功した", {
          position: "top-right",
          autoClose: 3000,
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
    return response?.data;
  },
  deleteOne: async function (params: {
    user_ID: number;
    coffee_shop_ID: number;
  }) {
    const response = await api.request({
      url: `/bookmarks`,
      method: "DELETE",
      data: {
        user_ID: params.user_ID,
        coffee_shop_ID: params.coffee_shop_ID,
      },
    });
    console.log(
      "BookmarksAPI:: deleteOne bookmark:: response?.data: ",
      response?.data
    );

    response?.status === 200
      ? toast.success("ブックマークを解除成功した", {
          position: "top-right",
          autoClose: 3000,
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
    return response?.data;
  },
};
