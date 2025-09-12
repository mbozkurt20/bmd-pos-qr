import {computed, reactive} from "vue";
import {useRoute} from 'vue-router';
import axios from "axios";
import router from "../router/index.js";
import {billStore, onClickMethod, setBillStoreAmount, setBillingCart} from "./bill.js";
import {setLoading} from "./app";
import {modalStore, setCustomerListModal} from "./modal.js";
import {toast} from "vue3-toastify";
import {appStore} from "./app.js";

import unId from "../utils/uniqueId"

const route = useRoute();
const tableDetailStoreConst = {
    selectedIndex: 0,
    categories: [],
    products: [],
    table: {},
    payments: [],
    cart: [],
    selectedCartItems: [],
    selectedProductOnFeature: null,
    addedProductFeatures: [],
    selectedPortion: null,
    willMoveTableId: null,
    stateTable: [],
    note: "",
    customer: null,
    customers: [],
    customerCount: 0,
    isDivide: false,
    isCatering: false,
    isReturn: false,
    isBilling: false,
    selectedCategory: [],
    subProducts: null,
    showSubCategory: false,
    showParent: true,
    subCategory: [],
    tableSelectedIndex: 0
}

export const tableDetailStore = reactive({...tableDetailStoreConst});

export const addCustomer = (customer) => {
    tableDetailStore.customers.push(customer);
};
export const setCustomers = (customers) => {
    tableDetailStore.customers = customers;
};

const checkUserType = (type) => {
    return localStorage.user ? JSON.parse(localStorage.user).type == type : false
}

export const isThereDivideCartItem = () => {
    const dividedItems = tableDetailStore.cart.filter((e) => {
        return e?.divideQuantity !== undefined;
    });
    if (dividedItems.length) {
        return true;
    } else {
        return false;
    }
};

export const setIsDivide = (payload) => {
    tableDetailStore.isDivide = payload;
};

export const setIsCatering = (payload) => {
    tableDetailStore.isCatering = payload;
};
export const setIsReturn = (payload) => {
    tableDetailStore.isReturn = payload;
};

export const setIsBilling = (payload) => {
    tableDetailStore.isBilling = payload;
}

export const setCustomer = (payload = null) => {
    tableDetailStore.customer = payload;
    onClickMethod(3);
};

const setItemsAsSelected = (item) => {
    tableDetailStore.selectedCartItems = []
    tableDetailStore.selectedCartItems.push(item);
}

export const selectCartItem = (item) => {
    const isAdded = tableDetailStore.selectedCartItems.find(
        (e) => e.id === item.id
    );
    if (!isAdded) {
        setItemsAsSelected(item);
    } else {
        tableDetailStore.selectedCartItems =
            tableDetailStore.selectedCartItems.filter((e) => e.id !== item.id);
    }
};

export const setAddedProductFeatures = (payload = null) => {
    tableDetailStore.addedProductFeatures = JSON.parse(JSON.stringify(payload))
};

export const setTableDetailCart = (payload = null) => {
    tableDetailStore.cart = payload;
}

export const getIsSelectedCartItem = (id) => {
    const finded = tableDetailStore.selectedCartItems.find((e) => e.id === id);
    if (finded) {
        return true;
    } else {
        return false;
    }
};
export const getIsSelectedExcludedItem = (id) => {
    const finded = tableDetailStore.selectedCartItems.find((e) => e.id === id);
    if (finded) {
        return finded.exclude;
    }
    return false
};

export const getSelectedCategory = () => {
    return tableDetailStore.categories[tableDetailStore.selectedIndex];
};

export const resetTableDetail = () => {
    if (
        !tableDetailStore.isDivide ||
        !tableDetailStore.isCatering ||
        !tableDetailStore.isReturn
    ) {
        tableDetailStore.cart = [];
    }
    tableDetailStore.table = {};
};

