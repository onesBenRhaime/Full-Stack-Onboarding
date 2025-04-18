import axios from "axios";
import API_BASE_URL from "./config";

const instance = axios.create({
	baseURL: `${API_BASE_URL}auth`,
});

export default instance;
