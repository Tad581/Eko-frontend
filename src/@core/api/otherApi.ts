import api from "./configs/axiosConfigs";

export const OtherAPI = {
  postImage: async function (params: {
    file?: string;
  }) {
    const response = await api.request({
      url: `/upload`,
      method: "POST",
      data: {
        file: params.file,
      },
    });
    console.log("AuthAPI:: postOne image :: response?.data: ", response?.data);

    return response?.data || [];
  },
};
