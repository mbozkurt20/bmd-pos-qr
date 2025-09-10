<script setup lang="ts">
import PHeaderSmall from "../components/Header/PHeaderSmall/PHeaderSmall.vue";
import PBasketNav from "../components/PBasketNav/PBasketNav.vue";
import PBasketItems from "../components/PBasketItems/PBasketItems.vue";
import PSidebar from "../components/PSidebar/PSidebar.vue";
import PBarMobile from "../components/PSidebar/TableMobile/PBarMobile.vue";
import {
  fetchMenu,
  fetchTable,
  fetchPackages,
  fetchFastSell,
  tableDetailStore,
  setTableDetailCart,
} from "../store/table-detail";
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { device } from "../main";
import { packageStore } from "../store/package";

type IPosLayoutProps = {
  isShowRightbar: boolean;
  isShowMoveButton: boolean;
  navItems: any;
  type: string;
};
const productItems = computed(() => {
  return tableDetailStore.cart;
});
const props = withDefaults(defineProps<IPosLayoutProps>(), {
  isShowRightbar: true,
  isShowMoveButton: false,
  navItems: [],
});

const route = useRoute();

const handleClickSidebarItem = ({ index, item }) => {
  tableDetailStore.selectedIndex = index;
  tableDetailStore.products = item.products;
};

onMounted(() => {
  fetchMenu();
  switch (props.type) {
    case "order":
      if (route.params.id) {
        fetchTable(route.params.id);
        break;
      }
    case "fast-sell":
      fetchFastSell(route.params.id);
      break;
    case "packages":
      fetchPackages(route.params.id ?? null);
      break;
  }
});
</script>

<template>
  <PHeaderSmall />
  <div class="basket">
    <div class="content-row">
      <PBasketNav
        :items="navItems"
        :is-show-move-button="isShowMoveButton"
      />
      <PBarMobile
        :nav-items="tableDetailStore.categories"
        @clickSidebarItem="handleClickSidebarItem"
        :selected-index="tableDetailStore.selectedIndex"
      />
      <PBasketItems
        :title="tableDetailStore.table.name"
        :product-items="productItems"
        :type="type"
      />
      <slot></slot>
      <PSidebar
        v-if="isShowRightbar && !device.mobile"
        main-title="MENÜLER"
        :nav-items="tableDetailStore.categories"
        @clickSidebarItem="handleClickSidebarItem"
        :selected-index="tableDetailStore.selectedIndex"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  margin-bottom: 0;
}
</style>