export const setWillMoveTableId = (payload) => {
    tableDetailStore.willMoveTableId = payload;
};

export const setStateTable = (payload) => {
    tableDetailStore.stateTable = payload;
};

export const getCartTotal = () => {
    return tableDetailStore.cart.reduce((total, item) => {
        let quantity;
        if (item) {
            quantity = item.quantity - ((item.exclude ?? item.exclude ?? 0))
        } else {
            quantity = item.quantity
        }
        let featurePrice = 0
        let portion = item.portion ? parseFloat(item.portion) : 1
        if (item.featureList) {
            featurePrice = item.featureList.map(feature => {
                let optionsAmount = feature.options.filter(option => feature.selected.includes(option.id)).map(option => Number(option.price)).reduce((a, b) => a + b, 0)
                return optionsAmount
            }).reduce((a, b) => a + b, 0)
        }
        return total + Number((Number(item.price) + featurePrice) * portion * quantity)
    }, 0);
};

export const checkPaymentProductIsJson = (payment) => typeof payment.products == 'string' ? JSON.parse(payment.products[0]) : payment.products[0]


export const getProductPaidTotalFromPayments = (id) => {
    return tableDetailStore.payments.filter(payment => payment.products.length > 0 && checkPaymentProductIsJson(payment).id == id).reduce((a, b) => a + b.total, 0)
}

export const checkItemPaidQuantity = (id) => {
    let payments = tableDetailStore.payments.filter(payment => payment.products.length > 0 && checkPaymentProductIsJson(payment).id == id)
    if (payments.length > 0) {
        let paidTotal = payments.reduce((a, b) => a + b.total, 0)
        if (paidTotal != 0) {
            return parseInt(paidTotal / checkPaymentProductIsJson(payments[0]).singleTotal)
        }
    }
    return 0
}

export const itemAbsoluteQuantity = (item) => {
    let cartItem = tableDetailStore.cart.find(cartItem => cartItem.id == item.id)
    if (cartItem) {
        return cartItem.quantity - (checkItemPaidQuantity(cartItem.id) + (cartItem.exclude ?? item.exclude ?? 0))
    } else {
        return item.quantity
    }
}

export const itemAbsolutePrice = (item, single = false) => {
    let featurePrice = 0
    let portion = item.portion ? parseFloat(item.portion) : 1
    if (item.featureList) {
        featurePrice = item.featureList.map(feature => {
            let optionsAmount = feature.options.filter(option => feature.selected.includes(option.id)).map(option => Number(option.price)).reduce((a, b) => a + b, 0)
            return optionsAmount
        }).reduce((a, b) => a + b, 0)
    }
    return Number((Number(item.price) + featurePrice) * portion * (single ? 1 : itemAbsoluteQuantity(item)))
}

const getSelectedProducts = () => {
    return tableDetailStore.selectedCartItems.map(selectedCartItem => {
        let cartItem = tableDetailStore.cart.filter(cartItem => cartItem.id == selectedCartItem.id)[0]
        cartItem.paidTotal = billStore.amount
        return {
            raw_id: cartItem.raw_id,
            id: cartItem.id,
            quantity: cartItem.divideQuantity ?? cartItem.quantity,
            singleTotal: itemAbsolutePrice(cartItem, true)
        }
    })
}

export const addPayment = (
    payload = {
        type,
        name,
        amount,
    }
) => {
    if (billStore.paymentMethod === null) {
        return toast("Lütfen bir ödeme yöntemi seçiniz!", {
            "theme": "dark",
            "type": "warning",
            "pauseOnFocusLoss": false
        })


    }
    tableDetailStore.payments.push({
        ...payload,
        temporary_id: unId(),
        products: getSelectedProducts()
    });
    if (tableDetailStore.selectedCartItems.length > 0) {
        let currentCartItem = tableDetailStore.cart.find(cartItem => cartItem.id == tableDetailStore.selectedCartItems[0].id)
        delete currentCartItem.divideQuantity
    }
    billStore.productAmount = 0
};

