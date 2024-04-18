
import { reactive } from "vue";
import { setLoading } from "./app";
import axios from "axios";

export const Settings = reactive({
    setting: {}
})



export const getSetting = () => {
    setLoading(true);

    axios({
        url: "api/v2/setting/app_status_list",
        method: "GET",
        params: {
            domain: localStorage.getItem("domain")
        }
    }).then((res) => {
        if (res.data.success) {
            Settings.setting = res.data.app_status
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
        setLoading(false);
    });
}


export const updateStatus = (payload) => {
    setLoading(true);

    axios({
        url: "api/v2/setting/app_status",
        method: "POST",
        data:payload,
        params: {
            domain: localStorage.getItem("domain"),
        }
    }).then((res) => {
        if (res.data.success) {
            getSetting();
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
        setLoading(false);
    });
}