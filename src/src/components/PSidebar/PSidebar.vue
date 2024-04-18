<template>
  <div class="sidebar" :class="sidebarClass">
    <h1 v-if="mainTitle != null" class="main-title">
      {{ mainTitle }}
    </h1>
    <button
      class="sidebar-item"
      v-for="(item, index) in navItems"
      :key="item.id"
      :class="{ 'sidebar-item-active': selectedIndex === index }"
      @click="handleClick(index, item)"
    >
      <div class="sidebar-item-icon" v-if="item.icon" v-html="item.icon"></div>
      {{ item.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { tableDetailStore } from "../../store/table-detail";
const props = defineProps([
  "colSize",
  "navItems",
  "mainTitle",
  "selectedIndex",
]);
const emit = defineEmits(["clickSidebarItem"]);

const sidebarClass = computed(() => {
  return `col-lg-${props.colSize}`;
});

const handleClick = (index, item) => {
  emit("clickSidebarItem", {
    index,
    item,
  });
  tableDetailStore.showParent = true;
  tableDetailStore.showSubCategory = false;
  tableDetailStore.selectedCategory = [];
  tableDetailStore.subProducts = null;
  tableDetailStore.subCategory = [];
  if (item.children_recursive.length == 0) {
    tableDetailStore.showSubCategory = false;
    tableDetailStore.showParent = true;
  } else {
    tableDetailStore.subCategory = item.children_recursive;
  }
};
</script>

<style src="./PSidebar.scss" lang="scss" scoped />
