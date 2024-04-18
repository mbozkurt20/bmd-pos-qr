<script setup lang="ts">
import PaymentItem from "./PaymentItem.vue";
import { tableDetailStore } from "../../../store/table-detail";
import { computed } from "vue";

const getPayments = computed(() => {
  return tableDetailStore.payments;
});
</script>

<template>
  <div class="bill-content">
    <PaymentItem
      v-for="(payment, i) in getPayments"
      :key="i"
      :payment="payment"
    />
    <!-- <PaymentCartItem  v-for="(item,i) in getBillCart" :key="i + 'cart'" :item="item" /> -->
  </div>
</template>

<style scoped lang="scss"></style>
