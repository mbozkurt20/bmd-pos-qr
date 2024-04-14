<script setup lang="ts">
import {
  changeOrderStatusAPI,
  packageStore,
  fetchCouriers,
} from "../../../store/package";
import { setCourierListModal } from "../../../store/modal";
import {
  givedIcon,
  inTheRoadIcon,
  preparingIcon,
} from "../../../constants/icons";
import { computed } from "vue";

const order = computed(() => packageStore.order);

const setCouriersModal = () => {
  setCourierListModal(true);
};

const statuses = computed(() => [
  {
    icon: preparingIcon,
    title: "Hazırlanıyor",
    status: 2,
    isShow: order.value.order_status.id === 2,
  },
  {
    icon: inTheRoadIcon,
    title: "Yola Çıktı",
    status: 3,
    isShow: order.value.order_status.id <= 3,
  },
  {
    icon: givedIcon,
    title: "Teslim Edildi",
    status: 4,
    isShow: true,
  },
  {
    icon: givedIcon,
    title: "İptal Edildi",
    status: 5,
    isShow: true,
  },
]);
</script>

<template>
  <div class="d-flex mt-4" style="justify-content: space-between">
    <div class="orders-right-state">
      <template v-for="(item, idx) in statuses" :key="idx">
        <div
          @click="
            item.isShow && item.status !== order.order_status.id
              ? changeOrderStatusAPI(item.status)
              : null
          "
          :class="[
            'orders-right-state-item d-flex gap-2',
            {
              'orders-right-state-item-active':
                item.status === order.order_status.id,
            },
          ]"
          :style="`
          opacity: ${item.isShow ? '1' : '.4'}
        `"
        >
          <div v-html="item.icon"></div>
          {{ item.title }}
        </div>
      </template>
    </div>
    <button class="button-purple" @click="setCouriersModal">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon"
        viewBox="0 0 512 512"
      >
        <circle
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="32"
          cx="256"
          cy="56"
          r="40"
        />
        <path
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="32"
          d="M204.23 274.44c2.9-18.06 4.2-35.52-.5-47.59-4-10.38-12.7-16.19-23.2-20.15L88 176.76c-12-4-23.21-10.7-24-23.94-1-17 14-28 29-24 0 0 88 31.14 163 31.14s162-31 162-31c18-5 30 9 30 23.79 0 14.21-11 19.21-24 23.94l-88 31.91c-8 3-21 9-26 18.18-6 10.75-5 29.53-2.1 47.59l5.9 29.63 37.41 163.9c2.8 13.15-6.3 25.44-19.4 27.74S308 489 304.12 476.28l-37.56-115.93q-2.71-8.34-4.8-16.87L256 320l-5.3 21.65q-2.52 10.35-5.8 20.48L208 476.18c-4 12.85-14.5 21.75-27.6 19.46s-22.4-15.59-19.46-27.74l37.39-163.83z"
        />
      </svg>

      <span v-if="order.courier.length == 0"> Kurye Ata </span>
      <span v-else>{{ order.courier.name }}</span>
    </button>
  </div>
</template>
<style src="../POnline.scss" scoped></style>
