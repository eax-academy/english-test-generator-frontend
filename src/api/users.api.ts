import axios from "axios";
import { USERS_API } from "../config/api.config";

export const fetchAllUsers = async () => {
    const res = await axios.get(USERS_API, {
        withCredentials: true,
    });
    return res.data;
};

export const deleteUser = async (userId: string) => {
    const res = await axios.delete(`${USERS_API}/${userId}`, {
        withCredentials: true,
    });
    return res.data;
};
