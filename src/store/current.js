
import { reactive } from "vue";
import { setLoading } from "./app";
import axios from "axios";

export const Currents = reactive({
    customers: [],
    debtors: [],
    debts: [],
    selectedCustomer: null,
})

export const fetchCustomers = () => {
    setLoading(true);

    axios({
        url: "api/v2/customer/list",
        method: "GET",
        params: {
            domain: localStorage.getItem("domain")
        }
    }).then((res) => {
        if (res.status == 200) {
            Currents.customers = res.data.customers ?? []
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
    });
}

export const fetchDebtors = () => {
    setLoading(true);

    axios({
        url: "api/v2/customer/debtors",
        method: "GET",
        params: {
            domain: localStorage.getItem("domain")
        }
    }).then((res) => {
        if (res.status == 200) {
            Currents.debtors = res.data.debtors ?? []
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
    });
}

export const fetchDebts = () => {
    setLoading(true);

    axios({
        url: "api/v2/customer/debts",
        method: "GET",
        params: {
            domain: localStorage.getItem("domain")
        }
    }).then((res) => {
        if (res.status == 200) {
            Currents.debts = res.data.debts ?? []
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
    });
}

export const updateDeport = (payment_id, amount) => {
    setLoading(true);

    axios({
        url: "api/v2/customer/checkout",
        method: "POST",
        params: {
            domain: localStorage.getItem("domain"),
            id: Currents.selectedCustomer.id,
            payment_id: payment_id,
            amount: amount
        }
    }).then((res) => {
        if (res.status == 200) {
            fetchDebtors()
            Currents.selectedCustomer = null
        }
    }).catch((err) => {
        console.log("err", err);
    });
}