export const deletePayment = (temporary_id) => {
    tableDetailStore.payments = tableDetailStore.payments.filter(
        (e) => e.temporary_id !== temporary_id
    );
};

export const sendSelf = (paymentMethod) => {
    setLoading(true);
    axios({
        method: "POST",
        url: "api/v2/order/add_self",
        data: {
            domain: localStorage.getItem("domain"),
            notes: tableDetailStore.note,
            products: parseCart(),
            total: getCartTotal(),
            payment: paymentMethod,
        },
    }).then((response) => {
        if (response.data.success === true) {
            router.push("/index")
        }

        setLoading(false);
    });
};

export const sendPackages = (paymentMethod) => {
    setLoading(true);
    axios({
        method: "POST",
        url: "api/v2/order/add_package",
        data: {
            domain: localStorage.getItem("domain"),
            notes: tableDetailStore.note,
            products: parseCart(),
            total: getCartTotal(),
            payment: paymentMethod,
            customer_id: tableDetailStore.customer.id,
        },
    })
        .then((response) => {
            setLoading(false);
            tableDetailStore.customer = null;
            router.push("/packages")
        })
        .catch((err) => {
            console.log("err", err);
        });
};

export const updatePackages = (paymentMethod, orderId) => {
    setLoading(true);
    axios({
        method: "POST",
        url: "api/v2/order/update_package",
        data: {
            id: orderId,
            domain: localStorage.getItem("domain"),
            notes: tableDetailStore.note,
            products: parseCart(),
            total: getCartTotal(),
            payment: paymentMethod,
            customer_id: tableDetailStore.customer.id,
        },
    })
        .then((response) => {
            setLoading(false);
            router.push("/packages")
        })
        .catch((err) => {
            console.log("err", err);
        });
};

export const parseCart = () => {
    return tableDetailStore.cart.map((e) => {
        return {
            id: e.raw_id,
            product_name: e.name,
            price: e.price,
            quantity: e.quantity,
            exclude: e.exclude || 0,
            exclude_note: e.exclude_note || '',
            features: e.featureList || null,
            portion: e.portion || '1',
            total: itemAbsolutePrice(e),
            product_id: e.product_id
        }
    });
};

export const parseProducts = (products) => {
    return products.map((e) => ({
        features: e.featureList,
        id: e.product_id,
        product_name: e.name,
        price: e.price,
        quantity: e.quantity,
        portion: e.portion,
        divideQuantity: e.divideQuantity ?? undefined,
        total: itemAbsolutePrice(e),
        exclude: e.exclude,
        exclude_note: e.exclude_note
    }));
};

export const setUpdatedCartItems = (payload) => {
    tableDetailStore.selectedCartItems = payload;
}

export const calculatePayedTotal = () => {
    const totalPrice = billStore.selectedCartItems.reduce((acc, item) => {
        return acc + itemAbsolutePrice(item)
    }, 0);

    console.log({totalPrice: totalPrice})
    const paidTotal = tableDetailStore.payments.reduce((acc, payment) => {
        return acc + Number(payment.total);
    }, 0);

    console.log({paidTotal: paidTotal})
    if (paidTotal > 0 && totalPrice === paidTotal && tableDetailStore.selectedCartItems.length && tableDetailStore.isBilling) {
        let cartItems = tableDetailStore.selectedCartItems;
        let newSelected = cartItems.map(i => ({...i, exclude: 1}))
        setUpdatedCartItems(newSelected);
        setIsBilling(false);
    }

    return paidTotal
};

export const calculateClassicProductTotal = (payload) => {
    return payload.reduce((acc, item) => {
        return acc + Number(item.quantity) * Number(item.price);
    }, 0);
};

