import axios from "axios";
export function getJdSales() {
  const url = "/dingdanxiaApi/jd/material_query";

  return axios(url, {
    params: {
      apikey: "5H6GNMqLAIt2EcVd1qOZOEOULS0LXBUw",
      eliteId: 1
    }
  }).then(res => {
    return Promise.resolve(res);
  });
}
