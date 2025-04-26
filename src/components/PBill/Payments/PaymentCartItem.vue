<script setup lang="ts">
import formatPrice from "../../../utils/formatPrice";
import { selectCartItem } from "../../../store/table-detail";
import { selectBillCartItem } from "../../../store/bill";

const { item } = defineProps(["item"]);
const onDeleteCart = () => {
  selectCartItem(item);
  selectBillCartItem(item);
};
</script>

<template>
  <div class="bill-item">
    {{ item.quantity }} {{ item.name }}
    {{ formatPrice(item.price * item.quantity) }}
    <button @click="onDeleteCart()" class="orders-close" data-v-9d009df2="">
      <ion-icon style="font-size: 20px" name="close-outline" />
    </button>
  </div>
</template>

<style scoped src="../PBill.scss" lang="scss"></style>
