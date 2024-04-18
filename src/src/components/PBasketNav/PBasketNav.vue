<template>
  <div class="basket-nav">
    <button @click="item.onClick" class="basket-nav-item" v-for="item in items">
      <ion-icon style="font-size: 22px" :name="item.icon"></ion-icon>
      {{ item.label }}
    </button>
  </div>
</template>

<script setup>
import {
  addToCartProduct,
  interactSelectedCartProduct,
  setWillMoveTableId,
  tableDetailStore,
  updateProductTables,
} from "../../store/table-detail";
import { computed } from "vue";
import router from "../../router/index.js";

const props = defineProps({
  isShowMoveButton: false,
  items: { type: Array, required: true },
});
</script>

<style src="./PBasketNav.scss" lang="scss"></style>
