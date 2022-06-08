import { axios } from "axios";

export default function CustomerService() {
  function getByIdentityNumber(identity) {
    return axios.get("http:10.0.2.2:5000/api/Customers/getbyidentitynumber", {
      params: { identityNumber: identity },
    });
  }
}
