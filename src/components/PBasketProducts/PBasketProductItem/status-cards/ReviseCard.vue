<script setup lang="ts">
const props = defineProps(['table'])
</script>

<template>
  <div class="basket-item" :class="`basket-item-revise`">
    <div class="basket-item-state" >
      Rezerve
    </div>
    <div class="basket-item-title">
      {{table.name}}
    </div>
    <div class="basket-item-reservation">
      {{ table.reservation }}
    </div>
    <div class="basket-item-price" >
      <ion-icon style="font-size: 22px" name="time-outline"></ion-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.basket-item-reservation{
  font-size: 12px;
  color: #ffffff99;
}
</style>