<script setup lang="ts">
import Modal from "./index.vue";
import { modalStore } from "../../store/modal";
import { tableDetailStore, addCustomer } from "../../store/table-detail";
import axios from "axios";
import { reactive } from "vue";
import { setLoading } from "../../store/app";
import { appStore } from "../../store/app";
import { onMounted, ref, watch } from "vue";
watch(
  () => appStore.caller,
  () => {
    credentials.phone = appStore.caller.data;
  }
);
const credentials = reactive({
  name: "",
  phone: appStore.caller ? appStore.caller.data : "",
  address: "",
});

const handleClose = () => {
  modalStore.createCustomer = false;
};

const onCreate = () => {
  setLoading(true);
  axios({
    url: "api/v2/customer/add",
    method: "POST",
    data: {
      domain: localStorage.getItem("domain"),
      ...credentials,
    },
  })
    .then((response) => {
      if (response.data.success) {
        addCustomer(response.data.customer);
        tableDetailStore.customer = response.data.customer;
        handleClose();
        Object.assign(credentials, { name: "", phone: "", address: "" });
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};
</script>

<template>
  <Modal
    :is-opened="modalStore.createCustomer"
    :handle-close="handleClose"
    title="Müşteri Ekle"
  >
    <div class="wrapper">
      <input
        type="text"
        placeholder="İsim Soyisim"
        v-model="credentials.name"
      />
      <input
        type="text"
        placeholder="Telefon Numarası"
        v-model="credentials.phone"
      />
      <textarea
        type="text"
        rows="6"
        placeholder="Adres"
        v-model="credentials.address"
      />

      <button @click="onCreate" style="margin-top: 12px; color: white">
        Kaydet
      </button>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;

  input,
  textarea {
    width: 100%;
    background-color: transparent;
    outline: none;
    border: 1px solid #ddd;
    color: black;
    padding: 8px 12px;
    border-radius: 8px;
  }

  button {
    width: 100%;
  }
}
</style>
