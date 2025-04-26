<script setup>
import PHeaderSmall from "../../components/Header/PHeaderSmall/PHeaderSmall.vue";
import PSidebar from "../../components/Header/PSidebar/PSidebar.vue";
import ProductsTable from "../../components/PDataTable/ProductsTable.vue";
import CategoriesTable from "../../components/PDataTable/CategoriesTable.vue";
import Summary from "./Summary/index.vue";
import EndOfDay from "./EndOfDay/index.vue";
import Couriers from "./Couriers/index.vue";
import Additions from "./Additions/index.vue";
import Personnel from "./Personnel/index.vue";
import Cash from "./Cash/index.vue";
import { fetchMenu } from "../../store/menu";
import { ref } from "vue";

const activeKey = ref(0);

const navItems = [
  {
    label: "Özet",
    key: 0,
    icon: '<ion-icon name="pie-chart-outline"></ion-icon>',
  },
  {
    label: "Kasa",
    key: 1,
    icon: '<ion-icon name="bar-chart-outline"></ion-icon>',
  },
  {
    label: "Gün Sonu",
    key: 2,
    icon: '<ion-icon name="bar-chart-outline"></ion-icon>',
  },
  {
    label: "Kurye Raporları",
    key: 3,
    icon: '<ion-icon name="people-outline"></ion-icon>',
  },
  {
    label: "Adisyonlar",
    key: 4,
    icon: '<ion-icon name="ticket-outline"></ion-icon>',
  },
  {
    label: "Personeller",
    key: 5,
    icon: '<ion-icon name="people-outline"></ion-icon>',
  },
];

const setActiveKey = (key) => {
  activeKey.value = key;
  //fetchMenu();
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
      <div class="col-lg-10 report-content">
        <div class="row">
          <div class="col-lg-12">
            <div class="report-card">
              <Summary v-if="activeKey == 0" />
              <Cash v-if="activeKey == 1" />
              <EndOfDay v-if="activeKey == 2" />
              <Couriers v-if="activeKey == 3" />
              <Additions v-if="activeKey == 4" />
              <Personnel v-if="activeKey == 5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.report-card {
  border-radius: 12px;
  padding: 2rem;
  color: #000;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.report-card::-webkit-scrollbar {
  display: none;
}
.header {
  margin-bottom: 0;
}

.row {
  height: calc(100vh - 106px);
}

.sidebar {
  border-radius: 25px 0 0 25px;
}

.report-content {
  border-radius: 0 25px 25px 0;
  height: 100%;
  background: #ebe6f1;
}
</style>
