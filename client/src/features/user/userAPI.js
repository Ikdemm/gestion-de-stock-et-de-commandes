import axios from "axios";
import { requests } from "../requests";
export async function register(data) {
  try {
    const res = await axios.post(requests.userAPI + "/register", data);
    return res;
  } catch (err) {
    return err;
  }
}
export async function login(data) {
  try {
    const res = await axios.post(requests.userAPI + "/login", data);
    return res;
  } catch (err) {
    return err;
  }
}
export async function getUsers() {
  try {
    const res = await axios.get(requests.userAPI + "/all-users");
    return res;
  } catch (err) {
    return err;
  }
}
