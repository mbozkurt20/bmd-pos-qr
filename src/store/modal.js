import {reactive} from "vue";

export const modalStore = reactive({
    reservation: false,
    giftNote: false,
    createNote: false,
    paymentMethod: false,
    customerList: false,
    createCustomer: false,
    updateOrder: false,
    courierList: false,
    featureList: false,
    debtorUpdate: false,
    settingModal:false
});

export const setDebtorUpdateModal = (payload = undefined) => {
    window.scrollTo(0, 0);
    if (!payload) {
        modalStore.debtorUpdate = true;
    } else {
        modalStore.debtorUpdate = payload;
    }
}

export const setGiftNoteModal = (payload = undefined) => {
    window.scrollTo(0, 0);
    if (!payload) {
        modalStore.giftNote = true;
    } else {
        modalStore.giftNote = payload;
    }
}

export const setReservationModal = (payload = undefined) => {
    window.scrollTo(0, 0);
    if (!payload) {
        modalStore.reservation = true;
    } else {
        modalStore.reservation = payload;
    }
}

export const setCreateNoteModal = (payload = undefined) => {
    window.scrollTo(0, 0);
    if (!payload) {
        modalStore.createNote = true;
    } else {
        modalStore.createNote = payload;
    }
}

export const setCreateCustomerModal = (payload = undefined) => {
    window.scrollTo(0, 0);
    if (!payload) {
        modalStore.createCustomer = true;
    } else {
        modalStore.createCustomer = payload;
    }
}
export const setPaymentMethodModal = (payload = undefined) => {
    window.scrollTo(0, 0);
    if (!payload) {
        modalStore.paymentMethod = true;
    } else {
        modalStore.paymentMethod = payload;
    }
}

export const setCustomerListModal = (payload = undefined) => {
    window.scrollTo(0, 0);
    if (!payload) {
        modalStore.customerList = true;
    } else {
        modalStore.customerList = payload;
    }
}

export const setCourierListModal = (payload = undefined) => {
  window.scrollTo(0, 0);
  if (!payload) {
      modalStore.courierList = true;
  } else {
      modalStore.courierList = payload;
  }
}

export const setUpdateOrderModal = (payload = undefined) => {
    window.scrollTo(0, 0);
    if (!payload) {
        modalStore.updateOrder = true;
    } else {
        modalStore.updateOrder = payload;
    }
}

export const setFeatureListModal = (payload = undefined) => {
  window.scrollTo(0, 0);
  if (!payload) {
      modalStore.featureList = true;
  } else {
      modalStore.featureList = payload;
  }

  
}
export const setSettingModal = (payload = undefined) => {
    window.scrollTo(0, 0);
    if (!payload) {
        modalStore.settingModal = true;
    } else {
        modalStore.settingModal = payload;
    }
  }