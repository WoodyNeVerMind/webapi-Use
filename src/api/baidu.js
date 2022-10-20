import axios from "axios";

export function getBaidu(keyword) {
  const url = "/baiduApi/dub";
  const data = {
    t: keyword
  };
  return axios(url, {
    params: data
  }).then(res => {
    console.log(res);
    return Promise.resolve(res);
  });
}
