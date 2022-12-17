import axios from "axios";

const TIMEOUT = 60 * 60 * 1000; // 1h

export const axiosCachedGetFetcher = (url: string) => {
  const key = `CACHE_KEY_${url}_436324`;
  const cached = localStorage.getItem(key);
  if (cached) {
    const data = JSON.parse(cached);
    const timestamp = data.timestamp;
    if (timestamp + TIMEOUT >= (new Date()).getTime()) {
      return data.data;
    }
  }
  return axios.get(url).then((res) => {
    localStorage.setItem(key, JSON.stringify({timestamp: (new Date()).getTime(), data: res.data}))
    return res.data
  });
}