export const addProductToTable = () => {
    tableDetailStore.willMoveTableId = null;
    tableDetailStore.isDivide = false;
    let cart = parseCart()
    if (cart.length > 0) {
        setLoading(true);
        axios({
            method: "POST",
            url: "api/v2/area/add_product_to_table",
            data: {
                domain: localStorage.getItem("domain"),
                masa_id: tableDetailStore.table.id,
                products: cart,
                total: getCartTotal(),
                notes: tableDetailStore.note,
                customerCount: tableDetailStore.customerCount
            },
        })
            .then((response) => {
                if (response.data.success === true) {
                    setLoading(false);

                    console.log({asf: response})
                    tableDetailStore.customer = null;
                    tableDetailStore.selectedCartItems = []
                    tableDetailStore.selectedIndex = 0;

                    if (!tableDetailStore.table.status){
                        tableDetailStore.table.status = 1;
                    }

                    toast('Adisyon Güncellendi', {
                        "theme": "dark",
                        "type": "success",
                        "pauseOnFocusLoss": false
                    })
                }
            })
            .catch((e) => {
                console.log("err", e);
                setLoading(false);
            });
    } else {
        toast("Adisyon da Ürün Bulunmuyor.", {
            "theme": "dark",
            "type": "warning",
            "position": "top-center",
            "autoClose": 2000,
            "dangerouslyHTMLString": true
        })
    }
};

export const setReservation = (notes) => {

    axios({
        url: "/api/v2/area/reservation",
        method: "POST",
        data: {
            domain: localStorage.getItem("domain"),
            id: tableDetailStore.table.id,
            status: 2,
            reservation: notes,
        },
    })
        .then((res) => {
            if (res.data.success === true) {
                toast('Masa Rezerve Edildi', {
                    "theme": "dark",
                    "type": "success",
                    "pauseOnFocusLoss": false
                })
            }
        })
        .catch((e) => {
            console.log("err", e);
        });
};

export const changeTableStatus = (status) => {
    axios({
        url: "/api/v2/area/status",
        method: "POST",
        data: {
            domain: localStorage.getItem("domain"),
            id: tableDetailStore.table.id,
            status: status,
        },
    })
        .then((res) => {
            if (res.data.success === true) {
                toast('Masa Güncellendi', {
                    "theme": "dark",
                    "type": "success",
                    "pauseOnFocusLoss": false
                })
            }
        })
        .catch((e) => {
            console.log("err", e);
        });
};

export const updateProductTables = () => {
    const segments = router.currentRoute.value.path.split('/');

    if (calculatePayedTotal() === 0 && segments[1] === 'tables' && segments[3] === 'bill') {
        return toast('Lütfen tahsilat tutarı giriniz veya ödeme türü seçiniz!!', {
            "theme": "dark",
            "type": "warning",
            "dangerouslyHTMLString": true
        });
    }

    tableDetailStore.willMoveTableId = null;
    tableDetailStore.isDivide = false;

    setLoading(true);

    let updateData = {
        domain: localStorage.getItem("domain"),
        table_id: tableDetailStore.table.id,
        products: parseCart(),
        total: getCartTotal(),
        tahsil: calculatePayedTotal(),
        notes: tableDetailStore.note,
    }

    let payments = tableDetailStore.payments.map((e) => ({
        ...e,
        products: e.products.map(product => {
            return {
                id: product.raw_id,
                quantity: product.quantity,
                singleTotal: product.singleTotal,
            }
        }),
        customer_id: tableDetailStore.customer?.id || 0
    }));

    if (payments.length > 0) {
        updateData.payments = payments
    }

    axios({
        method: "POST",
        url: "/api/v2/area/table_order_update",
        data: updateData,
    })
        .then((response) => {
            setLoading(false);
            console.log({response56: response})

            toast(response.data.message, {
                "theme": "dark",
                "type": "success",
                "pauseOnFocusLoss": false
            })

            if (response.data.total === response.data.tahsil) {
                setTimeout(() => {
                    router.push("/tables");
                }, 1100);
            }

        })
        .catch((error) => {
            setLoading(false);

            toast(error.response.data.message, {
                "theme": "dark",
                "type": "warning",
                "dangerouslyHTMLString": true
            });
            console.log({error: error});
        });
};

