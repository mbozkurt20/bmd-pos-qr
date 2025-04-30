<script setup lang="ts">
import { billStore, onClickMethod } from "../../store/bill";

const { items } = defineProps(["items"]);

const onClick = (method) => {

  if (checkMethodHasValidFunction(method)) {
    method.onClick();
    return;
  }

  onClickMethod(method.type);
};

const checkMethodHasValidFunction = (method) => {
  return typeof method.onClick === "function";
};
</script>

<template>
  <div class="col-lg-3 bill-calc-col">
    <button
        v-for="(method, index) in items"
        :key="index"
        :class="{
      'bill-calc-item-active': billStore.paymentMethod === method.type,
    }"
        class="bill-calc-item d-flex align-items-center gap-2"
    @click="onClick(method)"
    >
    <svg height="25" width="25"
         xmlns="http://www.w3.org/2000/svg"
         fill="currentColor"
         class="ionicon"
         viewBox="0 0 512 512"
    >
      <path d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208 208-93.13 208-208zm-212.65 91.36a16 16 0 01-.09-22.63L303.58 272H170a16 16 0 010-32h133.58l-52.32-52.73A16 16 0 11274 164.73l79.39 80a16 16 0 010 22.54l-79.39 80a16 16 0 01-22.65.09z"/>
    </svg>
    <span>{{ method.title }}</span>
    </button>
  </div>

</template>

<style scoped lang="scss">
.bill-calc-item:hover {
  background: #dc1862;
}
</style>
