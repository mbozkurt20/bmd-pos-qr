<script setup>
import PHeaderSmall from "../../components/Header/PHeaderSmall/PHeaderSmall.vue";
import PSidebar from "../../components/Header/PSidebar/PSidebar.vue";
import CustomersTable from "../../components/PDataTable/CustomersTable.vue";
import DebtorsTable from "../../components/PDataTable/DebtorsTable.vue";
import DebtsTable from "../../components/PDataTable/DebtsTable.vue";
import { fetchCustomers, fetchDebtors, fetchDebts } from "../../store/current";
import { ref } from "vue";

const activeKey = ref(0);

const navItems = [
  {
    label: "Müşteriler",
    key: 0,
    icon: '<ion-icon name="people"></ion-icon>',
  },
  {
    label: "Alacaklar",
    key: 1,
    icon: '<ion-icon name="add-circle"></ion-icon>',
  },
  {
    label: "Borçlar",
    key: 2,
    icon: '<ion-icon name="remove-circle"></ion-icon>',
  },
];

const setActiveKey = (key) => {
  activeKey.value = key;
  if (key == 0) {
    fetchCustomers();
  } else if (key == 1) {
    fetchDebtors();
  } else if (key == 2) {
    fetchDebts();
  }
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
              <CustomersTable v-if="activeKey == 0" />
              <DebtorsTable v-if="activeKey == 1" />
              <DebtsTable v-if="activeKey == 2" />
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
}
</style>