export const interactSelectedCartProduct = (type) => {
    const product = tableDetailStore.cart.find(
        (e) =>
            e.id ===
            tableDetailStore.selectedCartItems[
            tableDetailStore.selectedCartItems.length - 1
                ].id
    );
    if (!product) {
        return;
    }
    switch (type) {
        case "increment":
            console.log({tt: product})
            if (product.quantity && product.quantity >= 1) {
                product.quantity++;
            }
            break;
        case "decrement":
            if (product.quantity) {
                if (product.quantity > 1) {
                    product.quantity--;
                }
            } else {
                product.quantity = 1
            }
            break;
        case "remove":
            if (!product.divideQuantity || product.divideQuantity === product.quantity) {
                removeProductFromCart(product.id);
            } else {
                product.quantity -= product.divideQuantity
            }
            delete product.divideQuantity;
            tableDetailStore.selectedCartItems = [];
            break;
        case "clear":
            if (
                tableDetailStore.isDivide ||
                tableDetailStore.isCatering ||
                tableDetailStore.isReturn
            ) {
                tableDetailStore.cart = tableDetailStore.cart.map((e) => {
                    if (e.id === product.id) {
                        return {
                            ...e,
                            divideQuantity: 0,
                        };
                    }
                    return e;
                });
            }
            break;
    }
};

export const giftCartProduct = (note = '') => {

    const product = tableDetailStore.cart.find((e) => e.id === tableDetailStore.selectedCartItems[0].id);
    if (!product) {
        return;
    }
    if (itemAbsoluteQuantity(product) >= 1) {
        tableDetailStore.cart = tableDetailStore.cart.map((e) => {

            if (e.id === product.id) {
                if (!product.divideQuantity) {
                    product.divideQuantity = 1;
                }
                return {
                    ...e,
                    exclude: product.divideQuantity + (product.exclude ?? 0),
                    exclude_note: note,
                    divideQuantity: 0
                };
            }
            return e;
        });
        tableDetailStore.selectedCartItems = [];
    } else {
        toast('Üzgünüz, ikram edilemeyen ürün!!',{
            type: 'warning',
            theme: 'dark'
        })
    }
};

export const addToCartProduct = (product) => {

    let uniqueId = unId()
    let newCartItem = {
        raw_id: uniqueId,
        ...product,
        product_id: product.id,
        id: uniqueId
    }

    tableDetailStore.cart.push(newCartItem);
    setAddedProductFeatures([]);
};

export const removeProductFromCart = (id) => {
    tableDetailStore.cart = tableDetailStore.cart.filter((e) => e.id !== id);
};

export const onReturn = () => {
    tableDetailStore.cart = tableDetailStore.cart
        .map((item) => {
            if (item.divideQuantity) {
                if (item.quantity - item.divideQuantity !== 0)
                    return {
                        ...item,
                        quantity: item.quantity - item.divideQuantity,
                        divideQuantity: undefined,
                    };
                return null;
            } else {
                return {
                    ...item,
                };
            }
        })
        .filter((v) => v != null);
    for (let i = 0; i < tableDetailStore.selectedCartItems; i++) {
        const selectedItem = tableDetailStore.selectedCartItems[i];
    }
    setIsReturn(false);
};

