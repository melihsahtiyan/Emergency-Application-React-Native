import { axios } from "axios";

export default function CategoryService() {
  function getById(id) {
    return axios.get("http:10.0.2.2:5000/api/Categories/getbyid", {
      params: { id: id },
    });
  }
}
