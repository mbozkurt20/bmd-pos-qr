import {reactive} from "vue";
import axios from "axios";
import {setLoading} from "./app.js";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const packageStore = reactive({
    orders: [],
    order: null,
    courier: null,
    currentCount: 0,
    couriers: []
});

export const changeOrderStatusAPI = (status, orderId = undefined) => {
    setLoading(true);
    axios({
        url: "api/v2/order/status",
        method: "POST",
        data: {
            domain: localStorage.getItem('domain'),
            order_id: orderId ?? packageStore.order.id,
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
    packageStore.order.order_status = {
        ...packageStore.order.order_status,
        id: status
    };

    packageStore.orders = packageStore.orders.map((order) => {
        if (order.id === packageStore.order.id) {
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
    return packageStore.orders.filter((a) => a.order_status.id != 5).reduce((acc, orderItem) => {
        return acc + orderItem.order_items.reduce((accOrderItem, order) => {
            return accOrderItem + (Number(order.amount) * Number(order.price));
        }, 0);
    }, 0);
}

export const setOrder = (payload) => {
    packageStore.order = payload;
}

export const setCourier = (payload) => {
  packageStore.courier = payload;
  packageStore.order.courier = payload
}

export const setCouriers = (payload) => {
  packageStore.couriers = payload;
}

export const fetchOrders = () => {
    axios({
        url: "api/v2/order/packages",
        method: "GET",
        params: {
            domain: localStorage.getItem('domain'),
        }
    }).then((res) => {
        if (res.data.success === true) {
            packageStore.orders = res.data.orders;
            setOrder(res.data.orders.length ? res.data.orders[0] : null);
            packageStore.currentCount = res.data.orders.length;
        }
    }).catch((err) => {
        console.log("err", err);
    });
}

export const setHandoveredCourier = (status, orderId = undefined) => {
  setLoading(true);
  axios({
      url: "api/v2/order/tracking",
      method: "POST",
      data: {
          domain: localStorage.getItem('domain'),
          order_id: orderId ?? packageStore.order.id,
          order_status: status,
          courier_id: packageStore.courier.id,
      }
  }).then((res) => {
      // changeOrderStatus(status);
      if(res.data.success){
        packageStore.order.courier = packageStore.courier
        // toast(res.data.message, {
        //   "theme": "light",
        //   "type": "success",
        //   "position": "top-center",
        //   "autoClose": 2000,
        //   "dangerouslyHTMLString": true
        // })

      }
      setLoading(false);
  }).catch((err) => {
      console.log("err", err);
  });
}
