<script setup lang="ts">
import { onlineStore } from "../../../store/online";
import { computed } from "vue";
import router from "../../../router";
import getPlatformImage from "../../../utils/getPlatformImage";
const order = computed(() => onlineStore.order);


const formatTime = (timestamp) => {
  const options = { hour: "numeric", minute: "numeric" };
  return new Date(timestamp).toLocaleTimeString("tr-TR", options);
};
</script>

<template>
  <div class="orders-right-top">
    <div class="orders-right-top-lefts">
      <div class="orders-item-left w-100">
        <img :src="getPlatformImage(order.platform)" class="orders-item-image" alt="">
        <div class="orders-item-texts">
          <div class="orders-item-time" style="font-size: 12px">
            {{ formatTime(order.created_at)}}
          </div>
          <div class="orders-item-name" style="font-size: 14px">
            {{ order.full_name }}
          </div>
          <div class="orders-item-method" style="font-size: 14px">
            {{ order.payment_method }}
          </div>
        </div>
      </div>
      <div style="font-size: 14px" class="orders-right-top-title w-100">
        <ion-icon name="call-outline" style="font-size: 18px" />  {{ order.phone }}
      </div>

      <button
        @click="router.back()"
        class="orders-close"
        style="flex-shrink: 0"
      >
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
            d="M368 368L144 144M368 144L144 368"
          />
        </svg>
      </button>
    </div>

    <div class="orders-right-top-title w-100">
      <ion-icon name="navigate-outline" style="font-size: 18px" />
      <p>
        {{ order.address }}
      </p>
    </div>
  </div>
</template>

<style src="../POnline.scss" scoped></style>
