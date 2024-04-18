<script setup lang="ts">
import {computed} from "vue";
import {onlineStore} from "../../../store/online";

import formatTime from "../../../utils/formatTime";
import formatPrice from "../../../utils/formatPrice";
const order = computed(() => onlineStore.order);


</script>

<template>
  <div class="basket-items-row basket-items-order">
    <div v-for="item in order.order_items" :key="item.id" class="basket-items-row-item">
      <div class="basket-item-left">
        <div class="basket-item-piece">
          {{ item.amount }}x
        </div>
        <div class="basket-item-label">
          <p class="p-0 m-0">{{ item.title }}</p>
          <p class="p-0 m-0 basket-item-time" v-if="item.created_at">
            {{ formatTime(item.created_at) }}
          </p>
        </div>
      </div>
      <div class="basket-item-right">
        <div class="basket-item-price">
          {{formatPrice(item.total)}}
        </div>
      </div>
    </div>
  </div>
</template>

<style src="../POnline.scss" scoped>
</style>

<style scoped>
.basket-item-time {
  background: rgb(224, 224, 224) !important;
  color: rgb(155, 155, 155);
  padding: 5px 12px;
  border-radius: 2px;
  text-align: center;
}
</style>