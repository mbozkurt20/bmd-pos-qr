
import { reactive } from "vue";
import { setLoading } from "./app";
import axios from "axios";


export const report = reactive({
    summary: {},
    endOfDay: {},
    couriers: [],
    additions: [],
    personnel: [],
    cash: {}
})

export const getSummary = () => {
    setLoading(true);
    axios({
        url: "api/v2/report/summary",
        method: "GET",
        params: {
            domain: localStorage.getItem("domain")
        }
    }).then((res) => {
        if (res.data.success) {
            report.summary = res.data.summary ?? {}
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
        setLoading(false);
    });
}
export const getEndOfDay = () => {
    setLoading(true);
    axios({
        url: "api/v2/report/end_of_day",
        method: "GET",
        params: {
            domain: localStorage.getItem("domain")
        }
    }).then((res) => {
        if (res.data.success) {
            report.endOfDay = res.data.summary ?? {}
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
        setLoading(false);
    });
}

export const getCouriers = () => {
    setLoading(true);
    axios({
        url: "api/v2/report/couriers",
        method: "GET",
        params: {
            domain: localStorage.getItem("domain")
        }
    }).then((res) => {
        if (res.data.success) {
            report.couriers = res.data.couriers ?? {}
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
        setLoading(false);
    });
}

export const getAdditions = () => {
    setLoading(true);
    axios({
        url: "api/v2/report/additions",
        method: "GET",
        params: {
            domain: localStorage.getItem("domain")
        }
    }).then((res) => {
        if (res.data.success) {
            report.additions = res.data.additions ?? []
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
        setLoading(false);
    });
}
export const getPersonnel = () => {
    setLoading(true);
    axios({
        url: "api/v2/report/personnel",
        method: "GET",
        params: {
            domain: localStorage.getItem("domain")
        }
    }).then((res) => {
        if (res.data.success) {
            report.personnel = res.data.personnel ?? []
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
        setLoading(false);
    });
}

export const getCash = () => {
    setLoading(true);
    axios({
        url: "api/v2/report/cash",
        method: "GET",
        params: {
            domain: localStorage.getItem("domain")
        }
    }).then((res) => {
        if (res.data.success) {
            report.cash = res.data.cash ?? []
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
        setLoading(false);
    });
}

