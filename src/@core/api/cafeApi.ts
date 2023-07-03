import { CURRENT_USER_ID } from "./../utils/cafes";
import api from "./configs/axiosConfigs";
import * as qs from "qs";
import { toast } from "react-toastify";

export const CafeAPI = {
  getAll: async function (params: {
    name?: string | null;
    opening_at?: string;
    closing_at?: string;
    devices?: string[];
    orderBy?: string;
    orderType?: string;
    now?: string;
    crowded_status?: number[];
    page?: number;
    pageSize?: number;
    user_ID?: number;
    bookmark_type?: string;
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
        now: params.now,
        user_ID: CURRENT_USER_ID,
        bookmark_type: params.bookmark_type,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
    console.log("CoffeeAPI:: getAll cafe:: response?.data: ", response?.data);

    return response?.data || [];
  },
  getOne: async function (params: { id: number; now: string }) {
    const response = await api.request({
      url: `/coffee_shop/` + params.id,
      method: "GET",
      params: {
        id: params.id,
        now: params.now,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
    console.log("CoffeeAPI:: getOne cafe:: response?.data: ", response?.data);

    return response?.data || [];
  },
  createOne: async function (params: {
    name: string;
    opening_at: string;
    closing_at: string;
    status?: number;
    devices?: { name: string; quantity: number; status: string }[];
    crowded_hours?: any;
    image?: string[];
    description: string;
    owner_ID: number;
    phone_number: string;
    address: string;
    verified?: number;
    categories?: string[];
  }) {
    const response = await api.request({
      url: `/coffee_shop`,
      method: "POST",
      data: {
       name: params.name,
       opening_at: params.opening_at,
       closing_at: params.closing_at,
       devices: params.devices,
       crowded_hours: params.crowded_hours,
       image: params.image,
       description: params.description,
       owner_ID: params.owner_ID,
       address: params.address,
      },
    });
    console.log("CafeAPI:: createOne cafe :: response?.data: ", response);
    response?.status === 201
      ? toast.success("投稿成功した", {
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
  updateOne: async function (params: {
    id: number,
    name: string;
    opening_at: string;
    closing_at: string;
    status?: number;
    devices?: { name: string; quantity: number; status: string }[];
    crowded_hours?: any;
    image?: string[];
    description: string;
    owner_ID: number;
    phone_number: string;
    address: string;
    verified?: number;
    categories?: string[];
  }) {
    const response = await api.request({
      url: `/coffee_shop/${params.id}`,
      method: "PATCH",
      data: {
        name: params.name,
        opening_at: params.opening_at,
        closing_at: params.closing_at,
        devices: params.devices,
        crowded_hours: params.crowded_hours,
        image: params.image,
        description: params.description,
        owner_ID: CURRENT_USER_ID,
        address: params.address,
      },
    });
    console.log("CafeAPI:: updateOne cafe :: response?.data: ", response);
    response?.status === 201
      ? toast.success("編集成功した", {
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
