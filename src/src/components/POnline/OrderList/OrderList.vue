<script setup lang="ts">
import { getTotalOfOrders, onlineStore } from "../../../store/online";
import POrderItem from "../../POnlineOrdersItem/POrdersItem.vue"
import { computed } from "vue";
import formatPrice from "../../../utils/formatPrice";

const getTotal = computed(() => getTotalOfOrders());
</script>

<template>
  <div class="col-lg-4 orders-left">
    <div class="orders-top">
      <div class="row">
        <div class="col-lg-6">
          <div class="orders-top-item orders-top-item-active" style="font-size: 13px">
            Gelen Siparişler
            <div class="orders-top-item-notification" style="width: 20px; height: 20px; font-size: 11px ">
              {{ onlineStore.orders.length }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="orders-content">
      <POrderItem v-for="(order, idx) in onlineStore.orders" :key="idx" :order="order" />
    </div>
    <div class="orders-bottom">
      <div></div>
      <div class="d-flex">
        <div class="orders-bottom-title">Toplam</div>
        <div class="orders-bottom-price">{{ formatPrice(getTotal) }}</div>
      </div>
    </div>
  </div>
</template>

<style src="../POnline.scss" scoped></style>