
import { reactive } from "vue";
import { setLoading } from "./app";
import axios from "axios";


export const Menu = reactive({
    categories: [],
    products: []
})

export const fetchMenu = () => {
    setLoading(true);

    axios({
        url: "api/v2/category/all",
        method: "GET",
        params: {
            domain: localStorage.getItem("domain")
        }
    }).then((res) => {
        if (res.status == 200) {
            Menu.categories = res.data.categories ?? []
            setProducts()
        }
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
    });
}

const setProducts = () => {
    if (Menu.categories.length > 0) {
        let products = []
        Menu.categories.forEach(category => {
            if (category.products.length > 0) {
                category.products.forEach(product => {
                    products.push(product)
                })
            }
        })
        Menu.products = products
    }
}

export const changeMenuStatus = (url, id, status) => {
    axios({
        url: url,
        method: "POST",
        data: {
            domain: localStorage.getItem("domain"),
            id: id,
            status: status,
        },
    })
        .then((res) => {
        })
        .catch((e) => {
            console.log("err", e);
        });
};