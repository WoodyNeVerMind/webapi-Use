import axios from "axios";

export function getQuery(brandName) {
  const url = "/wikiApi/w/api.php";
  const keyword = brandName;
  return axios
    .get(url, {
      params: {
        action: "query",
        format: "json",
        list: "search",
        srsearch: keyword,
        prop: "info"
      }
    })
    .then(res => {
      //console.log(res);
      return Promise.resolve(res);
    });
}
