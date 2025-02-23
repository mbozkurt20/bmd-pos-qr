<template>
  <div class="notifications">
    <div class="notifications-title text-indigo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon text-indigo"
        viewBox="0 0 512 512"
      >
        <path
          d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
      </svg>
      Bildirimler
    </div>
    <TransitionGroup name="list" tag="div">
      <div
        @click="goToOrder(item)"
        class="notifications-item"
        v-for="(item, idx) in orders"
        :key="idx"
      >
        <img
          :src="getPlatformImage(item.platform)"
          class="notifications-item-image"
        />
        <div class="notifications-item-group">
          <div class="notifications-item-title text-indigo">Yeni Sipariş Var</div>
          <div class="notifications-item-time text-indigo">
            {{ formatTime(item.created_at) }}
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  fetchLiveOrders,
  fetchOrders,
  onlineStore,
  setOrder,
  unSubscribeFromLiveOrders,
} from "../../store/online.js";
import getPlatformImage from "../../utils/getPlatformImage";
import router from "../../router/index.js";

const orders = computed(() => {
  return onlineStore.orders.filter((e) => e.order_status.id <= 2).slice(0, 4);
});

const goToOrder = (order) => {
  setOrder(order);
  router.push("/online");
};

onMounted(() => {
  fetchOrders();
  fetchLiveOrders();
});

onUnmounted(() => {
  unSubscribeFromLiveOrders();
});

const formatTime = (timestamp) => {
  const options = { hour: "numeric", minute: "numeric" };
  return new Date(timestamp).toLocaleTimeString("tr-TR", options);
};

</script>

<style src="./PNotifications.scss" lang="scss" />

<style>
.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}
</style>
