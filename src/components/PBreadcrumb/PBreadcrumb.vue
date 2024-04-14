<template>
  <div class="breadcrumb">
    <div
      class="breadcrumb-item"
      v-for="item in props.items"
      :key="item.label"
      @click="go(item)"
    >
      <span class="item">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  setSelectedCategory,
  tableDetailStore,
  getSelectedCategory,
} from "../../store/table-detail";
const props = defineProps(["items"]);
import router from "../../router/index";
const go = (item) => {
  if (item.id) {
    setSelectedCategory(null, item);
  } else {
  }
};
</script>

<style src="./PBreadcrumb.scss" lang="scss" />
<style scoped>
div {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
  cursor: pointer;
}
.item {
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  color: #000;
}
</style>
