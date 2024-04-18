<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import OrderInfo from "../OrderInfo/index.vue"
import { setUpdateOrderModal } from "../../../store/modal.js";

const props = defineProps(['orderData']);


//Fiş yazdırmak için kullanılacak fonksiyon
const printReceipt = () => {
  console.log(props.orderData)
  
};

</script>

<template>
  <div class="order-info-bottom" :style="`
    position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  `">
    <OrderInfo />


    <div class="orders-right-actions w-100">
      <button class="button-gray" @click="setUpdateOrderModal(true)">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"
            d="M364.13 125.25L87 403l-23 45 44.99-23 277.76-277.13-22.62-22.62zM420.69 68.69l-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 16 0 00-22.62 0z" />
        </svg>
        Düzenle
      </button>

      <div class="d-flex">
        <button class="button-pink" @click="printReceipt">İptal Et</button>
      </div>

      <div class="d-flex">
        <button class="button-pink" @click="printReceipt">Fiş Yazdır</button>
      </div>
    </div>
  </div>
</template>

<style src="../POnline.scss" scoped></style>