export const fetchMenu = () => {
    setLoading(true);
    axios({
        method: "GET",
        url: "/api/v2/category/list",
        params: {
            domain: localStorage.getItem("domain"),
        },
    })
        .then((response) => {
            console.log({response: response})
            if (response.data.success === true) {
                tableDetailStore.categories = response.data.categories;
                tableDetailStore.products =
                    response.data.categories[tableDetailStore.selectedIndex].products;
                setLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
};

export const fetchTable = (id) => {

    tableDetailStore.cart = []
    setLoading(true);
    axios({
        method: "GET",
        url: "/api/v2/area/show",
        params: {
            id: id,
            domain: localStorage.getItem("domain"),
        },
    })
        .then((response) => {
            if (response.data.success === true) {
                tableDetailStore.table = response.data.table[0];
                tableDetailStore.note = response.data.table[0].orders[0].notes ?? "";
                tableDetailStore.cart =
                    response.data.table[0].orders[0].order_items.map((e) => ({
                        name: e.title,
                        raw_id: e.id,
                        id: unId(),
                        price: e.price,
                        quantity: e.amount,
                        exclude: e.exclude,
                        exclude_note: e.exclude_note,
                        featureList: e.features,
                        portion: e.portion,
                        product_id: e.product_id
                    }));
                tableDetailStore.payments = response.data.table[0].orders[0].order_payments?.map((e) => {
                    let products = typeof e.products === 'string' ? JSON.parse(e.products) : e.products
                    if (products && products.length > 0) {
                        products = products.map(product => {
                            return {
                                ...product,
                                raw_id: product.id,
                                id: tableDetailStore.cart.find(cartItem => cartItem.raw_id == product.id).id ?? null
                            }
                        })
                    }
                    return {
                        title: e.title,
                        products: products,
                        payment_type: e.type,
                        total: parseFloat(e.total),
                        temporary_id: unId(),
                    }
                }) ?? [];
                tableDetailStore.customerCount = response.data.table[0].orders[0].customer_count
                setLoading(false);
            }
            console.log(tableDetailStore.cart, "cart-3")

        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
};

export const fetchFastSell = () => {
    tableDetailStore.table = {
        name: "Gel-Al",
        isFastSell: true,
    };
    tableDetailStore.note = "";
    tableDetailStore.cart = [];
};

export const fetchPackages = (id = null) => {
    tableDetailStore.table = {
        name: "Paket Satış",
        isPackages: true,
    };
    tableDetailStore.note = "";
    if (id) {
        fetchSingleOrder(id)
    } else {
        tableDetailStore.cart = [];
    }
};


export const fetchSingleOrder = async (id) => {
    setLoading(true);

    axios({
        url: "/api/v2/order/show",
        method: "GET",
        params: {
            domain: localStorage.getItem('domain'),
            id: id,
        }
    }).then((res) => {
        if (res.data.success === true) {
            tableDetailStore.cart = res.data.order.products.map(item => ({
                exclude: item.exclude,
                exclude_note: item.exclude_note,
                id: unId(),
                raw_id: item.id,
                name: item.title,
                price: item.total,
                quantity: item.amount,
                portion: item.portion
            }))
            do {
                tableDetailStore.customer = tableDetailStore.customers.find(customer => customer.name == res.data.order.full_name) ?? null
            }
            while (tableDetailStore.customers.length == 0);
            tableDetailStore.table.payment_method = res.data.order.payment_method
            setLoading(false);
        }
    }).catch((err) => {
        console.log("err", err);
    });
}

export const setSelectedCategory = (args, newCategory) => {

    if (args == null) {
        tableDetailStore.selectedCategory = [];

        tableDetailStore.products = [];
        tableDetailStore.showParent = true;
        tableDetailStore.showSubCategory = false;
        return
    }
    if (!tableDetailStore.selectedCategory.find((a) => a.id == args.id)) {
        tableDetailStore.selectedCategory.push(args)
    }

}

export const checkCustomer = () => {
    if (appStore.caller) {
        const customer = tableDetailStore.customers.find(
            (a) => a.phone == appStore.caller.data
        );
        if (customer) {
            setCustomer(tableDetailStore.customers.find((e) => e.id === customer.id));
        } else {
            modalStore.createCustomer = true;
        }
    }
};