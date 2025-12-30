import axios from "axios";
import { USERS_API } from "../config/api.config";

export const fetchAllUsers = async () => {
    const res = await axios.get(USERS_API);

    return res.data;
};
