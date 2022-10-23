import axios from "axios";

// test push
export const axiosGetFetcher = (url: string) => axios.get(url).then(res => res.data)