<script setup lang="ts">
import {computed} from "vue";
import {approveOrder, changeOrderStatusAPI, packageStore} from "../../../store/package";

const order = computed(() => packageStore.order);

const approve = () => {
  changeOrderStatusAPI(2);
}

const orderCancel = () => {
  changeOrderStatusAPI(5);
}
</script>

<template>
  <div class="orders-right-actions">
    <div class="d-flex">
      <button @click="approve()" class="button-green" style="min-width: max-content">Onayla</button>
      <button @click="orderCancel()" class="button-pink" style="min-width: max-content">İptal Et</button>
    </div>
  </div>
</template>

<style src="../POnline.scss" scoped></style>