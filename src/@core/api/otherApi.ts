import api from "./configs/axiosConfigs";

export const OtherAPI = {
  uploadOneFile: async function (params: { file?: any }) {
    console.log("params", params);
    const response = await api.request({
      url: `/upload`,
      method: "POST",
      data: {
        file: params.file
      },
    });
    console.log("AuthAPI:: postOne image :: response?.data: ", response?.data);

    return response?.data || [];
  },
};
