<script setup lang="ts">
import { getTotalOfOrderItems, packageStore } from "../../../store/package";
import { computed } from "vue";
import formatTime from "../../../utils/formatTime";
import formatPrice from "../../../utils/formatPrice";
const order = computed(() => packageStore.order);

const infos = computed(() => [
  {
    label: "Ara Toplam",
    price: getTotalOfOrderItems(order.value.order_items),
  },
]);

const calculateTotalPrice = computed(() => {
  return infos.value.reduce((total, item) => total + Number(item.price), 0);
});
</script>

<template>
  <div class="orders-right-bottom mt-4 d-flex px-3">
    <div v-if="order.notes && order.notes.length" class="orders-bottom-left">
      <div class="orders-note-subtitle">Sipariş Notu</div>
      <div class="orders-note-title">Büyük boy olsun.</div>
    </div>
    <div v-else></div>
    <div class="orders-total-price" v-if="order.order_status.id !== 1">
      <div class="orders-total-price-item d-flex" v-for="item in infos">
        {{ item.label }}
        <div class="basket-item-price">
          {{ formatPrice(item.price) }}
        </div>
      </div>
      <div class="orders-total-price-value d-flex">
        Toplam
        <span class="value">{{ formatPrice(calculateTotalPrice) }}</span>
      </div>
    </div>
  </div>
</template>

<style src="../POnline.scss" scoped></style>
