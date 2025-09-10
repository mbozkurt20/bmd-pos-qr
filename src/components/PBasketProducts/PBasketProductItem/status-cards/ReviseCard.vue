<script setup lang="ts">
import calculateTime from "@/utils/calculateTime";

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
    <div class="basket-item-bottom">
      <div class="basket-item-time">
        {{ calculateTime(table.updated_at) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.basket-item-reservation{
  font-size: 13px;
  color: #f4f4f4;
  justify-content: center;
  margin: auto;
}
</style>