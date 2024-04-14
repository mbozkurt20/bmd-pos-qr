<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import OrderInfo from "../OrderInfo/index.vue";
import { changeOrderStatusAPI, packageStore } from "../../../store/package";
const props = defineProps(["orderData"]);

//Fiş yazdırmak için kullanılacak fonksiyon
const printReceipt = () => {
  //console.log(props.orderData);
};
const cancel = () => {
  changeOrderStatusAPI(5, packageStore.order.id);
};
</script>

<template>
  <div
    class="order-info-bottom"
    :style="`
    position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  `"
  >
    <OrderInfo />

    <div class="orders-right-actions w-100">
      <router-link :to="`/packages/${packageStore.order.id}`">
        <button class="button-gray">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M364.13 125.25L87 403l-23 45 44.99-23 277.76-277.13-22.62-22.62zM420.69 68.69l-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 16 0 00-22.62 0z"
            />
          </svg>
          Düzenle
        </button>
      </router-link>
      <button
        class="button-pink"
        @click="cancel"
        v-if="packageStore.order.order_status.id != 5"
      >
        İptal Et
      </button>
      <div class="d-flex">
        <button class="button-pink" @click="printReceipt">Fiş Yazdır</button>
      </div>
    </div>
  </div>
</template>

<style src="../POnline.scss" scoped></style>
