import axios from "../plugins/axios";

export async function getCities(id) {
  try {
    const response = await axios.get(`/location/get-cities/${id}`);
    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
