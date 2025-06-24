<script setup lang="ts">
import Modal from "./index.vue";
import { modalStore } from "../../store/modal";
import { tableDetailStore, addCustomer } from "../../store/table-detail";
import axios from "axios";
import { reactive } from "vue";
import { setLoading } from "../../store/app";
import { appStore } from "../../store/app";
import { onMounted, ref, watch } from "vue";
import {toast} from "vue3-toastify";
watch(
  () => appStore.caller,
  () => {
    credentials.phone = appStore.caller.data;
  }
);
const message = ref(null);

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
      console.log({res: response})
      if (response.data.success) {
        message.value = response.data.message;
        addCustomer(response.data.customer);
        tableDetailStore.customer = response.data.customer;
        handleClose();
        Object.assign(credentials, { name: "", phone: "", address: "" });
        setLoading(false);

        setTimeout(() => {
          message.value = "";
        },5000);
      }
    })
    .catch((err) => {
      setLoading(false);

      toast('Üzgünüz, müşteri eklenemedi.',{
        theme: 'dark',
        type: 'warning'
      })
      console.log("err", err);
    })
};
</script>

<template>
  <Modal
    :is-opened="modalStore.createCustomer"
    :handle-close="handleClose"
    title="Müşteri Ekle"
  >
    <p class="py-3 text-custom" v-show="message">{{message}}</p>

    <div class="wrapper">
      <form @submit.prevent="onCreate" >
        <input
            type="text" required
            placeholder="İsim Soyisim"
            v-model="credentials.name"
        />
        <input
            type="tel"k required
            placeholder="Telefon Numarası"
            v-model="credentials.phone"
        />
        <textarea
            type="text"
            rows="6" required
            placeholder="Adres"
            v-model="credentials.address"
        />

        <button class="btn-custom" type="submit" style="margin-top: 12px; color: white">
          Kaydet
        </button>
      </form>
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
