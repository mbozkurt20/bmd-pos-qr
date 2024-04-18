<script setup>
import PHeaderSmall from "../../components/Header/PHeaderSmall/PHeaderSmall.vue";
import PSidebar from "../../components/Header/PSidebar/PSidebar.vue";
import ProductsTable from "../../components/PDataTable/ProductsTable.vue";
import CategoriesTable from "../../components/PDataTable/CategoriesTable.vue";
import { fetchMenu } from "../../store/menu";
import { ref } from "vue";

const activeKey = ref(0);

const navItems = [
  {
    label: "Ürünler",
    key: 0,
    icon: '<ion-icon name="fast-food-outline"></ion-icon>',
  },
  {
    label: "Kategoriler",
    key: 1,
    icon: '<ion-icon name="list-outline"></ion-icon>',
  },
];

const setActiveKey = (key) => {
  activeKey.value = key;
  fetchMenu();
};

setActiveKey(0);
</script>

<template>
  <PHeaderSmall />
  <div class="empty">
    <div class="content-row">
      <PSidebar
        :col-size="2"
        :nav-items="navItems"
        @activeIndex="setActiveKey"
      />
      <div class="col-lg-10 basket-content">
        <div class="row">
          <div class="col-lg-12">
            <div class="basket-card">
              <ProductsTable v-if="activeKey == 0" />
              <CategoriesTable v-if="activeKey == 1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  margin-bottom: 0;
}

.row {
  height: calc(100vh - 106px);
}

.sidebar {
  border-radius: 25px 0 0 25px;
}

.basket-content {
  border-radius: 0 25px 25px 0;
  height: 100%;
  background: #ebe6f1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.basket-card::-webkit-scrollbar {
  display: none;
}
</style>
