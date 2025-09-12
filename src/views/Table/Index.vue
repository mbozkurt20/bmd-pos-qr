<template>
  <PHeaderSmall />
  <div class="basket">
    <div class="content-row">
      <PBasketNav
        :items="getBasketNavItems"
        :is-show-move-button="false"
      />
      <PBarMobile
        v-if="device.mobile"
        :nav-items="areas"
        @clickSidebarItem="handleClickSidebarItem"
        :selected-index="tableDetailStore.tableSelectedIndex"
      />
      <PBasketItems
        :title="`${getActiveTables} Adisyon`"
        :product-items="getFilteredProducts"
        type="tables"
      />
      <PBasketProducts
        :is-mobile="device.mobile"
        :product-type="'table'"
        :product-items="products"
        :col-size="2"
      />
      <PSidebar
        main-title="MASALAR"
        :nav-items="areas"
        @clickSidebarItem="handleClickSidebarItem"
        :selected-index="tableDetailStore.tableSelectedIndex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PHeaderSmall from "../../components/Header/PHeaderSmall/PHeaderSmall.vue";
import PBasketNav from "../../components/PBasketNav/PBasketNav.vue";
import PBasketItems from "../../components/PBasketItems/PBasketItems.vue";
import PBasketProducts from "../../components/PBasketProducts/PBasketProducts.vue";
import PSidebar from "../../components/PSidebar/PSidebar.vue";
import PBarMobile from "../../components/PSidebar/TableMobile/PBarMobile.vue";
import { computed, onMounted, watch, ref, onUnmounted, watchEffect } from "vue";
import axios from "axios";
import Pusher from "pusher-js";
import { resetTableDetail, tableDetailStore } from "../../store/table-detail";
import { setLoading } from "../../store/app";
import { device } from "../../main";
import router from "../../router";
const changeTableData = ref([]);
const userData = localStorage.getItem("userData");
let user = JSON.parse(userData);

//const selectedIndex = ref(0);
const areas = ref([]);

const products = ref([]);
const leftProducts = ref([]);

const getActiveTables = computed(() => {
  var active = 0;
  for (let i = 0; i < areas.value.length; i++) {
    const area = areas.value[i];
    for (let j = 0; j < area.tables.length; j++) {
      const table = area.tables[j];
      if (table.status === 3 || table.status === 1) {
        active = active + 1;
      }
    }
  }

  return active;
});

const getFilteredProducts = computed(() => {
  return leftProducts.value.filter((e) => e.status === 1 || e.status === 3);
});

const getBasketNavItems = computed(() => [
  {
    label: "İptal",
    icon: "close-circle-outline",
    onClick: () => {
      router.push("/tables");
    },
  },
  {
    label: "Notlar",
    icon: "copy-outline",
  },
]);

const fetchData = (loading = false) => {
  if (loading) setLoading(true);
  axios({
    method: "GET",
    url: "/api/v2/area/list",
    params: {
      domain: localStorage.getItem("domain"),
    },
  })
    .then((response) => {
      if (response.data.success === true) {
        areas.value = response.data.areas;
        var data = [];
        for (let i = 0; i < response.data.areas.length; i++) {
          const area = response.data.areas[i];
          for (let j = 0; j < area.tables.length; j++) {
            const table = area.tables[j];
            data.push(table);
          }
        }
        products.value = response.data.areas[0].tables;
        leftProducts.value = data;

        resetTableDetail();
      }
      if (loading) setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    });
};

const handleClickSidebarItem = ({ index }) => {
  tableDetailStore.tableSelectedIndex = index;

  products.value = areas.value[index].tables;
};
const pusher = new Pusher("e617d5f462a9a069d6f5", {
  cluster: "mt1",
});
onUnmounted(() => {
  pusher.unsubscribe("sinerPosSocket_" + user["code"]);
  pusher.disconnect();
});
onMounted(() => {
  fetchData(true);
  //setInterval(fetchData, 10000)

  const channel = pusher.subscribe("sinerPosSocket_" + user["code"]);
  channel.bind("table", (data) => {
    changeTableData.value.push(data);
  });
});
watch(
  () => changeTableData.value.length,
  () => {
    fetchData();
  }
);
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 0;
}
</style>
