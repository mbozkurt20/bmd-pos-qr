import { reactive } from "vue";
import { addPayment, tableDetailStore, addProductToTable, updateProductTables, setIsBilling } from "./table-detail.js";
import { setCustomerListModal } from "./modal.js"
import {toast} from "vue3-toastify";
import router from "../router";

export const billStore = reactive({
  amount: 0,
  toBeAddedAmount: 0,
  productAmount: 0,
  paymentMethod: null,
  selectedCartItems: [],
});

export const setPaymentMethod = (payload) => {
  billStore.paymentMethod = payload;
}

export const setBillingCart = (payload) => {
  if (!payload.length) billStore.amount = 0;
  billStore.selectedCartItems = payload;
}

export const setBillStoreAmount = (payload) => {
  billStore.toBeAddedAmount = payload;
  setFinalAmount(payload);
}

export const setPayAllAmount = (payload) => {
  billStore.amount = payload;
}

export const setBillStoreAmountDec = (payload) => {
  billStore.productAmount = payload;
}


export const setFinalAmount = (payload) => {
  billStore.productAmount = billStore.productAmount + payload;
  billStore.toBeAddedAmount = 0;
}

export const paymentMethods = [
  {
    type: 1,
    title: 'Nakit'
  },
  {
    type: 2,
    title: 'Kredi Kartı'
  },
  {
    type: 9,
    title: 'EFT-POS'
  },
  {
    type: 3,
    title: 'Cari',
    onClick: () => {
      if(billStore.amount > 0){
      setCustomerListModal(true);
    }
    }
  },
  {
    type: 7,
    title: 'Oda Hesabı'
  },
  {
    type: 6,
    title: 'İndirim'
  },
  {
    type: 5,
    title: 'Ticket'
  },
  {
    type: 10,
    title: 'Multinet'
  },
  {
    type: 11,
    title: 'Sodexo'
  },
  {
    type: 4,
    title: 'Ödenmez'
  },
  // {
  //   type: 8,
  //   title: 'Kaydet',
  //   onClick: () => {
  //     billStore.selectedCartItems = billStore.selectedCartItems.map(item => ({ ...item, isPaid: true }));
  //     setBillStoreAmount(0);
  //     setIsBilling(false);
  //     // if (tableDetailStore.table.status === 2) {
  //     //   addProductToTable();
  //     // } else {
  //     //   updateProductTables();
  //     // }
  //   }
  // }
];

export const getSelectedMethodName = () => {
  if (billStore.paymentMethod === null) {
    return "";
  }
  return paymentMethods.find((e) => e.type === billStore.paymentMethod).title;
}

export const getMethodFromType = (type) => {
  if(type == 3){
    return tableDetailStore.customer?.name
  }
  return paymentMethods.find((e) => e.type === type).title;
}

export const onClickMethod = (payload) => {  
if(billStore.amount > 0){
  billStore.paymentMethod = payload;
  addPayment({
    payment_type: payload,
    title: getMethodFromType(payload),
    total: Number(billStore.amount)
  });
  billStore.amount = 0;
  setPaymentMethod(null);
  tableDetailStore.selectedCartItems = []
}else {
  toast.warning('Lütfen Bir Tutar Giriniz !!')
}
}

export const selectBillCartItem = (item) => {
  const isAdded = billStore.selectedCartItems.find(
    (e) => e.id === item.id
  );
  if (!isAdded) {
    billStore.selectedCartItems.push(item);
  } else {
    billStore.selectedCartItems =
      billStore.selectedCartItems.filter((e) => e.id !== item.id);
  }
};

export const clickCalculatorButton = (value) => {
  billStore.amount = parseFloat(billStore.amount);

  if (value === 'C') {
    billStore.amount = 0;
    return;
  }
  if (value === 'remove') {
    billStore.amount = Number(billStore.amount.toString().slice(0, -1));
    return;
  }
  if (value === 'enter') {
    // billStore.amount = 0;
    console.log({amount:  billStore.amount})
    updateProductTables();
    return;
  }
  if(value == '%'){
    billStore.amount = String(Number(parseFloat(tableDetailStore.table.amount) * Number(billStore.amount)) / 100)
  }else{
    billStore.amount += value;
  }
}