<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import Modal from "./index.vue";
import { modalStore } from "../../store/modal.js";

const props = defineProps(['orderInfo']);
const address = ref(''); 

// Watch ederek props.orderInfo'nun değişmesini dinleyerek address.value'yu güncelliyoruz
watch(() => props.orderInfo, (orderInfo) => {
  address.value = orderInfo.address;
});

const handleClose = () => {
  modalStore.updateOrder = false;
};

const handleSubmit = () => {
  modalStore.updateOrder = false;
  // API çağrısı yaparak address.value'yu gönder

};
</script>

<template>
  <Modal :is-opened="modalStore.updateOrder" :handle-close="handleClose" title="Sipariş Adres Değişikliği">
    <textarea :value="address" @input="address = $event.target.value" rows="6" />
    <button @click="handleSubmit" class="btn btn-success"> Kaydet </button>
  </Modal>
</template>


<style scoped lang="scss">
textarea {
  background: transparent;
  padding: 12px;
  outline: none;
  color: black;
  border-radius: 12px;
  margin-bottom: 20px;
}
</style>