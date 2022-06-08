import { axios } from "axios";

export default function PostService() {
  function sendReport(identity, description) {
    return axios.post("http:10.0.2.2:5000/api/Posts/add", {
      params: {
        customerId: customerId.id,
        categoryId: category.id,
        description: description,
        latitude: latitude,
        longitude: longitude,
      },
    });
  }
}
