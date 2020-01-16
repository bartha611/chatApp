import axios from "axios";

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;

const callApi = (entity, operation, data = {}) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const methods = {
    CREATE: () => axios.post(`/${entity}/create`, data),
    READ: () => axios.get(`/${entity}/read`, { params: data }),
    UPDATE: () => axios.put(`/${entity}/update`, data),
    DELETE: () => axios.delete(`/${entity}/delete`, { params: data })
  };
  if (entity === "user") {
    methods.LOGIN = () => axios.post(`/user/login`, data);
    methods.LOGOUT = () => axios.post(`/user/logout`);
  }
  return methods[operation]()
    .then(response => {
      console.log(response);
      return { data: response.data };
    })
    .catch(error => {
      console.log(error);
      console.log(entity);
      return { error: error.response };
    });
};

export const userApi = callApi.bind(null, "user");
export const channelApi = callApi.bind(null, "channel");
export const messageApi = callApi.bind(null, "message");
export const teamApi = callApi.bind(null, "team");
export const memberApi = callApi.bind(null, "member");
