<script setup lang="ts">
import formatPrice from "../../../utils/formatPrice";
import {
  addToCartProduct,
  setAddedProductFeatures,
  tableDetailStore,
  setSelectedCategory,
} from "../../../store/table-detail";
import { modalStore, setFeatureListModal } from "../../../store/modal";
import { ref, watch, reactive } from "vue";
import { onLongPress } from "@vueuse/core";
import { useRoute } from "vue-router";
const { product } = defineProps(["product"]);
const route = useRoute();
const packageRoute = ref(route.fullPath.split("/")[1] == "packages");
const fastSell = ref(route.fullPath.split("/")[1] == "fast-sell");

const startTime = ref(0);
const pressTimer = ref(null);

const startPress = (item) => {
  startTime.value = Date.now();
  pressTimer.value = setTimeout(() => {
    if (item.hasOwnProperty("features") && item.features.length) {
      setAddedProductFeatures(item.features);
    }
    if (packageRoute.value) {
      item.price = item.package_price;
    } else if (fastSell.value) {
      item.price = item.fast_price;
    }
    tableDetailStore.selectedProductOnFeature = item;
    setFeatureListModal(true);
  }, 500);
};

const endPress = (item) => {
  clearTimeout(pressTimer.value);
  const pressDuration = Date.now() - startTime.value;
  if (pressDuration < 500) {
    if (packageRoute.value) {
      item.price = item.package_price;
    } else if (fastSell.value) {
      item.price = item.fast_price;
    }
    const audio = new Audio("/dot.mp3");
    audio.play();
    addToCartProduct({
      ...item,
      quantity: 1,
      updated_at: new Date().toString(),
      portion: 1,
    });
  }
};

const cancelPress = (item) => {
  clearTimeout(pressTimer.value);
  startTime.value = 0;
};
const submit = (item) => {
  setSelectedCategory({ id: item.id, label: item.name, url: "/" });
  if (item.children_recursive.length > 0) {
    tableDetailStore.showParent = false;
    tableDetailStore.showSubCategory = true;
    tableDetailStore.subCategory = item.children_recursive;
  } else {
    tableDetailStore.subCategory = [];
    tableDetailStore.showSubCategory = false;
    tableDetailStore.showParent = false;
    tableDetailStore.products = item.products;
  }
};
</script>

<template>
  <div class="orders gap-2 mt-4" v-if="product.length > 0">
    <div
      class="order-card"
      :class="{ 'order-card-active': item.active }"
      v-for="item in product"
      :key="item.id"
      @mousedown="startPress(item)"
      @touchstart="startPress(item)"
      @mouseup="endPress(item)"
      @touchend="endPress(item)"
      @mouseleave="cancelPress(item)"
      @touchcancel="cancelPress(item)"
    >
      <button class="order-card-button" v-if="item.active">Bitti!</button>
      <img :src="item.image" class="order-card-image cursor-pointer" />
      <div class="order-card-name cursor-pointer">{{ item.name }}</div>
      <form class="order-card-info">
        <div class="order-card-price" v-if="packageRoute">
          {{ formatPrice(item.package_price) }}
        </div>
        <div class="order-card-price" v-if="fastSell">
          {{ formatPrice(item.fast_price) }}
        </div>

        <div class="order-card-price" v-if="!packageRoute && !fastSell">
          {{ formatPrice(item.price) }}
        </div>
      </form>
    </div>
  </div>
  <div class="orders gap-2 mt-4" v-if="tableDetailStore.showParent">
    <div
      class="order-card"
      style="height: 214px"
      v-for="item in tableDetailStore.categories[tableDetailStore.selectedIndex]
        ?.children_recursive"
      :key="item.id"
      @click="submit(item)"
    >
      <div class="cursor-pointer">
        {{ item.name }}
      </div>
    </div>
  </div>
  <div
    class="orders gap-2 mt-4"
    v-if="tableDetailStore.showSubCategory && tableDetailStore.showSubCategory"
  >
    <div
      class="order-card"
      style="height: 214px"
      v-for="item in tableDetailStore.subCategory"
      :key="item.id"
      @click="submit(item)"
    >
      <div class="cursor-pointer">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-card-image {
  width: 100%;
  border-radius: 8px;
}

.quantity-input {
  background: transparent;
  width: 40px;
  color: black;
  text-align: center;

  border-radius: 8px;
  padding: 0.45em 0px;
}

.cursor-pointer {
  cursor: pointer !important;
}
.order-card-image {
  width: 100%;
  border-radius: 8px;
}

.quantity-input {
  background: transparent;
  width: 40px;
  color: black;
  text-align: center;

  border-radius: 8px;
  padding: 0.45em 0px;
}

.order-card {
  display: flex;
  align-items: center;
  width: 100%;
  color: #000;
  display: grid;
  font-weight: 600;
  text-align: center;
}

.cursor-pointer {
  cursor: pointer !important;
}
</style>
