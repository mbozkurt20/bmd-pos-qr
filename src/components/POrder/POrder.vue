<template>
  <div class="content">
    <div class="content-top">
      <PBreadcrumb :items="getBreadcrumb" />
      <div class="info">
        <div class="input-wrapper">
          <div class="input-icon">
            <ion-icon style="font-size: 22px" name="search-outline" />
          </div>
          <input v-model="searchText" type="text" class="input" placeholder="Ara" />
        </div>
        <div
          class="input-wrapper"
          v-if="
            tableDetailStore.table.isFastSell === undefined &&
            tableDetailStore.table.isPackages === undefined
          "
        >
        </div>
      </div>
    </div>

    <ProductItem :product="filteredOrderItems" />
  </div>

  <FeatureList />
</template>

<script setup lang="ts">
import PBreadcrumb from "../PBreadcrumb/PBreadcrumb.vue";
import ProductItem from "./ProductItem/ProductItem.vue";
import FeatureList from "../Modal/FeatureList.vue";
import { computed, reactive,ref } from "vue";
import {
  tableDetailStore,
  getSelectedCategory,
} from "../../store/table-detail";

const props = defineProps(["orderItems"]);
const searchText = ref("");

const filteredOrderItems = computed(() => {
  if (!props.orderItems) return [];

  return props.orderItems.filter((item: any) =>
      item.name?.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

const getBreadcrumb = computed(() => {
  const selectedCategory = getSelectedCategory();
  var result = [];
  result.push({
    label: "Menüler",
    url: "/",
  });
  if (selectedCategory) {
    result.push(
      {
        label: selectedCategory.name,
        url: "/",
      },
      ...tableDetailStore.selectedCategory
    );
  }

  return result;
});
</script>

<style src="./POrder.scss" lang="scss" />
