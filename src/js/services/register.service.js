import axios from "../plugins/axios";

export async function register(user = {}) {
  try {
    const response = await axios.post("/auth/signup", JSON.stringify(user));
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
