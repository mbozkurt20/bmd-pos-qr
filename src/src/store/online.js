import {reactive} from "vue";
import axios from "axios";
import {setLoading} from "./app.js";

export const onlineStore = reactive({
    orders: [],
    order: null,
    currentCount: 0
});
let interval = null;

export const changeOrderStatusAPI = (status, orderId = undefined) => {
    setLoading(true);
    axios({
        url: "api/v2/order/status",
        method: "POST",
        data: {
            domain: localStorage.getItem('domain'),
            order_id: orderId ?? onlineStore.order.id,
            order_status: status
        }
    }).then((res) => {
        changeOrderStatus(status);
        setLoading(false);
    }).catch((err) => {
        console.log("err", err);
        setLoading(false);
    });
}

export const changeOrderStatus = (status) => {
    onlineStore.order.order_status = {
        ...onlineStore.order.order_status,
        id: status
    };
    onlineStore.orders = onlineStore.orders.map((order) => {
        if (order.id === onlineStore.order.id) {
            return {
                ...order,
                order_status: {
                    ...order.order_status,
                    id: status
                }
            }
        } else {
            return order;
        }
    });
}

export const getTotalOfOrderItems = (orderItems) => {
    return orderItems.reduce((acc, order) => {
        return acc + (Number(order.amount) * Number(order.price));
    }, 0);
}


export const getTotalOfOrders = () => {
    return onlineStore.orders.reduce((acc, orderItem) => {
        return acc + orderItem.order_items.reduce((accOrderItem, order) => {
            return accOrderItem + (Number(order.amount) * Number(order.price));
        }, 0);
    }, 0);
}

export const setOrder = (payload) => {
    onlineStore.order = payload;
}

export const fetchOrders = () => {
    axios({
        url: "api/v2/order/list",
        method: "GET",
        params: {
            domain: localStorage.getItem('domain'),
        }
    }).then((res) => {
        if (res.data.success === true) {
            onlineStore.orders = res.data.orders;
            setOrder(res.data.orders.length ? res.data.orders[0] : null);
            onlineStore.currentCount = res.data.orders.length;
        }
    }).catch((err) => {
        console.log("err", err);
    });
}

export const fetchLiveOrders = () => {
    interval = setInterval(() => {
        fetchOrders();
        if (onlineStore.orders.length > onlineStore.currentCount) {
            const audio = new Audio('/violet.mp3');
            audio.play();

        }
    }, 60000);
}
export const unSubscribeFromLiveOrders = () => {
  if(interval) clearInterval(interval);
}
