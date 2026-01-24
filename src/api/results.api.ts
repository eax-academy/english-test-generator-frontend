import axios from "axios";
import { RESULTS_API } from "../config/api.config";

export const fetchAllResults = async () => {
    const res = await axios.get(RESULTS_API);

    return res.data;
};
