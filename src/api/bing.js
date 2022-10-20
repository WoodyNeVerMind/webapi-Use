import axios from "axios";

export function getImages(keyword) {
  const url = "/bingSearchApi/v7.0/images/search";
  return axios
    .get(url, {
      headers: {
        "Ocp-Apim-Subscription-Key": "ab9742f156ac4718b62b751d89496976"
      },
      params: {
        q: keyword,
        mkt: "zh-CN"
      }
    })
    .then(res => {
      //console.log(res);
      return Promise.resolve(res);
    });
}

export function getNews(keyword) {
  const url = "/bingSearchApi/v7.0/news/search";
  return axios
    .get(url, {
      headers: {
        "Ocp-Apim-Subscription-Key": "ab9742f156ac4718b62b751d89496976"
      },
      params: {
        q: keyword,
        mkt: "zh-CN"
      }
    })
    .then(res => {
      console.log(res);
      return Promise.resolve(res);
    });
}
