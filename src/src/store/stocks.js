
import { reactive } from "vue";
import { setLoading } from "./app";
import axios from "axios";

export const Stocks = reactive({
  default: [],
  critical: []
})

export const fetchStocks = () => {
  setLoading(true);

  axios({
    url: "api/v2/menu/stocks",
    method: "GET",
    params: {
      domain: localStorage.getItem("domain")
    }
  }).then((res) => {
    if (res.status == 200) {
      Stocks.default = res.data.stocks ?? []
    }
    setLoading(false);
  }).catch((err) => {
    console.log("err", err);
  });
}

export const fetchCriticalStocks = () => {
  setLoading(true);

  axios({
    url: "api/v2/menu/critical",
    method: "GET",
    params: {
      domain: localStorage.getItem("domain")
    }
  }).then((res) => {
    if (res.status == 200) {
      Stocks.critical = res.data.critical ?? []
    }
    setLoading(false);
  }).catch((err) => {
    console.log("err", err);
  });
}