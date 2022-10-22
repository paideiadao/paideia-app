import axios from "axios";

export const axiosGetFetcher = (url: string) => axios.get(url).then(res => res.data)