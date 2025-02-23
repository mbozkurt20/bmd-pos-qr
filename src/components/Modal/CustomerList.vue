<script setup lang="ts">
import Modal from "./index.vue";
import {
  modalStore,
  setPaymentMethodModal,
  setCreateCustomerModal,
} from "../../store/modal";
import {
  setCustomer,
  setCustomers,
  tableDetailStore,
  getCartTotal,
  checkCustomer,
} from "../../store/table-detail";
import { onMounted, ref } from "vue";
import axios from "axios";
import { appStore } from "../../store/app";

const selectedCustomerId = ref("");
const customerSearch = ref("");

const sendCustomerToSet = (id) => {
  selectedCustomerId.value = id;
  setCustomer(tableDetailStore.customers.find((e) => e.id === id));
  handleClose();
  selectedCustomerId.value = "";
  customerSearch.value = "";
};

const handleClose = () => {
  modalStore.customerList = false;
};

onMounted(() => {
  fetchCustomers();
});

const fetchCustomers = () => {
  axios({
    method: "GET",
    url: "api/v2/customer/list",
    params: {
      domain: localStorage.getItem("domain"),
    },
  })
    .then((response) => {
      setCustomers(response.data.customers);
      checkCustomer();
    })
    .catch((err) => {
      console.log(err);
    });
};

const onChoose = () => {
  if (getCartTotal() > 0) {
    setPaymentMethodModal(true);
  }
  handleClose();
};
</script>

<template>
  <Modal
    :is-opened="modalStore.customerList"
    :handle-close="handleClose"
    title="Müşteri Seç"
  >
    <div class="row">
      <div class="col-12 px-4">
        <div class="position-relative">
          <ion-icon class="search-icon" name="search-outline" />
          <input
            type="text"
            name="customer-search"
            v-model="customerSearch"
            class="customer-search-input form-control rounded-pill"
            autocomplete="off"
          />
        </div>

        <div class="customers">
          <div
            @click="sendCustomerToSet(customer.id)"
            class="customer-row"
            :class="{ active: selectedCustomerId == customer.id }"
            v-for="(customer, i) in tableDetailStore.customers.filter((c) => {
              return c.name
                .toLowerCase()
                .includes(customerSearch?.toLowerCase());
            })"
          >
            <div class="d-flex justify-content-start align-items-center">
              <ion-icon style="font-size: 18px" name="person-outline" />
              <span class="text-dark">{{ customer.name }}</span>
            </div>
            <div>
              {{ customer.phone }}
            </div>
          </div>
        </div>

        <button class="btn btn-indigo bg-indigo p-3 mt-1 btn btn-sm text-white text-center w-100 rounded-pill"
                @click="setCreateCustomerModal(true)"> Yeni Müşteri Ekle </button>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.customer-row {
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #535353;

  &.active {
    background-color: rgb(241 238 247);
  }
}
.customers {
  height: 320px;
  overflow-y: overlay;
  overflow-x: hidden;
  margin: 1.5rem 0rem;
}

.add-customer-button {
  background-color: rgb(241 238 247);
  color: rgb(99 88 130);
}
.customer-search-input {
  padding-left: 2.25rem;
  font-size: 16px;
}

.search-icon {
  position: absolute;
  left: 0.5rem;
  top: 0.45rem;
  font-size: 1.5rem;
  color: #f2125b;
}
</style>
