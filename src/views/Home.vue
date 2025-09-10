<template>
  <PHeader></PHeader>
  <div class="container">
    <div class="wrapper-row">
      <div class="left rounded pt-5">
        <PDate />
        <PNotifications />
      </div>
      <div class="right">
        <PCard />
      </div>
    </div>
  </div>
  <PFooter></PFooter>
</template>

<script setup lang="ts">
import PDate from "../components/Date/Date.vue";
import PNotifications from "../components/PNotifications/PNotifications.vue";
import PCard from "../components/PCard/PCard.vue";
import PWeather from "../components/PWeather/PWeather.vue";
import { tableDetailStore } from "../store/table-detail";
import PHeader from "../components/Header/PHeader/PHeader.vue";
import PFooter from "../components/Footer/Footer.vue";

tableDetailStore.isDivide = false;
tableDetailStore.willMoveTableId = null;
tableDetailStore.selectedCartItems = [];
tableDetailStore.selectedIndex = 0;
</script>

<style scoped lang="scss">
.container {
  @media (max-width: 1024px) {
    padding: 0px 40px;
  }
  .wrapper-row {
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;

    .left {
      flex: 0.3;
      margin-right: 2vw;
    }

    .right {
      flex: 0.7;
    }
  }
}
</style>
