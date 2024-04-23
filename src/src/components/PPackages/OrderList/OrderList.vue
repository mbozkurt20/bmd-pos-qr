<script setup lang="ts">
import { getTotalOfOrders, packageStore } from "../../../store/package";
import POrderItem from "../../POrdersItem/POrdersItem.vue";
import { computed } from "vue";
import formatPrice from "../../../utils/formatPrice";

const getTotal = computed(() => getTotalOfOrders());
</script>

<template>
  <div class="col-lg-4 orders-left">
    <div class="orders-top">
      <div class="row">
        <div class="col-lg-6">
          <div
            class="orders-top-item orders-top-item-active"
            style="font-size: 13px; min-height: 60px"
          >
            Gelen Siparişler
            <div
              class="orders-top-item-notification"
              style="width: 20px; height: 20px; font-size: 11px"
            >
              {{packageStore.orders.length}}
            </div>
          </div>
        </div>
        <!-- <div class="col-lg-6">
          <div class="orders-top-item" style="font-size: 13px">
            Giden Siparişler
            <div class="orders-top-item-notification" style="width: 20px; height: 20px; font-size: 11px ">28</div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="orders-content">
      <POrderItem
        v-for="(order, idx) in packageStore.orders"
        :key="idx"
        :order="order"
      />
    </div>
    <div class="orders-bottom">
      <router-link to="/packages/new">
        <button class="button-pink">Yeni Sipariş</button>
      </router-link>
      <div class="d-flex">
        <div class="orders-bottom-title">Toplam</div>
        <div class="orders-bottom-price">{{ formatPrice(getTotal) }}</div>
      </div>
    </div>
  </div>
</template>

<style src="../POnline.scss" scoped></style>
