<template>
  <div
    class="content"
    :class="[productClass, { 'mobile-layout': isMobile }]"
    style="border-top-right-radius: 12px; border-bottom-right-radius: 12px"
  >
    <div :class="[{ 'mobile-layout': isMobile, row: !isMobile }]">
      <div
        class="col-lg-3 col-md-4 col-sm-6"
        v-for="item in productItems"
        :key="item.id"
      >
        <PBasketProductItem :table="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import formatTime from "../../utils/formatTime";
import PBasketProductItem from "./PBasketProductItem/PBasketProductItem.vue";
const props = defineProps<{
  colSize: number;
  productItems: unknown;
  productType: String;
  isMobile: boolean;
}>();

const productClass = computed(() => {
  return `col-lg-${props.colSize}`;
});
</script>

<style src="./PBasketProducts.scss" lang="scss"></style>
