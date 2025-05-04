<script setup lang="ts">
import {
  tableDetailStore,
  parseProducts,
  calculateClassicProductTotal,
  parseCart,
  setIsDivide,
} from "../../../../store/table-detail";
import { appStore, setLoading } from "../../../../store/app";
import axios from "axios";
import router from "../../../../router";

const props = defineProps(["table", "isClickable"]);

const onMove = () => {
  if (!tableDetailStore.isDivide) {
    changeTable();
  } else {
    moveProductsToTable();
  }
};

const changeTable = () => {
  //setLoading(true);
  axios({
    method: "POST",
    url: "api/v2/area/table_change",
    data: {
      table_id: tableDetailStore.willMoveTableId,
      change_id: props.table.id,
      domain: localStorage.getItem("domain"),
    },
  })
    .then((res) => {
      tableDetailStore.tableSelectedIndex = 0;
      //setLoading(false);
    })
    .catch((e) => {
      //setLoading(false);
      tableDetailStore.tableSelectedIndex = 0;
      console.log("err", e);
    });
};

const moveProductsToTable = () => {
  function getOldOrders() {
    var oldOrders = [];

    const cart = parseProducts(tableDetailStore.stateTable);
    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];

      const isTransported =
        cartItem.divideQuantity !== undefined || cartItem.divideQuantity > 0;

      if (isTransported) {
        if (Number(cartItem.quantity) - Number(cartItem.divideQuantity) > 0) {
          oldOrders.push({
            ...cartItem,
            quantity:
              Number(cartItem.quantity) - Number(cartItem.divideQuantity),
          });
        }
      } else {
        oldOrders.push({
          ...cartItem,
        });
      }
    }
    return oldOrders;
  }

  function getTransports() {
    var transports = [];
    const cart = parseProducts(tableDetailStore.stateTable);

    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];

      const isTransported =
        cartItem.divideQuantity !== undefined || cartItem.divideQuantity > 0;

      if (isTransported) {
        transports.push({
          ...cartItem,
          quantity: cartItem.divideQuantity,
        });
      }
    }
    return transports;
  }

  const oldOrders = getOldOrders();
  const transports = getTransports();

  const totalOldOrder = calculateClassicProductTotal(oldOrders);
  const totalTransports = calculateClassicProductTotal(transports);

  axios({
    method: "POST",
    url: "api/v2/area/table_transport",
    data: {
      domain: localStorage.getItem("domain"),
      table_id: tableDetailStore.willMoveTableId,
      transport_id: props.table.id,
      transports: transports,
      oldorders: oldOrders,
      total_transport: totalTransports,
      total_oldorder: totalOldOrder,
    },
  })
    .then(async (response) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

const go = () => {
  if (props.isClickable) {
    router.push(`/tables/${props.table.id}`);
  } else {
    onMove();
    tableDetailStore.willMoveTableId = null;
    tableDetailStore.isDivide = false;
  }
};
</script>

<template>
  <div
    :class="[
      'basket-item',
      {
        'cursor-pointer': true,
      },
    ]"
    @click="go"
  >
    <div class="basket-item-top justify-content-center">
      <div class="basket-item-shape"></div>
    </div>
    <div class="basket-item-title">
      {{ table.name }}
    </div>
    <div class="basket-item-state">Masa Müsait</div>
  </div>
</template>

<style scoped lang="scss"></style>
