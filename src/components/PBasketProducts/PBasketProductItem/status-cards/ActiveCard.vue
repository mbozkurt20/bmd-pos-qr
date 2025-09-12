<script setup lang="ts">
import calculateTime from "../../../../utils/calculateTime";
import formatPrice from "../../../../utils/formatPrice";
import { tableDetailStore } from "../../../../store/table-detail";
const props = defineProps(["table"]);
</script>

<template>
  <div
    class="basket-item basket-item-active"
    :style="tableDetailStore.willMoveTableId == props.table.id ? 'background-color: #9ccc65' : ''">

    <div class="basket-item-title">
      {{ table.name }}
    </div>
    <div class="basket-item-price">
      {{ formatPrice(table.amount) }}
    </div>
    <div class="basket-item-bottom">
      <div class="basket-item-time">
        {{ calculateTime(table.updated_at) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.basket-item-bottom {
  width: 100%;
}

.basket-item-time {
  width: 100%;
  display: grid;
  place-items: center;
}
</style>
