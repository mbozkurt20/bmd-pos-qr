<script setup lang="ts">
import formatPrice from "../../../utils/formatPrice";
import { deletePayment } from "../../../store/table-detail";

const { payment } = defineProps(["payment"]);
const onDeletePayment = () => {
  deletePayment(payment.temporary_id);
};
</script>

<template>
  <div class="bill-item">
    {{ payment.title }}
    {{ formatPrice(payment.total) }}
    <button @click="onDeletePayment()" class="orders-close" data-v-9d009df2="">
      <ion-icon style="font-size: 20px" name="close-outline" />
    </button>
  </div>
</template>

<style src="../PBill.scss" lang="scss"></style>
