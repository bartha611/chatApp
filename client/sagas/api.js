import axios from "axios";

export default function fetchData(method, url, data) {
  axios({
    method,
    url,
    data
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}
