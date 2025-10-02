<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import OrderInfo from "../OrderInfo/index.vue";
import { changeOrderStatusAPI, packageStore } from "../../../store/package";
const props = defineProps(["orderData"]);
import {
  changeTableStatus,
} from "../../../store/table-detail";

const printReceipt = () => {
  changeTableStatus(3);
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
        <button class="btn-custom ">
          <strong>Düzenle</strong>
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
