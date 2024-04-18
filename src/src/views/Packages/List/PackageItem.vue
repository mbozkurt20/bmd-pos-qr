<script setup lang="ts">
import { computed } from "vue";
import formatPrice from "../../../utils/formatPrice";
import {
  givedIcon,
  inTheRoadIcon,
  preparingIcon,
} from "../../../constants/icons";
import { changeOrderStatusAPI } from "../../../store/online";

const { item } = defineProps(["item"]);

const orderStatus = computed(() => item.order_status.id);
const getOrderStatusName = computed(() => {
  switch (item.order_status.id) {
    case 2:
      return "Hazırlanıyor";
    case 3:
      return "Yola Çıktı";
    case 4:
      return "Teslim Edildi";
  }
});

const getTotalPrice = computed(() => {
  return item.order_items.reduce((acc, order_item) => {
    return acc + Number(order_item.total);
  }, 0);
});

const statuses = computed(() => [
  {
    icon: preparingIcon,
    title: "Hazırlanıyor",
    status: 2,
  },
  {
    icon: inTheRoadIcon,
    title: "Yola Çıktı",
    status: 3,
  },
  {
    icon: givedIcon,
    title: "Teslim Edildi",
    status: 4,
  },
]);
</script>

<template>
  <div class="package">
    <h1 class="title">{{ item.platform }} #{{ item.id }}</h1>
    <p class="price">
      {{ formatPrice(getTotalPrice) }}
    </p>
    <p
      :class="[
        'status',
        {
          preparing: orderStatus === 2,
          road: orderStatus === 3,
          gived: orderStatus === 4,
        },
      ]"
    >
      {{ getOrderStatusName }}
    </p>

    <div
      @click="changeOrderStatusAPI(3, item.id)"
      v-if="orderStatus === 2"
      class="d-flex gap-2"
      style="
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 8px;
        cursor: pointer;
      "
    >
      <ion-icon
        name="bicycle-outline"
        style="font-size: 15px; color: black"
      ></ion-icon>
      <span style="font-size: 13px">Yola Çıktı</span>
    </div>
    <div
      @click="changeOrderStatusAPI(4, item.id)"
      v-if="orderStatus === 3"
      class="d-flex gap-2"
      style="
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 8px;
        cursor: pointer;
      "
    >
      <div v-html="givedIcon"></div>
      Teslim Edildi
    </div>
  </div>
</template>

<style scoped lang="scss">
.package {
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  height: 180px;

  .title {
    font-size: 18px;
    color: #333;
  }

  .price {
    font-size: 16px;
    color: crimson;
    margin: 0px 0px 0px 0px;
  }

  .status {
    font-size: 16px;
    color: crimson;
    margin: 0px 0px 12px 0px;

    &.preparing {
      color: orange;
    }

    &.road {
      color: deepskyblue;
    }

    &.gived {
      color: green;
    }
  }

  .status {
    margin-top: 12px;
    color: #777;
    font-size: 13px;
    font-weight: bold;
  }
}
</style>
