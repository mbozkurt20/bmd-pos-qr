<template>
  <PHeaderSmall />
  <div class="orders">
    <div class="row m-0 h-100">
      <OrderList />
      <div class="col-lg-8 orders-right">
        <template v-if="packageStore.order !== null">
          <OrderTop />
          <OrderProcess v-if="order.order_status.id === 1" />
          <OrderActions v-if="order.order_status.id !== 1" />
          <OrderItems />
          <OrderBottom :orderData="packageStore.order" />
        </template>
      </div>
    </div>
    <!--Sipariş Modalı-->
    <UpdateOrder :orderInfo="packageStore.order" />
  </div>
</template>

<script setup lang="js">
import PHeaderSmall from '../../components/Header/PHeaderSmall/PHeaderSmall.vue';
import { computed, onMounted } from "vue";
import OrderList from "./OrderList/OrderList.vue";
import OrderTop from "./OrderTop/index.vue";
import OrderProcess from "./OrderProcess/index.vue";
import OrderActions from "./OrderActions/index.vue";
import OrderItems from "./OrderItems/index.vue";
import OrderBottom from "./OrderBottom/index.vue";
import UpdateOrder from "../../components/Modal/UpdateOrder.vue";

// import { fetchLiveOrders, onlineStore , fetchOrders } from "../../store/online.js";
import { fetchOrders , packageStore } from "../../store/package.js"

const order = computed(() => {
  return packageStore.order;
});



onMounted(() => {
  fetchOrders();
});
</script>

<style src="./POnline.scss" scoped></style>

<style scoped>
.header {
  margin-bottom: 0;
}

.orders-left {
  margin: 0px;
}

.orders-right {
  margin: 0px;
  position: relative;
}

.orders {
  padding: 0px 12px 12px 12px;
}
</style>

<style src="../Footer/Footer.scss" scoped lang="scss" />
