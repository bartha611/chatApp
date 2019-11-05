import axios from "axios";

const callApi = (entity, operation, data = {}) => {
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
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const userApi = callApi.bind(null, "user");
export const channelApi = callApi.bind(null, "channel");
export const messageApi = callApi.bind(null, "message");
export const teamApi = callApi.bind(null, "team");
